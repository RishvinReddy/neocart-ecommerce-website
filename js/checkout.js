// LOAD CART
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutItems = document.getElementById("checkoutItems");
const subtotalElement = document.getElementById("checkoutSubtotal");
const totalElement = document.getElementById("checkoutTotal");
let subtotal = 0;
// DISPLAY CART ITEMS
cart.forEach(item => {
    subtotal += item.price * item.quantity;
    checkoutItems.innerHTML += `
        <div class="d-flex align-items-center mb-3">
            <img
                src="${item.image}"
                width="70"
                height="70"
                class="rounded me-3 object-fit-cover"
            >
            <div class="flex-grow-1">
                <h6 class="mb-1">
                    ${item.name}
                </h6>
                <small class="text-muted">
                    Qty: ${item.quantity}
                </small>
            </div>
            <strong>
                ₹${item.price * item.quantity}
            </strong>
        </div>
    `;
});
// UPDATE TOTALS
subtotalElement.innerText = `₹${subtotal}`;
totalElement.innerText = `₹${subtotal + 199}`;
// FORM VALIDATION
$("#checkoutForm").submit(function (e) {
    e.preventDefault();
    const firstName = $("#firstName").val().trim();
    const lastName = $("#lastName").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const address = $("#address").val().trim();
    const city = $("#city").val().trim();
    const pincode = $("#pincode").val().trim();
    // VALIDATION
    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {
        alert("Please fill all fields");
        return;
    }
    // EMAIL VALIDATION
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email address");
        return;
    }
    // PHONE VALIDATION
    if (phone.length < 10) {
        alert("Invalid phone number");
        return;
    }
    // GENERATE ORDER ID
    const orderId =
        "NC" + Math.floor(Math.random() * 1000000);
    // SAVE ORDER
    localStorage.setItem("orderId", orderId);
    // CLEAR CART
    localStorage.removeItem("cart");
    // REDIRECT
    window.location.href = "confirmation.html";
});
