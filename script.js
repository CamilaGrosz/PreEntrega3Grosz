class Product {
  constructor(name, price, id, description){
      this.name = name;
      this.price = price;
      this.id = id;
      this.description = description;
  }
}

class User {
  constructor(user, password) {
    this.user = user;
    this.password = password;
  }
}

const USERS = [];
const PRODUCTS = [];
let cardData = {};
let cart = [];
let totalPrice = 0;
let userName = "";

const getProducts = async () => {
  try {
    const result = await fetch('./products.json');
    const data = await result.json();
    data.products.forEach(e => {
      let objeto = {
        name: e.name,
        price: e.price,
        id: e.id
      }
      PRODUCTS.push(objeto);
      console.log(PRODUCTS)
    });
  } catch (error) {
  console.error('Error:', error);
  } 
}


( async () => {
  await getProducts()
  createLogInSection();
  createLogInForm();
  createDivFormData();
  createStartBuy();
  const cartBuys = document.getElementById("cartBuys")
  const btnLogInShow = document.getElementById("btnLogInShow")
  const formLogIn = document.getElementById("formLogIn")
  btnLogInShow.onclick = () => {
    btnLogInShow.style.display = "none";
    formLogIn.style.display = "flex"
  };
  formLogIn.onsubmit = (e) => {
    e.preventDefault()
    let dataUser = e.target
    const userNameForm = dataUser.querySelector("#userName").value
    const userPass = dataUser.querySelector("#userPassword").value
    let userCoinsidence = USERS.find(e => e.userNameForm == userName)
    userName = userNameForm
    userCoinsidence  === undefined && (() => {
      const user = new User(userNameForm, userPass);
      USERS.push(user);
    })();  
  }
  
  const btnKeepShop = document.getElementById("btnKeepShop")
  const startBuyDiv = document.getElementById("startBuyDiv")
  const btnSubmit = document.getElementById("btnSubmit")
  const divFormData = document.getElementById("divFormData")
  
  btnSubmit.onclick = () => {
    let userSL = localStorage.getItem("userName")
    userSL === null ? (() => {
      localStorage.setItem("userName", userName)
      const messageFormData = createAndAppend(divFormData, "p", { id: "messageFormData" });
      messageFormData.innerText = "Bienvenidx " + userName +". Como es tu primera vez ingresa tus datos"
      divFormData.style.display = "flex"
    })() : (() => {
      const welcomeBack = createAndAppend(divFormData, "p", { id: "welcomeBack" });
      const btnKeepShop = createAndAppend(divFormData, "button", { type: "button", class: "btn btn-outline-secondary", id: "btnKeepShop" }, "Seguir comprando");
      welcomeBack.innerText = "Bienvenidx de nuevo " + userName
      startBuyDiv.style.display = "flex"
      btnKeepShop.style.display = "flex"
      cartBuys.style.display = "flex";
      formLogIn.style.display = "none"
      btnKeepShop.onclick = () => {
        startBuyDiv.style.display = "flex"
      }
      showCart()
    }) ();
    formLogIn.style.display = "none"
  }

  const btnBuy = document.getElementById("btnBuy")
  btnBuy.onclick = () => {
    showCart()
  } 

  const userPassword = document.getElementById("userPassword");

  const stopBuyingButton = document.getElementById('stopBuying');
  stopBuyingButton.addEventListener('click', function () {
    startBuyDiv.style.display = "none";
    cartBuys.innerHTML.trim() === '' ? showCart() : (() => {
      cartBuys.innerHTML = '';
      showCart();
    })
    endOfShopp()
    updateTotalPrice();
  });

  // Al submitir el form se guardan los valores (no todos se usan, es para agregar mas interacción)
  formData.onsubmit = (e) => {
    e.preventDefault();
    let dataUserRegis = e.target;
    formData.style.display = "none";
    userMail.value = dataUserRegis.querySelector("#userMail").value;
    localStorage.setItem("userMail", userMail.value);
    startBuyDiv.style.display = "flex"
  }
  const productSelect = document.getElementById('productSelect');
  const cancelBuyButton = document.getElementById('cancelBuy');
  cancelBuyButton.addEventListener('click', function () {
    cart = [];
    localStorage.removeItem('cart');
    totalPrice = 0;
    updateTotalPrice();
    const totalBuyElement = document.getElementById('totalBuy');
    totalBuyElement.innerHTML = '';
    console.log('Compra cancelada');
    startBuyDiv.style.display = "none";
    cartBuys.innerHTML = '';
  });
})();




function createAndAppend(parent, elementType, attributes = {}, textContent = "") {
  const element = document.createElement(elementType);
  Object.entries(attributes).forEach(([attr, value]) => element.setAttribute(attr, value));
  element.textContent = textContent;
  parent.appendChild(element);
  return element;
}

function createLogInSection() {
  const logInSection = createAndAppend(document.body, "section", { id: "logInSection" });
  createAndAppend(logInSection, "h1", { id: "title" }, "Apple Store");
  createAndAppend(logInSection, "button", {
    type: "button",
    class: "btn btn-outline-secondary",
    id: "btnLogInShow"
  }, "Log In");
}



function createLogInForm() {
  const formLogIn = createAndAppend(document.body, "form", { id: "formLogIn", style: "display:none" });
  createAndAppend(formLogIn, "span", { class: "input-group-text", id: "formText" }, "Inserte nombre de usuario y contraseña");
  createAndAppend(formLogIn, "input", { type: "text", "aria-label": "Usuario", class: "form-control", id: "userName", required: true });
  const userPassword = createAndAppend(formLogIn, "input", { type: "password", "aria-label": "Contraseña", class: "form-control", id: "userPassword", required: true });
  const formButtons = createAndAppend(formLogIn, "div", { id: "formButtons" });
  const showPass = createAndAppend(formButtons, "button", { type: "button", class: "btn btn-outline-secondary", id: "showPass" }, "Mostrar contraseña");
  createAndAppend(formButtons, "button", { type: "submit", class: "btn btn-outline-secondary", id: "btnSubmit" }, "Ingresar");
  showPass.onclick = () => {
    userPassword.type === "password" ? userPassword.type = "text" : userPassword.type = "password";  
  };
}



function createDivFormData() {
  const divFormData = createAndAppend(document.body, "div", { id: "divFormData" });
  const formData = createAndAppend(divFormData, "form", { class: "row g-3", id: "formData", style: "display:none" });
  const newFormHTML = `
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Nombre</label>
      <input type="text" class="input-group-text" id="inputEmail4" required>
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Contraseña</label>
      <input type="password" class="form-control" id="inputPassword4">
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label" id="">Mail</label>
      <input type="email" class="form-control" id="userMail" placeholder="abcde@mail.com" required>
    </div>
    <!-- Rest of your form elements -->
    <div class="col-12">
      <button type="button" class="btn btn-outline-secondary" id="btnStartShop">Comenzar compra</button>
    </div>
  `;
  formData.innerHTML = newFormHTML;
  
  const btnStartShop = document.getElementById("btnStartShop");
  const logInSection = document.getElementById("logInSection");

  btnStartShop.onclick = () => {
    e.preventDefault()
    logInSection.style.display = "none";
    startBuyDiv.style.display = "flex !important"
  };
}

// Function to create the start buy section
function createStartBuy() {
  const startBuyDiv = createAndAppend(document.body, "div", { id: "startBuyDiv", style: "display: none;" });
  const startBuyHTML = `
  <form id="productForm">
    <select class="form-select form-select-lg mb-3" id="productSelect">
      <option selected>Elija el producto</option>
    </select>
    <p id="productDescription"></p>
    <select class="form-select form-select-sm" id="productColor">
      <option selected>Elija el color</option>
      <option>Blanco</option>
      <option>Negro</option>
      <option>Rosa</option>
      <option>Azul</option>
    </select>
    <input type="number" class="form-control" placeholder="Cantidad" id="productQuantity">
    <button type="submit" class="btn btn-outline-secondary" id="btnBuy">Comprar</button>
    <p id="totalPrice"></p>
  </form>
  <div id="buyButtons">
    <button id="stopBuying" class="btn btn-outline-secondary">Finalizar compra</button>
    <button id="cancelBuy" class="btn btn-outline-secondary">Cancelar compra</button>
  </div>
  `;     
  startBuyDiv.innerHTML = startBuyHTML;
  products();
}


// Funcion para mostrar contraseña

function products(){
  const productSelect = document.getElementById("productSelect")
  PRODUCTS.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
  
  const productForm = document.getElementById('productForm');
  productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    startBuyDiv.style.display = "flex";
    const selectedProductId = productSelect.value;
    const selectedProduct = PRODUCTS.find((product) => product.id === parseInt(selectedProductId));
    const selectedColor = document.getElementById('productColor').value;
    const selectedQuantity = parseInt(document.getElementById('productQuantity').value);
    (selectedProduct && selectedQuantity > 0) && (() => {
      const productItem = {
        product: selectedProduct,
        color: selectedColor,
        quantity: selectedQuantity
      };
      cart.push(productItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Producto agregado al carrito:', productItem);
      totalPrice += selectedProduct.price * selectedQuantity;
      updateTotalPrice();
    })();
  });
}


function showCart(){
  cartBuys.innerHTML = ''
  let storedCardData = localStorage.getItem('cart')
  storedCardData = JSON.parse(storedCardData)
  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'list-group-flush');
  storedCardData.forEach(item => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerText = "-Producto: " + item.product.name + " Color: " + item.color + " Cantidad: " + item.quantity;
    ulElement.appendChild(liElement);
  });
  cartBuys.appendChild(ulElement);
}



function updateTotalPrice() {
  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = 'Precio total: $' + totalPrice.toFixed(2);
}

function calculateTotalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  return total;
}


function endOfShopp() {
  const buyText = document.createElement('p');
  buyText.classList.add('fs-5');
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirmar compra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Comprar',
      cancelButtonText: 'Cancelar compra',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Compra realizada!',
          'Tu compra ha sido realizada.',
          'success'
        )
        Swal.fire({
          position: 'top-end',
          title: 'Compra realizada',
          text: `Recuerde que el pedido se abona en efectivo.`,
          showConfirmButton: false,
          timer: 15000
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Compra cancelada',
          'TU compra ha sido realizada.',
          'error'
        )
      }
    })
  logInSection.style.display = "flex"
  divFormData.style.display = "none"
  productForm.style.display = "none"
}