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
								</tr>`;
			}
			return str;
		},
		countItemsInList: () => {
			return ShoppingList.list.length;
		}
	};	

	return ShoppingList;
}

const ctown = getShoppingList();
const wholefoods = getShoppingList();

ctown.addToList('mangoes');
ctown.addToList('coffee');

wholefoods.addToList('steak') 
wholefoods.addToList('potatoes')

const tableBody = document.querySelector('#list-content');
tableBody.innerHTML = wholefoods.displayList();


console.log(wholefoods.countItemsInList())

console.log('wholefoods fam')
console.log(wholefoods.displayList())
console.log('ctown fam')
console.log(ctown.displayList())
