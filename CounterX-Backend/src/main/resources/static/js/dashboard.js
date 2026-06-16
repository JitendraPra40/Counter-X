// ===============================
// Counter-X Dashboard JavaScript
// ===============================

// Load Orders

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

loadDashboard();


// ===============================
// Dashboard Summary
// ===============================

function loadDashboard(){

let totalOrders = orders.length;

let totalRevenue = 0;

let pendingOrders = 0;

let completedOrders = 0;

orders.forEach(order=>{

totalRevenue += Number(order.total || 0);

if(order.status=="Completed"){

completedOrders++;

}
else{

pendingOrders++;

}

});

document.getElementById("orders").innerHTML =
totalOrders;

document.getElementById("revenue").innerHTML =
"₹"+totalRevenue;

document.getElementById("pending").innerHTML =
pendingOrders;

document.getElementById("completed").innerHTML =
completedOrders;

loadRecentOrders();

}



// ===============================
// Recent Orders Table
// ===============================

function loadRecentOrders(){

let html="";

orders.forEach((order,index)=>{

html += `

<tr>

<td>${order.orderId || index+1}</td>

<td>${order.customer || "Customer"}</td>

<td>₹${order.total || 0}</td>

<td>${order.status || "Pending"}</td>

</tr>

`;

});

document.getElementById("orderTable").innerHTML =
html;

}



// ===============================
// Refresh Dashboard
// ===============================

function refreshDashboard(){

orders =
JSON.parse(localStorage.getItem("orders")) || [];

loadDashboard();

alert("Dashboard Refreshed");

}



// ===============================
// Logout
// ===============================

function logout(){

localStorage.removeItem("role");
localStorage.removeItem("username");

window.location.href="login.html";

}
