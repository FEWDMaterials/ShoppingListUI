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
				str += (i+1) + '. ' + ShoppingList.list[i] + '\n';
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

console.log(wholefoods.countItemsInList())

console.log('wholefoods fam')
console.log(wholefoods.displayList())
console.log('ctown fam')
console.log(ctown.displayList())
