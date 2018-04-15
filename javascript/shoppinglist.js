(function () {
	const inpItemNameElm = document.querySelector('.inp-item-name .inp');
	const btnAdd = document.querySelector('.inp-actions .btn-add');

	const getShoppingList = (name) => {
		const ShoppingList = {
			list: [],
			listName: '',
			addToList: (item) => {
				ShoppingList.list.push(item);

				return ShoppingList.list;
			},
			displayList: () => {
				let str = '';
				for (let i = 0; i < ShoppingList.list.length; i++) {
					str += (i + 1) + '. ' + ShoppingList.list[i] + '\n';
				}
				return str;
			},
			countItemsInList: () => {
				return ShoppingList.list.length;
			},

			setListName: (name) => {
				ShoppingList.listName = name;
			}
		};

		ShoppingList.setListName(name);

		return ShoppingList;
	};

	const actionAddItemToList = () => {
		ctown.addToList(inpItemNameElm.value.trim());
		inpItemNameElm.value = '';
		console.log(ctown.displayList());
	};

	btnAdd.addEventListener('click', actionAddItemToList);

	const ctown = getShoppingList('CTown');
	const wholefoods = getShoppingList('Whole Foods');

	ctown.addToList('mangoes');
	ctown.addToList('coffee');

	wholefoods.addToList('steak');
	wholefoods.addToList('potatoes');

	console.log(wholefoods.countItemsInList());

	console.log('wholefoods fam');
	console.log(wholefoods.displayList());
	console.log('ctown fam');
	console.log(ctown.displayList());
})();