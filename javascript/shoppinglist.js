(function () {
	const inpItemNameElm = document.querySelector('.inp-item-name .inp');
	const btnAdd = document.querySelector('.inp-actions .btn-add');

	const listBody = document.querySelector('.lst-items');
	const tplItemRow = document.querySelector('#tpl-item-row');

	const getShoppingList = (name) => {
		const ShoppingList = {
			list: [],
			listName: '',
			addToList: (item) => {
				ShoppingList.list.push(item);

				return ShoppingList.list;
			},
			displayList: () => {
				listBody.innerHTML = '';
				for (let i = 0; i < ShoppingList.list.length; i++) {
					const row = tplItemRow.content.cloneNode(true);
					row.querySelector('.item-name').innerHTML = ShoppingList.list[i];
					listBody.appendChild(row);
				}
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
		list.addToList(inpItemNameElm.value.trim());
		inpItemNameElm.value = '';
		list.displayList();
	};

	btnAdd.addEventListener('click', actionAddItemToList);

	document.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			actionAddItemToList;
		}
	});

	const list = getShoppingList('CTown');
	list.displayList();
})();