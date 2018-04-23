//localStorage.removeItem("myList");

let myList = [],
    budget = localStorage.getItem("myBudget"),
    storageList = localStorage.getItem("myList"),
    listHeaders01 = [{header: "Item", width: 220},
                     {header: "Price", width: 140},
                     {header: "Discount", width: 120},
                     {header: "Subtotal", width: 120},
                     {header: "Delete", width: 120}],
    listHeaders02 = [{header: "Item", width: 200},
                     {header: "Price", width: 80}];;

const pageLoad = () => {
    
    const $activeList = $(`<div id="activeList"></div>`).appendTo("body"),
          $tblList = $(`<table id="tblList"></table>`).appendTo($activeList),
          $rowList = $(`<tr></tr>`).appendTo($tblList);
    
    listHeaders01.forEach(function(d) {
        $(`<th>${d.header}</th>`).appendTo($rowList);
        $(`<col width="${d.width}">`).appendTo($tblList);
    });

    const $itemsList = $(`<div id="addItems">Add multiple items <input id="addItems_exit" type="button" value="X"/></div>`).appendTo("body"),
          $tblItems = $(`<table id="tblItems"></table>`).appendTo($itemsList),
          $rowHeader = $(`<tr></tr>`).appendTo($tblItems),
          $rowItems = $(`<tr></tr>`).appendTo($tblItems);
    
    listHeaders02.forEach(function(d) {
        $(`<th>${d.header}</th>`).appendTo($rowHeader);
        const $c = $(`<td class="multiple" contenteditable="true"></td>`).appendTo($rowItems);
        $c[0].addEventListener("blur", handlerItems);
        $(`<col width="${d.width}">`).appendTo($tblItems);
    });
    
    if (budget !== null) {
        $("#myBudget")[0].value = "$" + Number(budget).toFixed(2);
    }
    
    function handlerItems() {

        const tbl = this.parentElement.parentElement
        let rowCount = tbl.rows.length;
        const row = $(this).closest("tr");

        let rVal = "";
        row.find("td").each(function(i) {
            rVal += this.innerText;
            if (i == 0 && this.innerHTML.length > 0) {
                this.innerHTML = this.innerHTML.toUpperCase()
            } else if (this.innerHTML.length > 0) {
                this.innerHTML = "$" + Number(this.innerHTML).toFixed(2);
            }
        });

        let lVal = "";
        $(tbl).find("tr").last().find("td").each(function(d) {
            lVal += this.innerText;
        });

        if (rowCount <= 2 && rVal.length === 0) {
            console.log("Just Right");
        } else if (rVal.length > 0 && lVal.length > 0) {
            const $r = $(`<tr></tr>`).appendTo(tbl);
            listHeaders02.forEach(function(d) {
                const $c = $(`<td class="multiple" contenteditable="true"></td>`).appendTo($r);
                $c[0].addEventListener("blur", handlerItems);
            });
            adjHeight($("#addItems"), 44);

        } else if (rVal.length === 0) {
            row.remove()
            adjHeight($("#addItems"), -44);
        }
    }
    
    const adjHeight = ($obj, val) => {
        $obj.css("height",`${$obj.height() + val}px`);
    }
    
    $(document).ready(function() {
        $("#addItems_exit").click(function() {
            $("#addItems").slideToggle(250, function() {
                if($("#addItems_button").val() == "Add")
                {
                    $("#addItems_button").val("Add Items");
                    addMultipleList(false);
                }
                else
                {
                    $("#addItems_button").val("Add");
                }
            });
        });
    });
    
    if (storageList !== null) {
        JSON.parse(storageList).forEach(function(d) {
            newShoppingListItem($("#tblList")[0], d.item, d.price, d.coupon)
        });
    }

}

const newShoppingListItem = (tbl, item, price, coupon = "") => {
    const self = this,
          rowCount = tbl.rows.length;

    self.validItem = (item) => {
        let errText = "";
        if (typeof item != "string") {
            errText = "argument 'item' != string|item:"+item.toUpperCase();
        } else if (item.length >= 10) {
            errText = "item.length must be < 10|item.length:"+item.length;   
        } else if (item.length < 3) {
            errText = "item.length must be >= 3|item.length:"+item.length;   
        } 

        if (errText.length != 0) {
            alert(errText);
            //throw error;
            return false;
        } else {
            return true;
        }
    }
    
    self.validPrice = (price) => {
        let errText = "";
        if (typeof price != "number") {
            errText = "argument 'price' != number|price:"+price;
        } else if (price >= 100) {
            errText = "price must be < 100|price:"+price;
        } else if (price <= 0) {
            errText = "price must be > 0|price:"+price;
        } else if (Math.round(price * 100) / 100 != price) {
            errText = "price may not exceed hundredths|price:"+price;
        }

        if (errText.length != 0) {
            alert(errText);
            //throw error;
            return false;
        } else {
            return true;
        }
    }
    
    self.validCoupon = (coupon) => {
        let errText = "";
        if (typeof coupon != "number") {
            errText = "argument 'coupon' != number|coupon:"+coupon;
        } else if (coupon > 100) {
            errText = "coupon must be <= 100|coupon:"+coupon;
        } else if (coupon < 0) {
            errText = "coupon must be > 0|coupon:"+coupon;
        } else if (Math.round(coupon) != coupon) {
            errText = "coupon must be whole number|coupon:"+coupon;
        }

        if (errText.length != 0) {
            alert(errText);
            //throw error;
            return false;
        } else {
            return true;
        }
    }

    if (self.validItem(item) && self.validPrice(price)) {

        const obj = myList.find(function (obj) { return obj.item === item.toUpperCase(); }),
              col = {
                item:  item,
                price: price,
                coupon: coupon,
                total: price
              };
        
        if (obj === undefined) {
            const $row = $("<tr></tr>").appendTo(tbl)
            myList.push(col);

            listHeaders01.forEach(function(d, i) {
                const $c = $("<td></td>").appendTo($row);
                if (i < 3) {
                    $c[0].addEventListener("focus", onFocus)
                    $c[0].addEventListener("blur", onEdit)
                    $c.attr("contenteditable", "true");
                    $c.addClass(Object.keys(col)[i])
                    if (i == 0) {
                        $c.html(Object.values(col)[i].toUpperCase())
                    } else if (i == 1) {
                        const val = "$" + Number(Object.values(col)[i]).toFixed(2);
                        $c.html(val)
                    } else {
                        
                        if (Object.values(col)[i].length > 0) {
                            $c.addClass("coupon_active")
                        }
                        $c.html(Object.values(col)[i])
                    }
                } else if (i == 3) {
                    $c.addClass(Object.keys(col)[i])
                    const val = "$" + Number(Object.values(col)[i]).toFixed(2);
                    $c.html(val)                           
                }  else if (i == 4) {
                    const btn = document.createElement("button");
                    btn.classList.add("delete");
                    btn.innerHTML = "X";
                    $(btn).appendTo($c);                          
                }
            });
            
            myList = updateArray();
            updateTotal();
        } else {
            alert("Item already in list: " + item.toUpperCase());
        }
    }
        
    $("button[class='delete']").click(function(e){
        $(this).closest("tr").remove()
        myList = updateArray();
        updateTotal();
    })
    
    function onFocus() {
        const $obj = $(this);
        $obj[0].setAttribute("old_value", $obj[0].innerHTML.toUpperCase());
    }
    
    function onEdit() {
        const $obj = $(this),
              val = $obj[0].innerHTML;

        if ($obj.hasClass("item")) {
            const obj = myList.find(function (obj) { return obj.item === val.toUpperCase(); });

            if (obj != undefined && $obj.attr("old_value") != $obj[0].innerHTML.toUpperCase()) {
                alert("Item already in list: " + val.toUpperCase());
                $obj[0].innerHTML = $obj.attr("old_value");  
            } else if (self.validItem(val)) {
                $obj[0].innerHTML = $obj[0].innerHTML.toUpperCase()   
                myList = updateArray();
                updateTotal();
            } else {
                $obj[0].innerHTML = $obj.attr("old_value");   
                myList = updateArray();
                updateTotal();
            }
        } else if ($obj.hasClass("price")) {
            const price = Number(val.replace(/[^0-9\.-]+/g,"")),
                  $coupon = $obj.parent().find(".coupon_active"),
                  $total = $obj.parent().find(".total");
            let discount = 0;

            if ($coupon[0] !== undefined) {
                  discount = Number($coupon[0].innerHTML.replace(/[^0-9\.-]+/g,""))
                }
            
            if (self.validPrice(Number(val.replace(/[^0-9\.-]+/g,""))) === false) {
                $obj[0].innerHTML = $obj.attr("old_value");   
            } else {
                $total[0].innerHTML = "$" + (price * (1 - (discount / 100))).toFixed(2);
                $obj[0].innerHTML = "$" + Number(val.replace(/[^0-9\.-]+/g,"")).toFixed(2); 
            }
            myList = updateArray();
            updateTotal();
        } else if ($obj.hasClass("coupon") || $obj.hasClass("coupon_active")) {
            
            const discount = Number(val.replace(/[^0-9\.-]+/g,"")),
                  $price = $obj.parent().find(".price"),
                  price = Number($price[0].innerHTML.replace(/[^0-9\.-]+/g,"")),
                  $total = $obj.parent().find(".total");
            
            if (self.validCoupon(discount) === false) {
                $obj[0].innerHTML = $obj.attr("old_value");   
            } else if (discount > 0) {
                $obj[0].innerHTML = discount + "%";
                $total[0].innerHTML = "$" + (price * (1 - (discount / 100))).toFixed(2);
                $obj[0].setAttribute("class", "coupon_active");
            } else {
                $obj[0].innerHTML = "";
                $total[0].innerHTML = "$" + price.toFixed(2);
                $obj[0].setAttribute("class", "coupon");
            }  
            myList = updateArray();
            updateTotal();
            
        } 
    }
    
}

    const validBudget = (budget) => {
        let errText = "";
        if (typeof budget != "number") {
            errText = "argument 'budget' != number|budget:"+budget;
        } else if (budget < 0) {
            errText = "budget must be >= 0|budget:"+budget;
        } else if (Math.round(budget * 100) / 100 != budget) {
            errText = "budget may not exceed hundredths|budget:"+budget;
        }

        if (errText.length != 0) {
            alert(errText);
            //throw error;
            return false;
        } else {
            return true;
        }
    }

    $(document).ready(function() {
        $("#addItem").click(function() {
            const $tbl = $("#tblList"),
                  $item = $("#newItem"),
                  $price = $("#newPrice");                      
            newShoppingListItem($tbl[0], $item[0].value, Number($price[0].value));
            $item[0].value = "";
            $price[0].value = "";
        });
    });

    $(document).ready(function() {
        $("#myBudget").blur(function() {

            const $obj = $(this),
                  budget = Number($obj[0].value.replace(/[^0-9\.-]+/g,"")),
                  tot = Number($("#subTotal").html().replace(/[^0-9\.-]+/g,""));

            if (validBudget(budget)) {
                $obj[0].value = "$" + budget.toFixed(2);
                localStorage.setItem("myBudget", budget);
            };
            if (tot > budget) {
                $obj.css("background-color", "lightpink");
            } else {
                $obj.css("backgroundColor", "");
            }
        });
    });

    $(document).ready(function() {
        $("#addItems_button").click(function() {
            $("#addItems").slideToggle(250, function() {
                if($("#addItems_button").val() == "Add")
                {
                    $("#addItems_button").val("Add Items");
                    addMultipleList(true);
                }
                else
                {
                    $("#addItems_button").val("Add");
                }
            });
        });
    });

    const updateArray = () => {
        let tblData = new Array();

        $("#activeList tr").each(function(row, tr){
            const i = $(tr).find('td:eq(0)').text().toUpperCase(),
                  p = $(tr).find('td:eq(1)').text(),
                  c = $(tr).find('td:eq(2)').text(),
                  t = $(tr).find('td:eq(3)').text();
            tblData[row]={
                "item" : i, 
                "price" : Number(p.replace(/[^0-9\.-]+/g,"")),
                "coupon" : c,
                "total" : Number(t.replace(/[^0-9\.-]+/g,""))
            }
        }); 
        tblData.shift();  // first row is the table header - so remove

        localStorage.setItem("myList", JSON.stringify(tblData));
        return tblData;
    }

    const addMultipleList = (bool) => {
        const $tblItems = $("#tblItems"),
              $tblList = $("#tblList");

        $tblItems.find("tr").each(function(i) {
            if (i > 0) {
                const item = $(this).find("td").first()[0],
                      price = $(this).find("td").last()[0];

                 if (bool && ((item.innerText.length + price.innerText.length) != 0)) {
                    newShoppingListItem($tblList[0], item.innerText, Number(price.innerText.replace(/[^0-9\.-]+/g,"")));
                }                   
                if (i != 1) {
                    this.remove()
                } else {
                    item.innerHTML = "";
                    price.innerHTML = "";
                }
            }
        })
    }

    const updateTotal = () => {
        let tot = 0,
            $budget = $("#myBudget")
            budget = Number($budget[0].value.replace(/[^0-9\.-]+/g,""));

        function amount(item){
          return item.total;
        }

        function sum(prev, next){
          return prev + next;
        }

        if (myList.length > 0) {
            tot = myList.map(amount).reduce(sum);
        }
        
        if (tot > budget) {
            $budget.css("background-color", "lightpink");
        } else {
            $budget.css("backgroundColor", "");
        }

        $("#subTotal").html("Total: $" + tot.toFixed(2));
    }