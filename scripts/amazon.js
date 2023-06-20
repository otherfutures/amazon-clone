let productsHTML = '';

products.forEach(product => {
    productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="js-product-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-image="${product.image}"
        data-product-price="${(product.priceCents / 100).toFixed(2)}">
        Add to Cart
        </button>
      </div> 
    `;
});

// Renders products in grid format
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Add to cart button
document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Destruct. shortcut for dataset var. (usually e.g. button.dataset.productID)
        const { productId } = button.dataset;
        const { productName } = button.dataset;
        const { productImage } = button.dataset;
        const { productPrice } = button.dataset;

        let matchingItem;

        // Check for pre-exist. duplicate items
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        // Drop down selection; multi. units of product    
        const quantitySelector = document.querySelector(
            `.js-product-quantity-${productId}`
        );
        const quantity = Number(quantitySelector.value);

        // If item already in cart, add quantity; else add item w/ obj. values
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            cart.push({
                productId, // Shorthand property
                name: productName,
                image: productImage,
                price: productPrice,
                quantity
            });
        }

        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
    });
});

