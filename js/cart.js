// SAMPLE PRODUCTS DATABASE
const products = [
    {
        id: 1,
        name: "Premium Smartphone X",
        price: 24999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 4499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 2999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    }
];
// GET CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// ADD TO CART
function addToCart(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    alert("Product added to cart!");
}
// RENDER CART
function renderCart() {
    const cartContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    let subtotal = 0;
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <h3>Your cart is empty</h3>
                <a href="products.html" class="btn btn-dark mt-3">
                    Continue Shopping
                </a>
            </div>
        `;
        subtotalElement.innerText = "₹0";
        totalElement.innerText = "₹0";
        return;
    }
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item shadow-sm p-3 rounded mb-4">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <img
                            src="${item.image}"
                            class="img-fluid rounded"
                            alt="${item.name}"
                        >
                    </div>
                    <div class="col-md-4">
                        <h5>${item.name}</h5>
                        <p class="text-muted">
                            ₹${item.price}
                        </p>
                    </div>
                    <div class="col-md-3">
                        <div class="d-flex align-items-center gap-2">
                            <button
                                class="btn btn-outline-dark"
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                -
                            </button>
                            <span class="fw-bold">
                                ${item.quantity}
                            </span>
                            <button
                                class="btn btn-outline-dark"
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <button
                            class="btn btn-danger"
                            onclick="removeFromCart(${item.id})"
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    subtotalElement.innerText = `₹${subtotal}`;
    totalElement.innerText = `₹${subtotal + 199}`;
}
// CHANGE QUANTITY
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    saveCart();
    renderCart();
}
// REMOVE PRODUCT
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}
// LOAD CART
renderCart();
