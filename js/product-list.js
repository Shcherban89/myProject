class ProductList {
  constructor(cart) {
    this.cart = cart;
    this.container = document.querySelector('.products-container');
    this.productService = new ProductsService();
    this.productService
      .getProducts()
      .then(() => this.renderProducts())
      .then(() => this.addEventListeners());    
  }
  async renderProducts() {
    let productListDomString = '';
    const products = await this.productService.getProducts();
    products.forEach(product => {
      productListDomString += `<div class="product_box">
                  <div class="card product">
                    <img class="card-img-top" src="img/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body product_description">
                      <h5 class="card-title">${product.title}</h5>
                      <p class="card-text">${product.description}</p>
                        <p class="price-hammock">${product.price} грн | <span>${product.old_price}</span> грн</p>
                      <div class="product_button">
                        <button class="btn btn-info" data-toggle="modal"
                          data-target="#productInfoModal" data-id="${product.id}">
                          детальніше
                        </button>
                        <button class="btn buy" data-id="${product.id}">
                         купити
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    });
    this.container.innerHTML = productListDomString;
  }
  addEventListeners() {
    document
      .querySelectorAll('.product .btn-info')
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductInfoClick(event)
        )
      );
    document
      .querySelectorAll(
        '.card.product button.buy, #productInfoModal button.buy'
      )
      .forEach(button =>
        button.addEventListener('click', event =>
          this.handleProductBuyClick(event)
        )
      );
  }
  async handleProductInfoClick(event) {
    const button = event.target; // Button that triggered the modal
    const id = button.dataset.id; // Extract info from data-* attributes
    const product = await this.productService.getProductById(id);
    const modal = document.querySelector('#productInfoModal');
    const productImg = modal.querySelector('.modal-body .card-img-top');
    productImg.setAttribute('src', 'img/' + product.image);
    productImg.setAttribute('alt', product.title);
    modal.querySelector('.modal-body .card-title').innerText = product.title;
    modal.querySelector('.modal-body .card-text').innerText =
      product.description;
    const btnBuy = modal.querySelector('button.buy');
    btnBuy.innerText = `${product.price} грн - купити`;
    btnBuy.dataset.id = id;
  }
  handleProductBuyClick(event) {
    const button = event.target;
    const id = button.dataset.id;
    this.cart.addProduct(id);
    window.showAlert('Продукт доданий в кошик');
  }
}
