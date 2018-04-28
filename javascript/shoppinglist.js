(function () {
	const inpQtyElm = document.querySelector('.inp-qty .inp');
	const inpItemNameElm = document.querySelector('.inp-item-name .inp');
	const inpEditIdElm = document.querySelector('#edit-row-id');
	const btnAdd = document.querySelector('.inp-actions .btn-add');
	const btnReset = document.querySelector('.inp-actions .btn-reset');

	const listBody = document.querySelector('.lst-items');
	const listTitleElm = document.querySelector('.list .list-title');
	const listCountElm = document.querySelector('.list .list-item-count');

	const tplItemRow = document.querySelector('#tpl-item-row');

	const shoppingListItem = (name, qty) => {

		_render: function () {

		}
	};

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
					row.querySelector('.lst-item').dataset.entryId = i;
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
		const value = inpItemNameElm.value.trim();
		const qty = parseFloat(inpQtyElm.value.trim());

		if(value.length !== 0) {
			list.addToList(value);
			inpItemNameElm.value = '';
		}
		list.displayList();
	};

	const actionEditItemInList = (rowId) => {
		// Copy data name into input.
		// Copy data id into hidden.
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