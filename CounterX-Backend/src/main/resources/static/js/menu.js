// ===============================
// Counter-X Menu JavaScript
// ===============================

let menu = JSON.parse(localStorage.getItem("menu")) || [

{
    id:1,
    name:"Burger",
    price:120,
    image:"https://via.placeholder.com/200"
},

{
    id:2,
    name:"Pizza",
    price:250,
    image:"https://via.placeholder.com/200"
},

{
    id:3,
    name:"Dosa",
    price:80,
    image:"https://via.placeholder.com/200"
},

{
    id:4,
    name:"Idli",
    price:50,
    image:"https://via.placeholder.com/200"
},

{
    id:5,
    name:"Fried Rice",
    price:150,
    image:"https://via.placeholder.com/200"
}

];

displayMenu();

updateCartCount();


// ===============================
// Display Menu
// ===============================

function displayMenu(){

let html="";

menu.forEach(food=>{

html += `

<div class="card">

<img src="${food.image}" width="200" height="150">

<h2>${food.name}</h2>

<h3>₹${food.price}</h3>

<button onclick="addToCart(${food.id})">

Add To Cart

</button>

</div>

`;

});

document.getElementById("menuList").innerHTML=html;

}



// ===============================
// Add To Cart
// ===============================

function addToCart(id){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let food =
menu.find(item=>item.id==id);

cart.push(food);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert(food.name+" Added To Cart");

}



// ===============================
// Update Cart Count
// ===============================

function updateCartCount(){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cartCount").innerHTML =
cart.length;

}



// ===============================
// View Cart
// ===============================

function goCart(){

window.location.href="cart.html";

}



// ===============================
// Load Menu From Spring Boot API
// ===============================

/*

fetch("http://localhost:8080/api/menu")

.then(response=>response.json())

.then(data=>{

menu=data;

displayMenu();

});

*/