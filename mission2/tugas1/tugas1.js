const minusButtons = document.getElementsByClassName("minus");
const plusButtons = document.getElementsByClassName("plus");
const inputFields = document.getElementsByClassName("input");
const removeButton = document.getElementById('remove-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const addItemButtons = document.querySelectorAll('.add-item-btn');

const cart = [];
let total = 0;

for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener('click', event => {
        event.preventDefault();
        const currentValue = Number(inputFields[i].value) || 0;
        inputFields[i].value = currentValue - 1;
        console.log("minus clicked");
    });
}

for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener('click', event => {
        event.preventDefault();
        const currentValue = Number(inputFields[i].value) || 0;
        inputFields[i].value = currentValue + 1;
        console.log("plus clicked");
    });
}

addItemButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const itemName = button.getAttribute('data-item');
        const itemPrice = parseFloat(button.getAttribute('data-price'));

        cart.push({
           
            name: itemName,
            price: itemPrice
        });
        total += itemPrice;

        updateCartUI();
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const pict = document.createElement("IMG");
        pict.setAttribute("src", "/images/blue-shoes.jpg");
        pict.setAttribute("width", "300");
        pict.setAttribute("height", "200");
        pict.setAttribute("alt", "blue-shoes");
        cartItemsContainer.appendChild(pict);

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - $${item.price}<hr>`;
        cartItemsContainer.appendChild(itemDiv);
    });
    cartTotalSpan.textContent = total.toFixed(2);
}

function removeFromCart() {
    cartItemsContainer.innerHTML = '';
    cartTotalSpan.textContent = 0;
    alert('Items removed from cart!');
}

removeButton.addEventListener('click', () => {
    removeFromCart();
});