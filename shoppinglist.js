const getShoppingList = () => {
	const ShoppingList = {
		list: [],
		addToList(item, price = 0) {
			this.list.push({item, price});

			return this.list;
		},
		displayList() {
			let str = '';
			for (let i = 0; i < this.list.length; i++) {
				str += (i+1) + '. ' + this.list[i] + '\n';
			}
			return str;
		},
		countItemsInList() {
			return this.list.length;
		},
		removeFromShoppingList() { this.list.slice(0, -1) },
		removeFirstItem() {
			if (this.list.length && i>0 && Number.isInteger(i) == true) {
          this.list.splice(i, 1);
      } else {
          throw new Error('error')
      }
      return this.list;
    },

		removeNItems(i, num = 0) {
			console.log("****", i, "&&", num);
			if (i < 0 || isNaN(num) || isNaN(i) || i+num > this.list.length || num > this.list.length) {
				throw new Error('invalid')
			}
			return this.list = this.list.slice(0, i).concat(this.list.slice(i+num+1))
		},
		smartRemoveItems(i) {
			if (i > this.list.length) return []
			if (i < 0) return this.list.slice(0, i)

			return this.list.slice(i)
		},
		replaceItem(item, price, i){
			return this.list[i] = {item, price};
		},
		spliceItem(item, price, i) {
			if (typeof item === "undefined" || typeof price === "undefined") {
				throw new Error('invalid item')
			}

			if (i > this.list.length) return addToList(item, price)
			if (i < 0) return [{item, price}].concat(this.list)

			return this.list.slice(0, i).concat([item]).concat(list.slice(i))
		},
		spliceItems(items, i) {
			if (!Array.isArray(items)) throw new Error('items is not array!')
			items.forEach((item) => {
				if (typeof item.item === "undefined" || typeof item.price === "undefined") {
					throw new Error('invalid item')
				}
			})
			if (items.length === 0) return this.list
			if (i > this.list.length) return this.list.concat(items)
			if (i < 0) return items.concat(this.list)
			return this.list.slice(0, i).concat(items).concat(this.list.slice(i))
		},
		combineLists(items) {
			const v1 = items.filter(item => item.item && item.price);
			if (v1.length != items.length) throw new Error('invalid items')

			return this.list.concat(this.items)
		},
		splitListAt(i) {
			if (i < 0) return [this.list, []]
			if (i > this.list.length) return [[], this.list]

			return [this.list.slice(0, i+1), this.list.slice(i+1)]
		},
		canExpressCheckout() { this.list.length < 10 },
		computeSum() {this.list.reduce((sum, curr) => sum += curr.price, 0)},
		computeSumWithTax(taxRate = 8.125) {this.computeSum(list) * (1 + taxRate/100)},
		computeSumInRange(i, j) {
			if (i > j || i < 0 || i > this.list.length || j < 0 || j > this.list.length) {
				throw new Error('Not in range')
			}
			return this.list.reduce((sum, curr, index) => {
				if (index >= i && index <= j) {
					sum += curr.price;
				}
				return sum;
			}, 0);
		}
	};

	return ShoppingList;
}


let goShopping = getShoppingList();


const shoppingInput = document.querySelector('.js-shopping-list-input');
shoppingInput.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		e.preventDefault();

		const value = e.target.value;
		shoppingList = goShopping.addToList(value, 0)
		e.target.value = "";
		render();
	}
});

const onClickEdit = (editButton) => {
	const now = Date.now();
	const itemTarget = editButton.parentElement.querySelector('.list-item');
	const itemName = itemTarget.innerText;
	const itemIndex = parseInt(itemTarget.dataset.item);
	inputHTML = `
		<input type="text" class="form-control js-shopping-edit item-edit-${now}" placeholder="${itemName}" value="${itemName}">
	`;
	editButton.parentElement.innerHTML = inputHTML;

	document.querySelector(`.item-edit-${now}`).addEventListener('keypress', (el) => {
		if (el.keyCode === 13) {
			el.preventDefault();
			const editedItem = el.target.value;
			goShopping.replaceItem(editedItem,0,itemIndex);
			render();
		}
	});
}

const onClickRemove = (removeButton) => {
	const itemTarget = removeButton.parentElement.querySelector('.list-item');
	const itemIndex = parseInt(itemTarget.dataset.item);
	console.log(itemIndex,"###");
	goShopping.removeNItems(itemIndex);
	render();
}


const render = () => {
	let list = goShopping.list;
	console.log("At render", list);
	if ( list.length === 0 ){
		document.querySelector('.js-data').innerHTML = "Shopping list empty";
		return;
	} else {
		let htmlStr = '<ul class="list-group">';

		for(let i = 0; i < list.length; i++) {
			htmlStr += `<li class="list-group-item" data-item>
				<span class="list-item" data-item=${i}>${list[i].item}</span>
				<button type="button" class="btn btn-outline-danger js-remove float-right" onclick="onClickRemove(this)"> &#xd7; </button>
				<button type="button" class="btn btn-secondary js-edit float-right" onclick="onClickEdit(this)"> Edit </button>
			</li>`;
		}
		htmlStr += "</ul>";

		document.querySelector('.js-data').innerHTML = htmlStr;

	}

}

// const ctown = getShoppingList();
// const wholefoods = getShoppingList();
//
// ctown.addToList('mangoes');
// ctown.addToList('coffee');
//
// wholefoods.addToList('steak')
// wholefoods.addToList('potatoes')
//
// console.log(wholefoods.countItemsInList())
//
// console.log('wholefoods fam')
// console.log(wholefoods.displayList())
// console.log('ctown fam')
// console.log(ctown.displayList())
