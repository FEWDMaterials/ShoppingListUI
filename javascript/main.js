const newShoppingListItem = (item,price) => ({item, price,})
const addToShoppingList = (item,list=[]) => list.concat([item]);
const removeFromShoppingList = (list=[]) => list.slice(0, -1);
const removeFirstItem = (list=[]) => list.slice(1);
const removeNthItem = (i,list = []) => {
  if (i<list.length && i>0 && Number.isInteger(i) == true) {
    list.splice(i, 1);
  } else {
    throw new Error('error')
  }
  return list;
};

const render = () => {
  let htmlStr = `<tbody id="list-content">`;
  for(let i = 0; i < shoppingList.length; i++) {
    htmlStr += `<tr>
									<td>${(i+1)}</td>
									<td>${shoppingList[i].item}</td>
									<td><button type="button" class="btn btn-danger js-remove-btn">X</button></td>
								</tr>`;
  }
  htmlStr += `</tbody>`;
  document.querySelector('.js-list-table').innerHTML = htmlStr;
};

let shoppingList = [];

const shoppingInput = document.querySelector('.js-item-input');
shoppingInput.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    e.preventDefault();

    const value = e.target.value;
    const newListItem = newShoppingListItem(value, 0)
    shoppingList = addToShoppingList(newListItem, shoppingList)
    e.target.value = "";
    render();
  }
});

const removeBtn = document.querySelector('.js-remove-btn');
removeBtn.addEventListener('click', e => {
    this.removeFromShoppingList(item);
});