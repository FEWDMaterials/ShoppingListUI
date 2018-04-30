(function () {
	const inpQtyElm = document.querySelector('.inp-qty .inp');
	const inpItemNameElm = document.querySelector('.inp-item-name .inp');
	const inpEditIdElm = document.querySelector('#edit-row-id');
	const btnAdd = document.querySelector('.inp-actions .btn-add');
	const btnReset = document.querySelector('.inp-actions .btn-reset');

	const listTitleElm = document.querySelector('.list .list-title');
	const listCountElm = document.querySelector('.list .list-item-count');


	const ListObj = (function () {
		const _listBody = document.querySelector('.lst-items');
		const _items = [];
		let listName = '';

		const _render = () => {
			_listBody.innerHTML = '';
			_items.forEach(item => {
				_listBody.appendChild(item.render());
			});
		};

		return {
			setListName: (name) => {
				listName = name;
			},

			addItem: (item) => {
				_items.push(item);
				_render();
			},
		}
	})();


	const Item = {
		_amount: 1,
		_name: '',

		_render: function () {
			const _elemHandel = document.importNode(document.querySelector('#tpl-item-row').content, true);
			_elemHandel.querySelector('.item-qty').innerHTML = this._amount;
			_elemHandel.querySelector('.item-name').innerHTML = this._name;
			return _elemHandel;
		},

		create: function (amount, name) {
			const item = Object.create(this);
			item._name = name;
			item._amount = amount;
			item.render = item._render;
			return item;
		},
	};

	ListObj.setListName('Test List');

	const actionAddItemToList = () => {
		const value = inpItemNameElm.value.trim();
		const qty = parseFloat(inpQtyElm.value.trim());

		if (value.length !== 0) {
			ListObj.addItem(Item.create(qty, value));
			inpItemNameElm.value = '';
			inpQtyElm.value = '';
		}
	};

	btnAdd.addEventListener('click', actionAddItemToList);
	document.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			actionAddItemToList;
		}
	});

})();
