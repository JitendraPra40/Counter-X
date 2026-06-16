// ===========================
// Counter-X Cart JavaScript
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

displayCart();

// Display Cart Items
function displayCart() {

    let table = "";
    let total = 0;

    cart.forEach((item, index) => {

        table += `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button onclick="deleteItem(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;

        total += Number(item.price);

    });

    document.getElementById("cartTable").innerHTML = table;
    document.getElementById("totalAmount").innerHTML = total;

}

// Delete Item
function deleteItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}

// Clear Cart
function clearCart() {

    if (confirm("Clear all cart items?")) {

        cart = [];

        localStorage.removeItem("cart");

        displayCart();

    }

}

// Place Order
function placeOrder() {

    if (cart.length == 0) {

        alert("Cart is Empty!");

        return;

    }

    localStorage.setItem(
        "orderItems",
        JSON.stringify(cart)
    );

    window.location.href = "payment.html";

}