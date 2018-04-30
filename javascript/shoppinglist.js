"use strict";
(function () {
	const inpQtyElm = document.querySelector('.inp-qty .inp');
	const inpNameElm = document.querySelector('.inp-item-name .inp');
	const inpPriceElm = document.querySelector('.inp-item-price .inp');

	const inpEditIdElm = document.querySelector('#edit-row-id');

	const btnAdd = document.querySelector('.inp-actions .btn-add');
	const btnEdit = document.querySelector('.inp-actions .btn-edit');
	const btnCancel = document.querySelector('.inp-actions .btn-cancel');

	const ListObj = (function () {
		const _listBody = document.querySelector('.lst-items');
		const totalQty = document.querySelector('.lst-totals .total-qty');
		const totalPrice = document.querySelector('.lst-totals .total-price');
		const listTitleElm = document.querySelector('.list .list-title');

		const LOCAL_STORAGE_LIST = 'list';

		let _items = null;
		let listName = '';
		let _mode = 'add';

		const _render = () => {
			let _qtyTotal = 0;
			let _priceTotal = 0;

			_listBody.innerHTML = '';

			listTitleElm.innerHTML = listName;

			if (_mode === 'add') {
				btnAdd.classList.remove('hidden');
				btnEdit.classList.add('hidden');
				btnCancel.classList.add('hidden');

			} else if (_mode === 'edit') {
				btnAdd.classList.add('hidden');
				btnEdit.classList.remove('hidden');
				btnCancel.classList.remove('hidden');
			}

			_items.forEach(item => {
				_qtyTotal = _qtyTotal + item._qty;
				_priceTotal = _priceTotal + item._price;
				_listBody.appendChild(item.render());
			});

			totalQty.innerHTML = _qtyTotal;
			totalPrice.innerHTML = _priceTotal.toFixed(2);
		};

		const _deepFreeze = () => {
			console.log('deep freeze');
			if (!window.hasOwnProperty('localStorage')) {
				console.log('Cannot save to long term storage as this browser does not support it.');
				return;
			}
			window.localStorage.setItem(LOCAL_STORAGE_LIST, JSON.stringify(_items));
		};

		const _deepDefrost = () => {
			console.log('deep defrost');
			if (!window.hasOwnProperty('localStorage')) {
				console.log('Cannot read from long term storage as this browser does not support it.');
				return [];
			}

			const data = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_LIST));
			if (!data || data.length < 1) {
				return [];
			}

			data.forEach(item => {
				// TODO: There must be a better way?
				Object.setPrototypeOf(item, Item);

				// TODO: ... and here too.
				item.render = item._render;
			});
			return data;
		};

		return {
			setup: (name) => {
				listName = name;
				_items = _deepDefrost();
				_render();
			},

			addItem: (item) => {
				_items.push(item);
				_deepFreeze();
				_render();
			},

			editItem: () => {
				_mode = 'edit';
				inpQtyElm.value = '-2';
				inpNameElm.value = 'Add data from what was selected';
				inpPriceElm.value = '-4';
				_deepFreeze();
				_render();
			},

			cancelEditItem: () => {
				_mode = 'add';
				inpQtyElm.value = '';
				inpNameElm.value = '';
				inpPriceElm.value = '';
				_render();
			}
		}
	})();


	const Item = {
		_qty: 1,
		_name: '',
		_price: 0,

		_cleanupQtyValue: function (value = '') {
			value = parseInt(value, 10);
			return (!!value && !isNaN(value) && value >= 0) ? value : 1;
		},

		_cleanupPriceValue: function (value) {
			value = parseFloat(value);
			return !isNaN(value) ? value : 0.00;
		},

		_render: function () {
			const _elemHandel = document.importNode(document.querySelector('#tpl-item-row').content, true);
			_elemHandel.querySelector('.item-qty').innerHTML = this._qty;
			_elemHandel.querySelector('.item-name').innerHTML = this._name;
			_elemHandel.querySelector('.item-price').innerHTML = this._price.toFixed(2);
			return _elemHandel;
		},

		create: function (qty, name, price) {
			const item = Object.create(this);
			item._qty = Item._cleanupQtyValue(qty);
			item._name = name;
			item._price = Item._cleanupPriceValue(price);
			item.render = item._render;
			return item;
		},
	};

	ListObj.setup('Groceries');

	const actionAddItemToList = () => {
		const qty = inpQtyElm.value.trim();
		const name = inpNameElm.value.trim();
		const price = inpPriceElm.value.trim();

		if (name.length > 0) {
			ListObj.addItem(Item.create(qty, name, price));
			inpQtyElm.value = '';
			inpNameElm.value = '';
			inpPriceElm.value = '';
		}
	};

	btnEdit.addEventListener('click', ListObj.editItem());
	btnCancel.addEventListener('click', ListObj.cancelEditItem());
	btnAdd.addEventListener('click', actionAddItemToList);
	document.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			actionAddItemToList;
		}
	});

})();
