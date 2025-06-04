const itemList = document.querySelector('#item-list');

const filterItem = (e) => {
  const val = e.target.value;
  const lis = document.querySelectorAll('li');
  lis.forEach((item, index) => {
    if (!item.textContent.toLowerCase().includes(val.toLowerCase())) {
      item.style.visibility = 'hidden';
    } else {
      item.style.visibility = 'visible';
    }
  });
};
function clearAllItems() {
  document.querySelector('ul').innerHTML = '';
  document.querySelector('.filter').innerHTML = '';
  localStorage.clear();
}

function addItem(e) {
  e.preventDefault();

  let textInput = document.querySelector('#item-input').value;

  if (validateInput(textInput, itemList)) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(textInput));
    //li.innerText = textInput;
    const button = createButton('remove-item btn-link text-red', li);
    //button.element = li;
    //console.log(item, index);

    button.addEventListener('click', removeItem);
    //const i = createIcon('fa-solid fa-xmark');
    // button.appendChild(i);
    li.appendChild(button);
    itemList.appendChild(li);
    const localStorageLength = localStorage.length;

    localStorage.setItem(localStorageLength + 1, textInput);
    button.index = localStorage.length;
    document.querySelector('#item-input').value = '';
  }
}
function validateInput(textInput, ulElement) {
  if (!textInput) {
    alert('Enter a value to be added');
    return;
  }
  let validated = true;
  ulElement.childNodes.forEach((item, index) => {
    if (item.textContent === textInput) {
      alert(`${textInput} already exists in the list`);
      validated = false;
      return;
    }
  });
  return validated;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.classList = classes;
  return icon;
}

function createButton(classes, element, key = '') {
  const button = document.createElement('button');
  button.classList = classes;
  button.element = element;
  if (key) {
    button.index = key;
  }
  button.appendChild(createIcon('fa-solid fa-xmark'));
  return button;
}

const filterInputText = document.querySelector('.filter');
const removeItem = (e) => {
  console.log(e.currentTarget.index);
  // console.log(ul.querySelector(`li:nth-child(${e.currentTarget.index})`));
  //ul.removeChild(ul.querySelector(e.currentTarget)); //.remove();
  localStorage.removeItem(e.currentTarget.index);
  e.currentTarget.element.remove();

  if (!document.querySelector('li') && filterInputText) {
    filterInputText.remove();
  }
};

document.querySelector('.btn').addEventListener('click', addItem);
document.getElementById('clear').addEventListener('click', clearAllItems);
document.getElementById('filter').addEventListener('input', filterItem);

window.addEventListener('DOMContentLoaded', (e) => {
  document.querySelector('ul').innerHTML = '';
  recreateLi();
});
function recreateLi() {
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const li = document.createElement('li');
      li.index = key;
      li.innerText = localStorage.getItem(key);
      const button = createButton('remove-item btn-link text-red', li, key);
      //button.index = key;
      //console.log(item, index);
      button.addEventListener('click', removeItem);
      //const i = createIcon('fa-solid fa-xmark');
      //i.classList = 'fa-solid fa-xmark';
      //button.appendChild(i);
      li.appendChild(button);
      itemList.appendChild(li);
    }
  }
}
