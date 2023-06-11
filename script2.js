
let userPass = ""

// Construccion de objetos

class Product {
    constructor(model, color, price, id){
        this.model = model;
        this.color = color;
        this.price = price;
        this.id = id;
    }
}

const product2 = new Product ("Iphone 11", "Negro", 800, 2);
const product1 = new Product ("MacBook Pro", "Blanco", 1000, 1);
const product3 = new Product ("Air Pods 3", "Blanco", 500, 3);
const product4 = new Product("ipad A1432", "Blanco", 900, 4)

// Array contenedor de objetos
const PRODUCTS = [product1, product2, product3, product4]

// class User {
//     constructor(user, password){
//         this.user = user;
//         this.password = password;
//     }
// }

// const USERS = []

let user = "";

let userLS = JSON.parse(localStorage.getItem("userName"));
if (userLS){
    user = userLS
    document.getElementById("welcome").innerHTML += "<h2>Bienvenidx " + user +"</h2>"
}else{
    user = logInUser()
}

function logInUser(){

    const showBtn = document.querySelector("#btnLogIn")
    showBtn.onclick = () => {
        document.getElementById("showBtn").style.display = "block";
    }
    
    const formLogIn = document.querySelector("#formLogIn") 
    
    formLogIn.onsubmit = (e) => {
        e.preventDefault()
        let dataUser = e.target
        userName = dataUser.querySelector("#userName").value
        // let userCoinsidence = USERS.find(e => e.userName == userName)
        // if(userCoinsidence !== undefined){
            // }          
        userPass = dataUser.querySelector("#userPassword").value
        localStorage.setItem("userName", userName)
        document.getElementById("welcome").innerHTML += "<h2>Bienvenidx " + userName +"</h2>"
    }
    let showPass = document.getElementById("showPass")
    function showPassword(){
        let userPassw = document.getElementById("userPassword")
        if (userPassw.type == "password"){
            userPassw.type = "text";
        }else{
            userPassw.type = "password"
        }
    }
    showPass.onclick = () => {showPassword()}
}

// ejemplos almacenar contenido del array en el ls

// localStorage.setItem("Productos", PRODUCTS)
// localStorage.setItem("Productos", JSON.stringify(PRODUCTS))
// PRODUCTS.forEach(product => {
//     if(product.color == "Blanco"){ unicamente agregamos al ls los objetos producto que sean blancos
//         localStorage.setItem(product.color, JSON.stringify(product))
//     }
// })


// let userLS = JSON.parse(localStorage.getItem("userName"));
// let user = "";

// if (userLS){
    // si ingresa por aca es porque userLS no le devolvio null
//     user = userLS
// }else{
//     user = loginUser()
// }

