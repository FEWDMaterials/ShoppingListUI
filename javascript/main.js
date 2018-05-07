const itemInput = document.querySelector('.js-item-input');
const itemBtn = document.querySelector('.js-add-btn');
const listWrap = document.querySelector('.js-list');
const completedList = document.querySelector('.js-list-completed');

const createItem = (itemName) =>  {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");//label
  const editInput = document.createElement("input");//text
  const editButton = document.createElement("button");//edit button
  const deleteButton = document.createElement("button");//delete button

  label.innerText = itemName;
  listItem.className = 'list-group-item';
  checkBox.type="checkbox";
  editInput.type = 'text';
  editInput.className = 'js-edit-input'
  editButton.innerText = 'Edit';
  editButton.className = 'js-edit btn';
  deleteButton.innerText = 'X';
  deleteButton.className = 'js-delete btn btn-danger';

  listItem.appendChild(checkBox)
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

  return listItem;
};

const addItem = () => {
  const listItem = createItem(itemInput.value);
  listWrap.appendChild(listItem);
  bindTaskEvents(listItem, itemCompleted);

  itemInput.value = '';

};

const editItem = function() {

  const listItem = this.parentNode;
  const editBtn = listItem.querySelector('.js-edit');
  const editInput = listItem.querySelector('.js-edit-input');
  const label = listItem.querySelector('label');

  if(listItem.classList.contains('editMode')){

    label.innerText=editInput.value;
    editBtn.text = 'Save';
  } else {
    editInput.value = label.innerText;
    editBtn.text = 'Edit';
  }


  listItem.classList.toggle('editMode');
};

const deleteItem = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);

};


//Mark task completed
const itemCompleted = function() {

  const listItem = this.parentNode;
  completedList.appendChild(listItem);
  bindTaskEvents(listItem, itemIncomplete);

};


const itemIncomplete = function() {
  const listItem = this.parentNode;
  listWrap.appendChild(listItem);
  bindTaskEvents(listItem,itemCompleted);
};

itemBtn.addEventListener('click', addItem);
itemInput.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    return addItem();
  }
});

const bindTaskEvents= (shoppingListItem, checkBoxEventHandler) => {

  const checkBox = shoppingListItem.querySelector("input[type=checkbox]");
  const editButton = shoppingListItem.querySelector('.js-edit');
  const deleteButton = shoppingListItem.querySelector('.js-delete');

  editButton.addEventListener('click', editItem);
  deleteButton.addEventListener('click', deleteItem);
  checkBox.onchange = checkBoxEventHandler;
};

// bind events to shopping list
for (let i = 0; i < listWrap.children.length; i++){
  bindTaskEvents(listWrap.children[i], itemCompleted());
}

// bind events to completed list
for (let i=0; i < completedList.children.length; i++){
  bindTaskEvents(completedList.children[i], itemIncomplete());
}