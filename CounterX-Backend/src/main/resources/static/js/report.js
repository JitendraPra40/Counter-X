// =====================================
// Counter-X Revenue Dashboard JS
// =====================================

let orders = JSON.parse(localStorage.getItem("orders")) || [];

displayRevenue();

// ==============================
// Display Revenue
// ==============================

function displayRevenue() {

    let totalOrders = orders.length;
    let totalRevenue = 0;
    let completed = 0;
    let pending = 0;

    let table = "";

    orders.forEach((order, index) => {

        totalRevenue += Number(order.total || 0);

        if (order.status === "Completed") {
            completed++;
        } else {
            pending++;
        }

        table += `

        <tr>

            <td>${order.orderId || index + 1}</td>

            <td>${order.token || "-"}</td>

            <td>${order.customer || "Customer"}</td>

            <td>₹${order.total || 0}</td>

            <td>${order.status || "Pending"}</td>

        </tr>

        `;

    });

    let averageRevenue = 0;

    if (totalOrders > 0) {

        averageRevenue = totalRevenue / totalOrders;

    }

    document.getElementById("totalOrders").innerHTML =
        totalOrders;

    document.getElementById("totalRevenue").innerHTML =
        "₹" + totalRevenue;

    document.getElementById("completedOrders").innerHTML =
        completed;

    document.getElementById("pendingOrders").innerHTML =
        pending;

    document.getElementById("averageRevenue").innerHTML =
        "₹" + averageRevenue.toFixed(2);

    document.getElementById("revenueTable").innerHTML =
        table;

}

// ==============================
// Refresh Revenue
// ==============================

function refreshRevenue() {

    orders = JSON.parse(localStorage.getItem("orders")) || [];

    displayRevenue();

    alert("Revenue Refreshed Successfully");

}

// ==============================
// Print Report
// ==============================

function printRevenue() {

    window.print();

}

// ==============================
// Download Report
// ==============================

function downloadRevenue() {

    let content =
        "Total Orders : " + document.getElementById("totalOrders").innerText +
        "\nTotal Revenue : " + document.getElementById("totalRevenue").innerText +
        "\nCompleted Orders : " + document.getElementById("completedOrders").innerText +
        "\nPending Orders : " + document.getElementById("pendingOrders").innerText +
        "\nAverage Revenue : " + document.getElementById("averageRevenue").innerText;

    let blob = new Blob([content], {
        type: "text/plain"
    });

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "RevenueReport.txt";

    a.click();

}
