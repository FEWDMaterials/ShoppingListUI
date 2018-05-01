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
	let htmlStr = '<ul class="list-group">';
	for(let i = 0; i < shoppingList.length; i++) {
		htmlStr += `<li class="list-group-item">
			<span contenteditable="true" onblur="updateText(${i})" class="js-shopping-list-item-name shopping-list-item-${i}">${shoppingList[i].item}</span>
			<span class="js-shopping-list-item-price item-price">$${shoppingList[i].price}</span>
			<button onclick="removeItemButtonAction(${i})" type="button" class="btn btn-danger remove-button js-remove">X</button>
		</li>`;
	}
	htmlStr += "</ul>";
	document.querySelector('.js-data').innerHTML = htmlStr;
	document.querySelector('.js-shopping-list-input').value = '';
	document.querySelector('.js-shopping-price-input').value = '';
}

const updateText = (index) => {
	shoppingList[index].item = $(".shopping-list-item-"+index).text();
}

const totalPriceSelector = document.querySelector('total-price');

const sumTotal = () => {
	let shoppingTotal = 0;
	for(let i = 0; i < shoppingList.length; i++) {
		shoppingTotal += Number.parseInt(shoppingList[i].price, 10);
		document.querySelector('.total-price').innerHTML = '$' + shoppingTotal;
	}
}

let shoppingList = [];

const addItemAction = document.querySelector('.js-additem');
addItemAction.addEventListener('click', e => {
	e.preventDefault();
	const itemInput = document.querySelector('.js-shopping-list-input').value;
	const priceInput = document.querySelector('.js-shopping-price-input').value;
	const newListItem = newShoppingListItem(itemInput, priceInput);
	shoppingList = addToShoppingList(newListItem, shoppingList);
	render();
	sumTotal();
});

const undoAction = document.querySelector('.js-undo');
undoAction.addEventListener('click', e => {
	e.preventDefault();
	if (shoppingList.length <= 0) {
		alert('nothing to undo!');
		return;
	}
	shoppingList = removeNthItem(shoppingList.length-1, shoppingList);
	render();
});

const removeItemButtonAction = (item) => {
	removeNthItem(item, shoppingList);
	render();
}
