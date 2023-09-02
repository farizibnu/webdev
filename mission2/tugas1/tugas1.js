const plusButtons = document.querySelectorAll('.plus');
const minusButtons = document.querySelectorAll('.minus');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantityInputs = document.querySelectorAll('.quantity');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartSubTotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById("cart-tax");
const removeButton = document.getElementById("remove-btn");

let cart = {};
const taxRate = 0.11;
const productPrices = [1400000, 2200000, 1200000, 30000000, 1800000, 2500000];

plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantity = parseInt(quantityInputs[index].value);
        quantity++;
        quantityInputs[index].value = quantity;
    });
});

minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let quantity = parseInt(quantityInputs[index].value);
        if (quantity > 0) {
            quantity--;
            quantityInputs[index].value = quantity;
        }
    });
});

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.product')[index].getAttribute('data-product-name');
        const productPrice = productPrices[index];
        const productImage = document.querySelectorAll('.product')[index].getAttribute('data-product-image');
        const quantity = parseInt(quantityInputs[index].value);

        if (quantity > 0) {
            if (cart[productName]) {
                cart[productName].quantity += quantity;
            } else {
                cart[productName] = {
                    price: productPrice,
                    quantity: quantity,
                    image: productImage,
                };
            }

            updateCart();
        }
    });
});

function updateCart() {
    cartItemsList.innerHTML = '';
    let subtotal = 0;

    for (const productName in cart) {
        const product = cart[productName];
        const listItem = document.createElement('li');
        listItem.classList.add("no-bullets");
        listItem.innerHTML = `
                    <img src="${product.image}" alt="${productName}" width="80">
                    <span class="bold">${productName}</span><br><span class="d-flex justify-content-between">Jumlah: ${product.quantity}<span class="bold">Harga: ${formatToRupiah(product.price * product.quantity)}</span></span>
                <hr>`;
        cartItemsList.appendChild(listItem);
        subtotal += product.price * product.quantity;
    }

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    cartSubTotal.textContent = formatToRupiah(subtotal);
    cartTax.textContent = formatToRupiah(tax);
    cartTotal.textContent = formatToRupiah(total);
}

function formatToRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(number);
}

function removeFromCart() {
    cartItemsList.innerHTML = '';
    cartSubTotal.textContent = 0;
    cartTax.textContent = 0;
    cartTotal.textContent = 0;
    total = 0;
    cart = {};
    alert('Items removed from cart!');
}

removeButton.addEventListener('click', () => {
    if (cart !== 0) {
        removeFromCart();
    }
});