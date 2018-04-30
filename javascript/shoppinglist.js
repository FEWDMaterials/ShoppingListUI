(function () {
	const inpQtyElm = document.querySelector('.inp-qty .inp');
	const inpNameElm = document.querySelector('.inp-item-name .inp');
	const inpPriceElm = document.querySelector('.inp-item-price .inp');

	const inpEditIdElm = document.querySelector('#edit-row-id');
	const btnAdd = document.querySelector('.inp-actions .btn-add');

	const listTitleElm = document.querySelector('.list .list-title');


	const ListObj = (function () {
		const _listBody = document.querySelector('.lst-items');
		const totalQty = document.querySelector('.lst-totals .total-qty');
		const totalPrice = document.querySelector('.lst-totals .total-price');

		const _items = [];
		let listName = '';

		const _render = () => {
			let _qtyTotal = 0;
			let _priceTotal = 0;
			_listBody.innerHTML = '';

			_items.forEach(item => {
				_qtyTotal = _qtyTotal + item._qty;
				_priceTotal = _priceTotal + item._price;
				_listBody.appendChild(item.render());
			});

			totalQty.innerHTML = _qtyTotal;
			totalPrice.innerHTML = _priceTotal.toFixed(2);
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
		_qty: 1,
		_name: '',
		_price: 0,

		_render: function () {
			const _elemHandel = document.importNode(document.querySelector('#tpl-item-row').content, true);
			_elemHandel.querySelector('.item-qty').innerHTML = this._qty;
			_elemHandel.querySelector('.item-name').innerHTML = this._name;
			_elemHandel.querySelector('.item-price').innerHTML = this._price.toFixed(2);
			return _elemHandel;
		},

		create: function (qty, name, price) {
			const item = Object.create(this);
			item._qty = qty;
			item._name = name;
			item._price = price;
			item.render = item._render;
			return item;
		},
	};

	ListObj.setListName('Test List');

	const actionAddItemToList = () => {
		const qty = parseFloat(inpQtyElm.value.trim());
		const name = inpNameElm.value.trim();
		const price = parseFloat(inpPriceElm.value.trim());

		if (name.length !== 0) {
			ListObj.addItem(Item.create(qty, name, price));
			inpQtyElm.value = '';
			inpNameElm.value = '';
			inpPriceElm.value = '';
		}
	};

	btnAdd.addEventListener('click', actionAddItemToList);
	document.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			actionAddItemToList;
		}
	});

})();
