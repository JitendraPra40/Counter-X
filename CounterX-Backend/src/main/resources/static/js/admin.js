// ===============================
// Counter-X Kitchen JavaScript
// ===============================

// Sample Orders

let orders = JSON.parse(localStorage.getItem("orders")) || [

{
    token:101,
    items:"Burger, Coke",
    status:"Pending"
},

{
    token:102,
    items:"Pizza",
    status:"Pending"
},

{
    token:103,
    items:"Dosa, Coffee",
    status:"Pending"
}

];

displayOrders();


// ===============================
// Display Orders
// ===============================

function displayOrders(){

let html="";

orders.forEach((order,index)=>{

html += `

<tr>

<td>${order.token}</td>

<td>${order.items}</td>

<td>${order.status}</td>

<td>

<button onclick="nextStatus(${index})">

Next Status

</button>

<button onclick="deleteOrder(${index})">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById("kitchenTable").innerHTML = html;

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

}



// ===============================
// Change Status
// Pending -> Preparing -> Ready -> Completed
// ===============================

function nextStatus(index){

if(orders[index].status=="Pending"){

orders[index].status="Preparing";

}

else if(orders[index].status=="Preparing"){

orders[index].status="Ready";

}

else if(orders[index].status=="Ready"){

orders[index].status="Completed";

}

displayOrders();

}



// ===============================
// Delete Completed Order
// ===============================

function deleteOrder(index){

if(orders[index].status!="Completed"){

alert("Complete the order first!");

return;

}

orders.splice(index,1);

displayOrders();

}



// ===============================
// Add New Order
// ===============================

function addOrder(token,items){

orders.push({

token:token,
items:items,
status:"Pending"

});

displayOrders();

}



// ===============================
// Refresh Orders
// ===============================

function refreshOrders(){

displayOrders();

}