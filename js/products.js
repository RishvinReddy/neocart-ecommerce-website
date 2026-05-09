// FILTER ELEMENTS
const categoryFilter = document.getElementById("categoryFilter");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-item");
// UPDATE PRICE LABEL
priceRange.addEventListener("input", () => {
    priceValue.innerText = priceRange.value;
    filterProducts();
});
// CATEGORY FILTER
categoryFilter.addEventListener("change", filterProducts);
// SEARCH FILTER
searchInput.addEventListener("keyup", filterProducts);
// MAIN FILTER FUNCTION
function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedPrice = parseInt(priceRange.value);
    const searchText = searchInput.value.toLowerCase();
    products.forEach(product => {
        const category = product.dataset.category;
        const price = parseInt(product.dataset.price);
        const name = product.dataset.name.toLowerCase();
        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;
        const priceMatch =
            price <= selectedPrice;
        const searchMatch =
            name.includes(searchText);
        if (categoryMatch && priceMatch && searchMatch) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
