const newShoppingListItem = (item,price) => ({item, price,})
const addToShoppingList = (item,list=[]) => list.concat([item]);
const removeFromShoppingList = (list=[]) => list.slice(0, -1);
const removeFirstItem = (list=[]) => list.slice(1);

const removeNthItem = (i,list = []) => {
	if (i<list.length && i>=0 && Number.isInteger(i) == true) {
		list.splice(i, 1);
	} else {
		throw new Error('error')
	}
	return list;
};

//this is the controller for the messaging div
const headsUp = document.querySelector('.js-warning');

//Redraw the js-data div with the new list
const render = () => {
	let htmlStr = '<table class="table list-group">';
	htmlStr += `
	<thead>
	<tr>
	<th scope="col">#</th>
	<th scope="col">Item</th>
	<th scope="col">Price</th>
	</tr>
	</thead>
	<tbody>
	`;
	for(let i = 0; i < shoppingList.length; i++) {
		n = i + 1;
		htmlStr += `
		<tr class="list-group-item">
		<th scope="row">${n}</th>
		<td class="rowName">${shoppingList[i].item}</td>
		<td>${shoppingList[i].price}</td>
		<td><button class="btn removeBtn">X</button></td>
		`
	}
	drawTotal = totalCost();
	htmlStr += `
	</tbody>
	</table>
	<div class="card">
	TOTAL COST    $ ${drawTotal}
	</div>`
	document.querySelector('.js-data').innerHTML = htmlStr;
	const budgetVal = Number(budget.value);
	if (budgetVal === 0 || drawTotal <= budgetVal) {
		headsUp.style.color = "black";
		headsUp.style.textTransform = "none";
		headsUp.innerHTML = "Please fill out the list.";
	}
	else {
		if (drawTotal > budgetVal) {
			headsUp.style.color = "red";
			headsUp.style.textTransform = "uppercase";
			headsUp.innerHTML = "You have gone over your budget";
		}
	}
}

//Variable to hold the actual list
let shoppingList = [];

//budget controller
const budget = document.querySelector('.js-budget');
budget.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();
		console.log("budget refresh")
		render();
	}
});


//Var for the contents of the input line
const shoppingInput = document.querySelector('.js-shopping-list-input');

//wait for enter press on the name of the item
shoppingInput.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();
		mainItemAdd();
	}
});

////Var for the contents of the price line
const priceInput = document.querySelector('.js-shopping-list-price');

//wait for enter press on the price of the item
priceInput.addEventListener('keydown', e => 
{
	//exhaustive testing to make sure there is a number in the price field
	let wrongKey = false;
	const nonNumberCodes = [186, 187, 188, 189, 191, 192, 219, 220, 221, 220];
	if (e.keyCode >= 65 && e.keyCode <= 90)
		{wrongKey = true;}
	else 
	{
		for (let i = 0; i < nonNumberCodes.length; i++) 
		{
			if (e.keyCode === nonNumberCodes[i]) {
				wrongKey = true;
				break;
			};
		}
	}

	//make sure there is only one floating point
	if (e.keyCode === 190){
		for (let i = 0; i < priceInput.value.length; i++)
		{
			if (priceInput.value[i] === "."){
				wrongKey = true;
				break;
			}
		}
	}
	//ignore everything that isn't valid numeric input
	if (wrongKey || e.shiftKey || e.keyCode === 13)
	{
		e.preventDefault();
		if (e.keyCode === 13) {mainItemAdd();}
	}

});

//Var for the ADD button
const btnAdd = document.querySelector('.js-add-btn');

//Wait for ADD button press
btnAdd.addEventListener('click', e => {
	mainItemAdd();
});

//functionality for elements that don't exist yet

//the button is the item remover
document.addEventListener("click", function(event) {
	let element = event.target;
	if (element.tagName == 'BUTTON' && element.classList.contains("removeBtn")) {
		const indexOfCut = Number(element.parentElement.parentElement.childNodes[1].textContent);
		console.log(indexOfCut);
		shoppingList = removeNthItem(indexOfCut-1, shoppingList);
		render();
	}
});

//calculate total
const totalCost = () => {
	totalVal = 0;
	for (let i = 0; i < shoppingList.length; i++) {
		totalVal += shoppingList[i].price;
		console.log(totalVal);
	}
	console.log("TOTAL ", totalVal);
	return totalVal;
}

//collect input, stick it in the list
const mainItemAdd = () => {
	const nameValue = shoppingInput.value;
	//makes sure an item has a name. an item cannot be added without a price
	if (nameValue != undefined && nameValue != "")
	{
		const priceValue = Number(priceInput.value);
		
		if (priceValue != undefined && priceValue != "")
		{
			let newListItem = ("", 0);
			newListItem = newShoppingListItem(nameValue, priceValue);
			priceInput.value = "";
			shoppingList = addToShoppingList(newListItem, shoppingList)
			shoppingInput.value = "";

			//next three lines ditch the warning message, if any
			headsUp.style.color = "black";
			headsUp.style.textTransform = "none";
			headsUp.innerHTML = "Please fill out the list.";

			render();
		}
		else
		{
			//warning to the user than more input is needed
			headsUp.style.color = "red";
			headsUp.style.textTransform = "uppercase";
			headsUp.innerHTML = "Please provide both item name and price";
		}
		
	}
}

const undoAction = document.querySelector('.js-undo');
undoAction.addEventListener('click', e => {
	e.preventDefault();
	if (shoppingList.length <= 0) {
		alert('nothing to undo!');
		return;
	}
	shoppingList = removeNthItem(shoppingList.length-1, shoppingList);
	render();
})