// Update cart quantity display
function updateCartQuantity() {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  cartQuantityElement.textContent = totalQuantity;
}


// Update quantity link
function handleUpdateQuantity(event) {
  console.log('Update link clicked');
  const productId = event.target.dataset.productId;
  const quantitySelector = event.target.parentNode.querySelector('.quantity-label');
  const quantity = Number(quantitySelector.value);

  const matchingItem = cart.find(item => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
    paymentSummary(cart);
    renderCart(cart);
  }
}


// Delete quantity link
function handleDeleteQuantity(event) {
  console.log('Delete link clicked');
  const productId = event.target.dataset.productId;
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartQuantity();
  paymentSummary(cart);
  renderCart(cart);
}


// Radio button event listener
function handleRadioButtonChange(event) {
  console.log('Radio button changed');
  paymentSummary(cart);
  renderCart(cart);
}


// Payment Summary
function paymentSummary(cart) {
  let productSum = 0;
  let paySum = 0;
  let shippingSum = 0;
  let grossSum = 0;
  let tax = 0;
  const taxRate = 10; // Percent (e.g., 10%)
  let netSum = 0;
  let cartQuantity = 0; // Initialize cart quantity

  cart.forEach(product => {
    const selectedOption = document.querySelector(`input[name="delivery-option-${product.productId}"]:checked`);
    const shippingRate = selectedOption ? Number(selectedOption.dataset.shipping) : 0;

    productSum = product.price * product.quantity * 100; // Convert to cents: avoid floating-point math
    paySum += productSum;

    shippingSum += shippingRate;
    cartQuantity += product.quantity; // Increment cart quantity
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
}


// Items show on left side of pg.
function renderCart(cart) {
  let cartHtml = '';
  let deliveryDate = '';

  cart.forEach(product => {
    let selectedOption = document.querySelector(`input[name="delivery-option-${product.productId}"]:checked`);
    deliveryDate = selectedOption ? selectedOption.dataset.delivery : formattedFreeDate;

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
                  <select class="quantity-label js-quantity-label">
                    <!-- Ternary operator (i.e., if-statement shorthand) -->
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
              <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${product.productId}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${product.productId}">
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

  // Renders cart inside HTML grid & calls func. for handling event listeners
  document.querySelector('.js-order-summary').innerHTML = cartHtml;
  attachEventListeners();
};


function attachEventListeners() {
  // Update quantity link
  const updateLinks = document.querySelectorAll('.js-update-quantity');
  updateLinks.forEach(link => {
    link.removeEventListener('click', handleUpdateQuantity);
    link.addEventListener('click', handleUpdateQuantity);
  });

  // Delete quantity link
  const deleteLinks = document.querySelectorAll('.js-delete-quantity');
  deleteLinks.forEach(link => {
    link.removeEventListener('click', handleDeleteQuantity);
    link.addEventListener('click', handleDeleteQuantity);
  });

  // Radio button event listener
  const deliveryOptionInputs = document.querySelectorAll('.js-delivery-option-input');
  deliveryOptionInputs.forEach(input => {
    input.removeEventListener('change', handleRadioButtonChange);
    input.addEventListener('change', handleRadioButtonChange);
  });
}


// Init. pg. rendering
renderCart(cart);
paymentSummary(cart);
attachEventListeners();

// Place your order button
let placedOrder = [];
document.querySelector('.js-place-order-button').addEventListener('click', () => {
  // Move all items from cart to placedOrder & empty the cart
  placedOrder = cart;
  cart = [];

  localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage

  console.log(placedOrder);
  console.log(cart);

  updateCartQuantity();
  paymentSummary(cart);
  renderCart(cart);
});
