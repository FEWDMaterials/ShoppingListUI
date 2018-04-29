(function() {
  // Shopping List Factory
  const shoppingListFactory = (name, list = []) => {
    return {
      name: name,
      list: list,
      addToShoppingList(item, price) {
        this.list = this.list.concat({item, price});
      },
      removeFromShoppingList() {
        this.list = this.list.slice(0, -1)
      },
      removeFirstItem() {
        this.list = this.list.slice(1);
      },
      removeNthItem (i) {
        if (i < this.list.length && i > 0 && Number.isInteger(i) == true) {
            this.list.splice(i, 1);
        } else {
            throw new Error('error')
        }
        return this.list;
      },
      removeNItems(i, num) {
        if (i < 0 || isNaN(num) || isNaN(i) || i+num > this.list.length || num > this.list.length) {
          throw new Error('invalid')
        }
        return this.list.slice(0, i).concat(this.list.slice(i+num+1))
      },
      smartRemoveItems(i) {
        if (i > this.list.length) return []
        if (i < 0) return this.list.slice(0, i)

        return this.list.slice(i)
      },
      spliceItem(item, i) {
        if (typeof item.item === "undefined" || typeof item.price === "undefined") {
          throw new Error('invalid item')
        }

        if (i > this.list.length) return this.addToShoppingList(item, this.list)
        if (i < 0) return [item].concat(this.list)

        return this.list.slice(0, i).concat([item]).concat(this.list.slice(i))
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
      combineLists(items1, items2) {
        const v1 = items1.filter(item => item.item && item.price);
        if (v1.length != items1.length) throw new Error('invalid items1')

        return items1.concat(items2)
      },
      splitListAt(i) {
        if (i < 0) return [list, []]
        if (i > this.list.length) return [[], this.list]

        return [this.list.slice(0, i+1), this.list.slice(i+1)]
      },
      canExpressCheckout() {
        return this.list.length < 10;
      },
      computeSum() {
        return this.list.reduce((sum, curr) => sum += curr.price, 0);
      },
      computeSumWithTax(taxRate = 8.125) {
        return (this.computeSum() * (1 + taxRate/100)).toFixed(2);
      },
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
      },
      storeShoppingList() {
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem(this.name, JSON.stringify(this.list));
        } else {
           throw new Error('No Local Storage Support')
        }
      },
      removeShoppingList() {
        if ((typeof(Storage) !== "undefined") && (localStorage.getItem(this.name) !== null)) {
          localStorage.removeItem(this.name);
        } else if ((typeof(Storage) !== "undefined") && (localStorage.getItem(this.name) === null)) {
          throw new Error('Shopping List Not Found in Storage')
        } else {
           throw new Error('No Local Storage Support')
        }
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
      }
    };
  }
  // End of Factory Function

  const getShoppingList = ( name ) => {
    if ((typeof(Storage) !== "undefined") && (localStorage.getItem(name) !== null)) {
      return shoppingListFactory(name, JSON.parse(localStorage.getItem(name)));
    } else {
      return shoppingListFactory(name);
    }
  }

  const getShoppingLists = () => {
    let lists = {};
    for (let i = 0; i < localStorage.length; i++) {
      let list = localStorage.key(i);
      let items = JSON.parse(localStorage.getItem(list));
      lists[ list ] = items;
    }
    return lists;
}

const displayShoppingLists = (lists) => {
  let listCard = '';
  if(Object.keys(lists).length) {
    for(let key in lists) {
      if (lists.hasOwnProperty(key)) {
        let list = getShoppingList(key);
         listCard += `<div class="column is-3">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              ${list.name}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>Number of Items: ${list.countItemsInList()}</p>
              <p>List Total Price: ($) ${list.computeSum()}</p>
              <p>List Total Price with Tax: ($) ${list.computeSumWithTax()}</p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item js-edit-list">Edit</a>
            <a href="#" class="card-footer-item js-delete-list">Delete</a>
          </footer>
        </div>
      </div>`;

     }

    }

  } else {
    listCard = `<div class="notification">
            <p>No Lists Added Yet. Go Ahead And Add One Why Don't You</p>
        </div>`;
  }


document.querySelector('.js-data').innerHTML = listCard;
deleteListfromStoreBtn();
editListfromStoreBtn();

}

const openModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.add('is-active');
  return modal;
}

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.remove('is-active');
  // re-render everytime modal closes, to refect changes
  displayShoppingLists(getShoppingLists())
}

const closeAction = document.querySelector('.delete');
closeAction.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

const addNewList = document.querySelector('.js-add-list');
addNewList.addEventListener('click', e => {
  e.preventDefault();
  const modal = openModal();
  const title = modal.querySelector('.modal-card-title');
  const content = modal.querySelector('.modal-card-body');
  title.innerHTML = 'Adding New Shopping List';
  content.innerHTML = modalTitleField();
  content.innerHTML += modalItemFields();
  content.innerHTML += modalButtons();
  addMoreItemsButton();
  removeLastItemButton();
});



const deleteListfromStoreBtn = () => {
  const deleteListBtn = document.querySelectorAll('.js-delete-list');
  if (typeof(deleteListBtn) != 'undefined' && deleteListBtn != null) {
    deleteListBtn.forEach((element) => {
      element.addEventListener('click', e => {
        e.preventDefault();
        const listName = e.target.parentNode.parentElement.children[0].children[0].innerText;
        localStorage.removeItem(listName);
        // re-render to refect changes
        displayShoppingLists(getShoppingLists())
      });
    });
  }

}

const editListfromStoreBtn = () => {
  const editListBtn = document.querySelectorAll('.js-edit-list');
  if (typeof(editListBtn) != 'undefined' && editListBtn != null) {
    editListBtn.forEach((element) => {
      element.addEventListener('click', e => {
      e.preventDefault();
      const listName = e.target.parentNode.parentElement.children[0].children[0].innerText;
      const modal = openModal();
      const title = modal.querySelector('.modal-card-title');
      const content = modal.querySelector('.modal-card-body');
      const currentList = getShoppingList(listName);
      title.innerHTML = `Editing ${listName}`;
      content.innerHTML = modalTitleField(listName);
      const titleField = modal.querySelector('.js-title-field');
      titleField.classList.add('hidden');

      currentList.list.forEach((item) => {
        content.innerHTML += modalItemFields(item.item, item.price);
      });

      content.innerHTML += modalButtons();
      addMoreItemsButton();
      removeLastItemButton();
      });
    });
  }
}

const modalSaveButton = document.querySelector('.modal-save-button');
modalSaveButton.addEventListener('click', e => {
  e.preventDefault();
  const inputs = Array.from(document.querySelectorAll('.input'));
  const valid = validateInputs(inputs);
  if( valid === true ) {
    const title = inputs[0].value;
    const prices = [];
    const items = [];
    const shoppingList = getShoppingList(title);
    inputs.forEach( (element, i) => {
      if(i !== 0) {
        if((i % 2) === 0) {
          // Need these dudes to be Numbers :)
          prices.push(parseInt(element.value));
        }
        if((i % 2) !== 0) {
          items.push(element.value);
        }
      }
    })

    // reset the current shopping list
    shoppingList.list = [];

    if(items.length === prices.length) {
      for (let i = 0; i < items.length; i++) {
        // resave the current shopping list with possible new items, or less items then before
        shoppingList.addToShoppingList(items[i], prices[i]);
      }
    }
    shoppingList.storeShoppingList();
    closeModal();

  }
});



const modalCancelButton = document.querySelector('.modal-cancel-button');
modalCancelButton.addEventListener('click', e => {
  e.preventDefault();
  closeModal();
});

const addMoreItemsButton = () => {
  addMoreButton = document.querySelector('.add-more-items');
  addMoreButton.addEventListener('click', e => {
  e.preventDefault();
  let fields = Array.from(document.querySelectorAll('.field.is-horizontal'));
  let last = fields[fields.length-1];
  last.insertAdjacentHTML('afterend', modalItemFields());
  });
}

const removeLastItemButton = () => {
  lastItemButton = document.querySelector('.remove-last-item');
  lastItemButton.addEventListener('click', e => {
    let fields = Array.from(document.querySelectorAll('.field.is-horizontal'));
    if(fields.length !== 1) {
      let last = fields[fields.length-1];
      last.outerHTML = '';
    }

  });

}

const modalTitleField = ( title = '' ) => {
  return `<div class="field js-title-field">
    <div class="control">
      <input class="input" type="text" placeholder="Shopping List Title" value="${title}" required>
      <p class="help is-danger"></p>
    </div>
  </div>`;
}

const modalItemFields = ( item = '', price = '' ) => {
  return `<div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Item Name" value="${item}" required>
        </p>
        <p class="help is-danger"></p>
      </div>

      <div class="field">
        <p class="control is-expanded">
          <input class="input" type="text" placeholder="Item Price" value="${price}" required>
        </p>
        <p class="help is-danger"></p>
      </div>
    </div>
  </div>`;
}

const modalButtons = () => {
  return `<div class="field is-grouped is-grouped-centered">
  <p class="control">
    <a class="button is-info add-more-items">
      Add Another Item
    </a>
  </p>
  <p class="control">
    <a class="button is-light remove-last-item">
      Remove Last Item
    </a>
  </p>
</div>`;
}

const validateInputs = ( inputs ) => {
  let missingFields = [];
  inputs.forEach((element, i) => {
    if(i === 0 && (element.value === '' || element.value.length < 3)) {
        missingFields.push(element);
        element.classList.add('is-danger');
        if(element.nextElementSibling !== null) {
          element.nextElementSibling.innerHTML = 'You must add a name to your shopping list';
        }
      } else {
        element.classList.remove('is-danger');
        if(element.nextElementSibling !== null) {
          element.nextElementSibling.innerHTML = '';
        }
      }
      if(i !== 0) {
        if((i % 2) === 0) {
          if(element.value === '' || element.value === '0') {
            missingFields.push(element);
              element.classList.add('is-danger');
              if(element.parentElement.nextElementSibling !== null) {
                element.parentElement.nextElementSibling.innerHTML = 'You must enter a valid price';
              }
          } else {
            element.classList.remove('is-danger');
            if(element.parentElement.nextElementSibling !== null) {
              element.parentElement.nextElementSibling.innerHTML = '';
            }
            missingFields.splice(i, 1);
          }
        }
        if((i % 2) !== 0) {
          if(element.value === '' || element.value.length < 3) {
             missingFields.push(element.placeholder);
              element.classList.add('is-danger');
              if(element.parentElement.nextElementSibling !== null) {
                element.parentElement.nextElementSibling.innerHTML = 'You must add an Item name with at least 3 characters ';
              }
          } else {
            element.classList.remove('is-danger');
            if(element.parentElement.nextElementSibling !== null) {
              element.parentElement.nextElementSibling.innerHTML = '';
            }
            missingFields.splice(i, 1);
          }
        }
      }
  });

  if (missingFields.length > 0) {
        return false;
  }
  return true;
}


const checkShoppingListStorage = () => {
  lists = getShoppingLists();
  displayShoppingLists( lists );
}

const emptyStoreBtn = document.querySelector('.empty-storage');
emptyStoreBtn.addEventListener('click', e => {
   if (typeof(Storage) !== "undefined") {
    localStorage.clear();
    // re-render everytime modal closes, to refect changes
  displayShoppingLists(getShoppingLists())
   }
});

// Boot the shit yo !!
checkShoppingListStorage();
})();
