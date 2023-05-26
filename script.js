// Pagina que vende productos de electronica
// arrayProductos
// Elegir productos a comprar (most)
// sumar precio productos

// Variables
let totalPrice = 0;
let buys = [];
let user = "";

// Construccion de objetos

class Product {
    constructor(model, color, price, id){
        this.model = model;
        this.color = color;
        this.price = price;
        this.id = id;
    }
}

const product1 = new Product ("MacBook Pro", "Blanco", 1000, 1);
const product2 = new Product ("Iphone 11", "Negro", 800, 2);
const product3 = new Product ("Air Pods 3", "Blanco", 500, 3);
const product4 = new Product("ipad A1432", "Blanco", 900, 4)

// Array contenedor de objetos
const PRODUCTS = [product1, product2, product3, product4]


// Inicio del programa. Se pide ingresar nombre del usuario y producto a elegir.

function start(){
    let user = prompt("Ingresa tu nombre");
    this.user = user;
    return printProducts(`Bienvenidx  ${user} \n Elegí los productos que deseas comprar marcando 1, 2, etc. (0 para finalizar) \n`)
}

function printProducts(message){
    let products = message;
    PRODUCTS.forEach(i => {
        products += `${i.id}. Model: ${i.model} - Color: ${i.color} - Price: ${i.price}\n`
    })
    return products;
}

function selection(message){
    let selected = parseInt(prompt(message)); 
    selected = validateOpction(selected, message);
    return PRODUCTS.find(i => i.id === selected)
}

// Funcion para cantidad de productos
function amount(product){
    let amount = parseInt(prompt("Cuanta cantidad desea llevar?"));
    buys.push(`${amount} ${product.model} del color ${product.color} \n`)
    return amount;
}

// Funcion para agregar un producto al carro
function addProduct(product, amount){;
    let amountProducts = amount;
    while (amountProducts === 0){
        alert("numero no válido, vuelva a ingresar")
        amountProducts = amount(product)
    }
    if (amountProducts === 1) {
        alert(`Se agrego ${product.model} a tu compra`);
        totalPrice += product.price;
    } else {
        alert(`Se agregaron ${amountProducts} ${product.model} a tu compra`);
        totalPrice += (product.price * amountProducts)
    } 
}

// Funcion para preguntar si se quieren agregar mas productos
function moreProducts(){
    let moreItems = (prompt(`${user} deseas agregar otro producto? \n A. SI \n B. NO`)).toLowerCase();
    let productSelected = 0;
    while(moreItems != "a" && moreItems != "b"){
        alert("Ingrese una letra válida");
        moreItems = (prompt(`${user} deseas agregar otro producto? \n A. SI \n B. NO`)).toLowerCase();
    }
    if (moreItems == "a"){
        let message = printProducts(`Elegí los productos que deseas comprar marcando 1, 2, etc. (0 para finalizar) \n`);
        productSelected = selection(message)  
    } 
    return productSelected;
    
}

// Funcion para finalizar la compra
function endOfShopp(){
    if (totalPrice == 0){
        alert(`${this.user} lamentamos que no hayas comprado ningun producto, esperamos que vuelvas proximamente.`)
    } else {
        alert(`${this.user} tu compra es de \n${buys}Precio total: ${totalPrice}`);
        let dosCuo = Math.ceil(totalPrice / 2);
        let tresCuo = Math.ceil(totalPrice / 3);   
        let pago = parseInt(prompt(`¿Como desea pagar? Se puede pagar hasta 3 cuotas sin interes \n 1. Una couta de ${totalPrice} \n 2. Dos cuotas de ${dosCuo} \n 3. Tres cuotas de ${tresCuo} `))
        while (pago != 1 && pago != 2 && pago != 3){
            alert("Numero invalido, vuelva a ingresar")
            pago = parseInt(prompt(`¿Como desea pagar? Se puede pagar hasta 3 cuotas sin interes \n 1. Una couta de ${totalPrice} \n 2. Dos cuotas de ${dosCuo} \n 3. Tres cuotas de ${tresCuo} `))
        }
    }
    alert(`Gracias por confiar en nosotros, esperamos que disfrutes tu nueva compra`);

}

// Funcion para validar opciones
function validateOpction(number, message){
    while(isNaN(number)){
        alert("Ingresa un valor valido o 0 para finalizar la compra");
        number = prompt(message);
    }
    return number;
}


const startBuy = start();
let productSelected = selection(startBuy);
while (productSelected != 0) {
    let amountProducts = amount(productSelected);
    addProduct(productSelected, amountProducts)
    productSelected = moreProducts();
}


// Fin de la compra
endOfShopp();


