new ProductList(new Cart());

document.querySelector(".top").addEventListener("click", toUp);

function toUp() {
    window.scrollTo(0,0);
    return!1;
} 
