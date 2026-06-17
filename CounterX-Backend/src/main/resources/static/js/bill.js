// ===============================
// Counter-X Bill JavaScript
// ===============================

// Load Data

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let transactionId =
    localStorage.getItem("transactionId") || "N/A";

let totalAmount =
    localStorage.getItem("totalAmount") || 0;


// Generate Bill Number

let billNumber =
    "BL" + Math.floor(Math.random() * 100000);


// Generate Token Number

let tokenNumber =
    Math.floor(Math.random() * 900) + 100;


// Current Date & Time

let today =
    new Date().toLocaleString();


// Display Bill Details

document.getElementById("billNumber").innerHTML =
    billNumber;

document.getElementById("tokenNumber").innerHTML =
    tokenNumber;

document.getElementById("transactionId").innerHTML =
    transactionId;

document.getElementById("billDate").innerHTML =
    today;

document.getElementById("totalAmount").innerHTML =
    totalAmount;


// Display Food Items

let html = "";

cart.forEach(item => {

    html += `

<tr>

<td>${item.name}</td>

<td>₹${item.price}</td>

</tr>

`;

});

document.getElementById("billItems").innerHTML =
    html;


// Print Bill

function printBill() {

    window.print();

}


// Download Bill

function downloadBill() {

    alert("Bill Downloaded Successfully");

}


// New Order

function newOrder() {

    localStorage.removeItem("cart");
    localStorage.removeItem("transactionId");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("paymentStatus");

    window.location.href = "menu.html";

}