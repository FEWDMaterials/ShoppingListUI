


// Sample shopping list methods
// remember these must be turned into a factory function!
// 
// 





//1. Establish empty objects for both lists

let ctownfood =[];
let wffood = [];
let ctownfoodPrice = 0;
let wffoodPrice = 0;
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


//2. Create event listener on both arrays that validates both parts of the input

const shoppingInputctwon = document.querySelector('.form-input-ctown');
const priceInputctown = document.querySelector('.js-shopping-list-input-price-ctown');
const btnctown = document.querySelector('.btn-primaryctown');

btnctown.addEventListener('click', e => {

	if( (shoppingInputctwon.value === "") || (priceInputctown.value === "")) {
		console.log('please fill out both values')
	}

	const newListItem = newShoppingListItem(shoppingInputctwon.value, priceInputctown.value);
	ctownfood = addToShoppingList(newListItem, ctownfood);
	ctownfoodPrice += parseInt(priceInputctown.value);
	shoppingInputctwon.value = '';
	priceInputctown.value = '';
	
	renderctown();

})
// shoppingInputctwon.addEventListener('keydown', e => {
// 	if (e.keyCode === 13) {
// 		e.preventDefault();

// 		const value = e.target.value;
// 		const newListItem = newShoppingListItem(value, 0)
// 		ctownfood = addToShoppingList(newListItem, ctownfood)
// 		console.log('ctwonevent')
// 		e.target.value = "";

// 		renderctown();
// 	}
// });

const shoppingInputwf = document.querySelector('.js-shopping-list-input-wf');
const priceInputwf = document.querySelector('.js-shopping-list-input-price-wf');
const btnwf = document.querySelector('.btn-primarywf');

btnwf.addEventListener('click', e => {

	if( (shoppingInputctwon.value === "") || (priceInputctown.value === "")) {
		console.log('please fill out both values')
	}

	const newListItem = newShoppingListItem(shoppingInputwf.value, priceInputwf.value);
	ctownfood = addToShoppingList(newListItem, wffood);
	wffoodPrice += parseInt(priceInputwf.value);
	shoppingInputwf.value = '';
	priceInputwf.value = '';
	
	renderctown();

})
// shoppingInputwf.addEventListener('keydown', e => {
// 	if (e.keyCode === 13) {
// 		e.preventDefault();

// 		const value = e.target.value;
// 		const newListItem = newShoppingListItem(value, 0)
// 		wffood = addToShoppingList(newListItem, wffood)
// 		console.log('wfevent')
// 		e.target.value = "";
// 		renderwf();
// 	}
// });

//3. Insert content into object and render on DOM

const renderctown = () => {
	let htmlStr = '<ul class="list-group">';
	for(let i = 0; i < ctownfood.length; i++) {
		htmlStr += `<li class="list-group-item">
			${ctownfood[i].item}
			${ctownfood[i].price}
			<div class="close ${ctownfood[i].item}">X</div>
		</li>`
		console.log(ctownfood[i]);
	}
	htmlStr += "</ul>"
	document.querySelector('.ctwon-output').innerHTML = htmlStr;

	document.querySelector('.ctown-total').innerHTML = ctownfoodPrice;
}

const renderwf = () => {
	let htmlStr = '<ul class="list-group">';
	for(let i = 0; i < wffood.length; i++) {
		htmlStr += `<li class="list-group-item">
			${wffood[i].item}
			${wffood[i].price}
	<div class=" close ${wffood[i].item} ">X</div>
		</li>`
	}
	htmlStr += "</ul>"
	document.querySelector('.wf-output').innerHTML = htmlStr;

	document.querySelector('.wf-total').innerHTML = wffoodPrice;
}

//4. Create buttons on DOM objects that will allow further functionality

$('.close').on('click', )



