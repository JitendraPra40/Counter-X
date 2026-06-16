// ===============================
// Counter-X Orders JavaScript
// ===============================

// Load Orders from LocalStorage

let orders = JSON.parse(localStorage.getItem("orders")) || [];

loadOrders();


// ===============================
// Display Orders
// ===============================

function loadOrders() {

    let html = "";

    if (orders.length === 0) {

        html = `
        <tr>
            <td colspan="6">
                No Orders Available
            </td>
        </tr>
        `;

    } else {

        orders.forEach((order, index) => {

            html += `

            <tr>

                <td>${order.orderId || index + 1}</td>

                <td>${order.token || "-"}</td>

                <td>${order.customer || "Customer"}</td>

                <td>₹${order.total || 0}</td>

                <td>${order.status || "Pending"}</td>

                <td>

                    <button onclick="viewOrder(${index})">
                        View
                    </button>

                    <button onclick="deleteOrder(${index})">
                        Delete
                    </button>

                </td>

            </tr>

            `;

        });

    }

    document.getElementById("orderTable").innerHTML = html;

}



// ===============================
// View Order
// ===============================

function viewOrder(index) {

    let order = orders[index];

    alert(

        "Order ID : " + (order.orderId || index + 1) +

        "\nToken : " + (order.token || "-") +

        "\nCustomer : " + (order.customer || "Customer") +

        "\nTotal : ₹" + (order.total || 0) +

        "\nStatus : " + (order.status || "Pending")

    );

}



// ===============================
// Delete Order
// ===============================

function deleteOrder(index) {

    if (confirm("Delete this Order?")) {

        orders.splice(index, 1);

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        loadOrders();

    }

}



// ===============================
// Refresh Orders
// ===============================

function refreshOrders() {

    orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    loadOrders();

    alert("Orders Refreshed");

}