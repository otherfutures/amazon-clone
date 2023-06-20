// Payment Summary
function paymentSummary(cart) {
    let productSum = 0;
    let paySum = 0;
    let shippingSum = 0;
    let grossSum = 0;
    let tax = 0;
    const taxRate = 10; // Percent (e.g. 10%)
    let netSum = 0;

    cart.forEach(product => {
        const selectedOption = document.querySelector(`input[name="delivery-option-${product.productId}"]:checked`);
        const shippingRate = selectedOption ? parseInt(selectedOption.dataset.shipping) : 0;

        productSum = product.price * product.quantity * 100; // Convert to cents: avoid float pt. maths
        paySum += productSum;

        shippingSum += shippingRate;
    });

    grossSum = (paySum + shippingSum) / 100;
    tax = (grossSum * taxRate) / 100;
    netSum = grossSum + tax;

    const finalPaySum = (paySum / 100).toFixed(2);
    const finalShippingSum = (shippingSum / 100).toFixed(2);
    const finalGrossSum = grossSum.toFixed(2);
    const finalTax = tax.toFixed(2);
    const finalNetSum = netSum.toFixed(2);

    const paymentHtml = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (<span class="js-cart-quantity">${cartQuantity}</span>):</div>
          <div class="payment-summary-money">$${finalPaySum}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${finalShippingSum}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${finalGrossSum}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (${taxRate}%):</div>
          <div class="payment-summary-money">$${finalTax}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${finalNetSum}</div>
        </div>
        
        <a href="index.html">
          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
        </a>
    `;

    // Render Payment Summary Box
    document.querySelector('.js-payment-summary').innerHTML = paymentHtml;
};

function renderCart(cart, deliveryDate = formattedFreeDate) {
    let cartHtml = '';

    cart.forEach(product => {
        cartHtml += `
        <div class="cart-item-container">
            <div class="delivery-date">
                Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${product.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    $${product.price}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: 
                        <div class="product-quantity-container">
                        <select class="quantity-label">
                        // Ternary operator (i.e. if-statement shorthand)
                            <option ${product.quantity === 1 ? 'selected' : ''} value="1">1</option>
                            <option ${product.quantity === 2 ? 'selected' : ''} value="2">2</option>
                            <option ${product.quantity === 3 ? 'selected' : ''} value="3">3</option>
                            <option ${product.quantity === 4 ? 'selected' : ''} value="4">4</option>
                            <option ${product.quantity === 5 ? 'selected' : ''} value="5">5</option>
                            <option ${product.quantity === 6 ? 'selected' : ''} value="6">6</option>
                            <option ${product.quantity === 7 ? 'selected' : ''} value="7">7</option>
                            <option ${product.quantity === 8 ? 'selected' : ''} value="8">8</option>
                            <option ${product.quantity === 9 ? 'selected' : ''} value="9">9</option>
                            <option ${product.quantity === 10 ? 'selected' : ''} value="10">10</option>
                        </select>
                        </div>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity">
                    Delete
                    </span>
                </div>
                </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
        <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input js-delivery-option-input" 
                name="delivery-option-${product.productId}" 
                data-shipping="0"
                data-delivery="${formattedFreeDate}">
            <div>
            <div class="delivery-option-date js-delivery-option-date">
                ${formattedFreeDate} 
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
        <input type="radio" class="delivery-option-input js-delivery-option-input" 
            name="delivery-option-${product.productId}" 
            data-shipping="499"
            data-delivery="${formattedRegularDate}">
        <div>
        <div class="delivery-option-date js-delivery-option-date">
            ${formattedRegularDate} 
        </div>
        <div class="delivery-option-price">
            $4.99 - Shipping
        </div>
        </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input js-delivery-option-input" 
                name="delivery-option-${product.productId}" 
                data-shipping="999" 
                data-delivery="${formattedPriorityDate}">
            <div>
            <div class="delivery-option-date js-delivery-option-date">
                ${formattedPriorityDate} 
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
            </div>
        </div>
    `;
    });

    // Renders cart inside HTML grid
    document.querySelector('.js-order-summary').innerHTML = cartHtml;
};

renderCart(cart);
paymentSummary(cart);

// Add event listeners to the radio buttons
(document.querySelectorAll('.js-delivery-option-input')).forEach(input => {
    input.addEventListener('change', function () {
        cart.forEach(product => {
            const selectedOption = document.querySelector(`input[name="delivery-option-${product.productId}"]:checked`);
            const deliveryDate = selectedOption.dataset.delivery
            console.log(deliveryDate);
            paymentSummary(cart);
            //renderDeliveryDate(deliveryDate);
        });
    });
});

// Update link
// const updateQuantityLinks = document.querySelectorAll('.js-update-quantity');

// updateQuantityLinks.forEach(link => {
//     link.addEventListener('click', function (event) {
//         // Add your code here to handle the click event
//         renderCart(cart);
//         paymentSummary(cart);
//         console.log('Update link clicked');
//     });
// });


// Delete link
// (document.querySelectorAll('.js-delete-quantity')).forEach(link => {
//     link.addEventListener('click', function (event) {
//         const productIdToDelete = link.parentNode.parentNode.dataset.productId;

//         // Filtering the array to exclude the item with the matching productId
//         cart = cart.filter(product => product.productId !== productIdToDelete);

//         // Add your code here to handle the click event
//         renderCart(cart);
//         paymentSummary(cart);
//         console.log('Delete link clicked');
//     });
// });


// Place your order button
let placedOrder = [];
document.querySelector('.js-place-order-button').addEventListener('click', () => {
    // Move all items from cart to placedOrder & empty the cart
    placedOrder = cart;
    cart = [];

    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage

    console.log(placedOrder);
    console.log(cart);
});
