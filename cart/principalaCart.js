if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var cartButtonList = document.getElementsByClassName('plus')
    for (var i = 0; i < cartButtonList.length; i++) {
        var cartButton = cartButtonList[i];
        cartButton.addEventListener('click', addProduct)
    }
}

function addProduct(event) {
    var button = event.target
    var product = button.parentElement.parentElement
    var productTitle = product.getElementsByClassName('product_name')[0].innerText
    console.log(productTitle)
    var productPrice = product.getElementsByClassName('product_price')[0].innerText
    console.log(productPrice)
    var productImg = product.parentElement.getElementsByClassName('img-responsive')[0].src
    console.log(productImg)
    addProductToCart(productTitle, productPrice, productImg)
}

function addProductToCart(productTitle, productPrice, productImg) {
    if (localStorage.getItem(productTitle) != null)
        alert("Produsul se afla deja in cosul de cumparaturi")
    else {
        localStorage.setItem(productTitle, productImg)
        localStorage.setItem("p" + productTitle, productPrice)
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i))
            console.log(localStorage.getItem(localStorage.key(i)))
        }
    }

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