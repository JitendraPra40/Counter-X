// ===============================
// Counter-X Payment JavaScript
// ===============================

// Load Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
let html = "";

// Display Items

cart.forEach(item => {

    html += `
    <p>
        ${item.name}
        - ₹${item.price}
    </p>
    `;

    total += Number(item.price);

});

document.getElementById("paymentItems").innerHTML = html;

document.getElementById("totalAmount").innerHTML = total;


// ===============================
// Payment Success
// ===============================

function paymentSuccess() {

    if(cart.length==0){

        alert("Cart is Empty");

        return;

    }

    // Generate Transaction ID

    let txn =
    "TXN" +
    Math.floor(
    Math.random()*1000000000
    );

    // Save Data

    localStorage.setItem(
        "transactionId",
        txn
    );

    localStorage.setItem(
        "totalAmount",
        total
    );

    localStorage.setItem(
        "paymentStatus",
        "SUCCESS"
    );

    alert("Payment Successful");

    // Redirect

    window.location.href="bill.html";

}



// ===============================
// Cancel Payment
// ===============================

function cancelPayment(){

    if(confirm("Cancel Payment?")){

        window.location.href="cart.html";

    }

}