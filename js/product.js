// IMAGE GALLERY
function changeImage(element) {
    const mainImage = document.getElementById("mainProductImage");
    mainImage.src = element.src;
    // REMOVE ACTIVE CLASS
    document.querySelectorAll(".thumbnail-img").forEach(img => {
        img.classList.remove("active-thumb");
    });
    // ADD ACTIVE CLASS
    element.classList.add("active-thumb");
}
// QUANTITY SYSTEM
let quantity = 1;
function increaseQty() {
    quantity++;
    document.getElementById("quantity").innerText = quantity;
}
function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        document.getElementById("quantity").innerText = quantity;
    }
}
// DYNAMIC PRODUCT LOADING (SIMULATION)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
console.log("Loaded Product ID:", productId);
