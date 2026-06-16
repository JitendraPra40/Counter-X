// ===============================
// Counter-X Revenue JavaScript
// ===============================

// Load Orders from LocalStorage

let orders = JSON.parse(localStorage.getItem("orders")) || [];

loadRevenue();


// ===============================
// Load Revenue Data
// ===============================

function loadRevenue() {

    let totalOrders = orders.length;

    let totalRevenue = 0;

    let completedOrders = 0;

    let pendingOrders = 0;

    let html = "";

    orders.forEach((order, index) => {

        totalRevenue += Number(order.total || 0);

        if (order.status === "Completed") {
            completedOrders++;
        } else {
            pendingOrders++;
        }

        html += `

        <tr>

            <td>${order.orderId || index + 1}</td>

            <td>${order.token || "-"}</td>

            <td>${order.customer || "Customer"}</td>

            <td>₹${order.total || 0}</td>

            <td>${order.status || "Pending"}</td>

        </tr>

        `;

    });

    let average = 0;

    if (totalOrders > 0) {

        average = totalRevenue / totalOrders;

    }

    document.getElementById("totalOrders").innerHTML =
        totalOrders;

    document.getElementById("totalRevenue").innerHTML =
        "₹" + totalRevenue;

    document.getElementById("completedOrders").innerHTML =
        completedOrders;

    document.getElementById("pendingOrders").innerHTML =
        pendingOrders;

    document.getElementById("averageRevenue").innerHTML =
        "₹" + average.toFixed(2);

    document.getElementById("revenueTable").innerHTML =
        html;

}


// ===============================
// Refresh Revenue
// ===============================

function refreshRevenue() {

    orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    loadRevenue();

    alert("Revenue Updated Successfully");

}


// ===============================
// Print Revenue Report
// ===============================

function printRevenue() {

    window.print();

}