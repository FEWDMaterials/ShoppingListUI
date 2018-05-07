// Sample shopping list methods
// remember these must be turned into a factory function!

const newShoppingListItem = (item,price) => ({item, price,})
const addToShoppingList = (item,list=[]) => list.concat([item]);
const removeFromShoppingList = (list=[]) => {
	list.slice(0, -1);
	console.log('removed item from list');
};
const removeFirstItem = (list=[]) => list.slice(1);
const removeNthItem = (i,list = []) => {
    if (i < list.length) {
        list.splice(i, 1);
    } else {
        throw new Error('error');
    }
    return list;
};

const render = () => {
	let htmlOutput = '<ul class="list-group">';
	for(let i = 0; i < shoppingList.length; i++) {
		htmlOutput += `<li class="list-group-item">
			<span contenteditable="true" onblur="updateText(${i})" class="js-item-name shopping-list-item-${i}">${shoppingList[i].item}</span>
			<span class="item-price">$${shoppingList[i].price}</span>
			<button onclick="removeItemBtn(${i})" type="button" class="btn btn-danger js-remove">X</button>
		</li>`;
	}
	htmlOutput += "</ul>";
	document.querySelector('.js-shopping-data').innerHTML = htmlOutput;
	document.querySelector('.js-item-item').value = '';
	document.querySelector('.js-price-item').value = '';
}

const updateText = (index) => {
	shoppingList[index].item = $(".shopping-list-item-"+index).text();
}

let shoppingList = [];
const addItem = document.querySelector('.js-add-item');
addItem.addEventListener('click', e => {
	e.preventDefault();
	const itemInput = document.querySelector('.js-item-item').value;
	const priceInput = document.querySelector('.js-price-item').value;
	const newListItem = newShoppingListItem(itemInput, priceInput);
	shoppingList = addToShoppingList(newListItem, shoppingList);
	render();
});

const undoItem = document.querySelector('.js-undo-item');
undoItem.addEventListener('click', e => {
	e.preventDefault();
	if (shoppingList.length <= 0) {
		alert('nothing to undo!');
		return;
	}
	shoppingList = removeNthItem(shoppingList.length-1, shoppingList);
	render();
});

const removeItemBtn = (item) => {
	removeNthItem(item, shoppingList);
	render();
}