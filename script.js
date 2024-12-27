const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
        
    })


    console.log(text);
}

function onAddItemSubmit(e) {
    // Do not subit somewhere else.
    e.preventDefault();

    // Get Value
    const newItem = itemInput.value;

    // See if it is empty
    if (newItem === '') {
        alert('Please enter Item');
        return;
    }
    
    // Create Item in DOM
    addItemToDOM(newItem);

    // Add item to Local Storage
    addItemToStorage(newItem);

    checkUI();

}

function addItemToDOM(newItem) {

    // Create list entry
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    // Create Button with Icon and append it
    const myButton = createButtonWithIcon('remove-item btn-link text-red', 'fa-solid fa-xmark');
    li.appendChild(myButton);

    // Add it to list.
    itemList.appendChild(li);

    // Clear input box.
    itemInput.value = '';


}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') == null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    
    return itemsFromStorage;
}

function addItemToStorage(newItem) {

    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(newItem);

    // Convert to JSON String
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

/**
 * Creates button with Icom
 * 
 * @param {String} buttonClass 
 * @param {String} iconClass 
 * @returns Button
 */
function createButtonWithIcon(buttonClass, iconClass) {
    const button = document.createElement('button');
    button.className = buttonClass;

    const icon = createIcon(iconClass);
    button.appendChild(icon);

    return button;

}

/**
 * Create an Icon
 * @param {String} iconClass 
 * @returns Icon
 */
function createIcon(iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;

    return icon;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }

}

/**
 * 
 * @param {Event} e 
 */
function removeItem(item) {

    if (confirm('Are you sure ?')) {
        // Remove Item from DOM
        item.remove();

        // Remove from Storage
        removeItemFromStorage(item.textContent);

        //Update UI
        checkUI();
    }

}

function removeItemFromStorage(item) {
    // Get Items
    let itemsFromStorage = getItemsFromStorage();
    // Filter out item
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    // Reset Local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function clearItems() {
    if (confirm('Are you sure you want to delete all items ?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }

        // Clear from localstorage
        localStorage.removeItem('items');

        checkUI();
    }
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Initialize App
function init() {
    // Add event listener
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}

init();