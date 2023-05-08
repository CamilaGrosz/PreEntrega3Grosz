// Pagina que vende electronicos

// -stock de productos a la venta(productos)
//  *Variable --> Contiene el stock
// -eleccion del usuario(carrito)
//      *Variables --> Items que eligio el user // Precio de los items
//-Info a mostrar: Stock, carrito, precioCart (alerts)
// -Info a recibir: eleccion del cliente (prompts)


let stock = "1. Computadora Mac $1000USD \n 2. Iphone 11 $800USD \n 3. Ipods $500USD \n 4. IPad $900USD \n 0. Finalizar"
let itemsSelected = "";
let totalPrice = 0;
let user = prompt("Ingresa tu nombre");
let selected = parseInt(prompt(`Bienvenidx  ${user} \n Elegí los productos que deseas comprar marcando 1, 2, etc. (0 para finalizar) \n ${stock}`));


function addProduct(product, price){
    itemsSelected +=`${product} x1 \n`;
    totalPrice += price;
    alert(`Se agrego ${product} a tu compra`);
}

function moreProducts(){
    let moreItems = (prompt(`${user} deseas agregar otro producto? \n A. SI \n B. NO`)).toLowerCase();
    while(moreItems != "a" && moreItems != "b"){
        alert("Ingrese una letra válida");
        moreItems = (prompt(`${user} deseas agregar otro producto? \n A. SI \n B. NO`)).toLowerCase();
    }
    if (moreItems == "a"){
        selected = parseInt(prompt(`Elegí los productos que deseas comprar marcando 1, 2, etc. (0 para finalizar) \n ${stock}`));
    } else {
        selected = 0;
    }
}

function endOfShopp(){
    if (totalPrice == 0){
        alert(`${user} lamentamos que no hayas comprado ningun producto, esperamos que vuelvas proximamente.`)
    } else {
        alert(`${user} tu compra es de ${itemsSelected} por un precio total de ${totalPrice}`);
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
}


while (selected != 0){
    switch(selected){
        case 1:
            addProduct("Computadora Mac", 1000);
            break;
        case 2:
            addProduct("Iphone 11", 800);
            break; 
        case 3:
            addProduct("Ipods", 500)
            break;
        case 4:
            addProduct("Ipad", 900)
            break;
        default:
            alert("Ingresa un valor valido o 0 para finalizar la compra")      
    }
    moreProducts();
}
endOfShopp();


