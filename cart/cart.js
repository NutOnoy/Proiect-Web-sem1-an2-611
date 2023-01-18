if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var removeProductButtonList = document.getElementsByClassName('plus')
    for (var i = 0; i < removeProductButtonList.length; i++) {
        var removeButton = removeProductButtonList[i]
        removeButton.addEventListener('click', removeProduct)
    }

    var qntInputs = document.getElementsByClassName('cart-qnt-input')
    for (var i = 0; i < qntInputs.length; i++) {
        var input = qntInputs[i]
        input.addEventListener('change', qntChange)
    }
}

function updateCart() {
    for (let i = localStorage.length - 1; i >= 0; i -= 2) {
        let productTitle = localStorage.key(i)
        let productPrice = localStorage.getItem(productTitle)
        let productImg = JSON.parse(localStorage.getItem("p" + productTitle))
        console.log(productTitle)
        console.log(productPrice)
        console.log(productImg)
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartRowItem = `
            <div class = "cart-item cart-column">
                <img class = "cart-item-image" src="${productImg}" width="100" height="100">
                <span class = "cart-item-title"> ${productTitle} </span>
            </div>
            <span class = "cart-price cart-column> ${productPrice} </span>
            <div class = "cart-qnt cart-column>
                <input class = "cart-qnt-input" type="number" value="1">
                <button class = "plus">
                 +
                </button>
            </div>`
        cartRow.innerHTML = cartRowItem
        cartItems+=cartRow
        cartRow.getElementsByClassName('plus')[0].addEventListener('click', removeProduct)
        cartRow.getElementsByClassName('cart-qnt-input')[0].addEventListener('change', qntChange)
    }
    localStorage.clear()
}

function updateTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-qnt-input')[0]
        var price = parseFloat(priceElement.innerText.replace(' lei', ''))
        var quantity = quantityElement.value
        total += price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' lei'
}

function removeProduct(event) {
    var button = event.target
    button.parentElement.parentElement.remove()
    updateTotal()
}

function qntChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0)
        input.value = 1
    updateTotal()
}

window.onload = updateCart()