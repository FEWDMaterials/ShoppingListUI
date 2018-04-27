const getShoppingList = () => {
	const ShoppingList = {
		list: [],
		addToList: (item) => {
			ShoppingList.list.push(item);

			return ShoppingList.list;	
		},
		displayList: () => {
			let str = '';
			for (let i = 0; i < ShoppingList.list.length; i++) {
        str += `<tr>
									<td>${(i+1)}</td>
									<td>${ShoppingList.list[i]}</td>
									<td></td>
								</tr>`;
			}
			return str;
		},
		countItemsInList: () => {
			return ShoppingList.list.length;
		}
	};	

	return ShoppingList;
};

const myList = getShoppingList();
const tableBody = document.querySelector('#list-content');
tableBody.innerHTML = myList.displayList();
const item = document.querySelector('.js-item-input').value;
const addBtn = document.querySelector('.js-add-btn');

addBtn.addEventListener('click', event => {
	myList.addToList(item);
});




// examples
// const ctown = getShoppingList();
// const wholefoods = getShoppingList();
//
// ctown.addToList('mangoes');
// ctown.addToList('coffee');
//
// wholefoods.addToList('steak');
// wholefoods.addToList('potatoes');
//
// console.log(wholefoods.countItemsInList());
// console.log('wholefoods fam');
// console.log(wholefoods.displayList());
// console.log('ctown fam');
// console.log(ctown.displayList());
