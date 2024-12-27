const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
    // Do not subit somewhere else.
    e.preventDefault();

    // Get Value
    const newItem = itemInput.value;

    // See if it is empty
    if (newItem === '') {
        alert('Please enter Item');
        return;
    }
    
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

    checkUI();

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

/**
 * 
 * @param {Event} e 
 */
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
    checkUI();
}


function clearItems() {
    if (confirm('Are you sure you want to delete all items ?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
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

// Add event listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();