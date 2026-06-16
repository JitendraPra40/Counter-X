// login.js

function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Admin Login
    if (username === "admin" && password === "admin123") {

        localStorage.setItem("userRole", "ADMIN");

        alert("Admin Login Successful");

        window.location.href = "dashboard.html";

        return;
    }

    // Customer Login
    if (username === "customer" && password === "1234") {

        localStorage.setItem("userRole", "CUSTOMER");

        alert("Customer Login Successful");

        window.location.href = "menu.html";

        return;
    }

    alert("Invalid Username or Password");
}


// Logout

function logout() {

    localStorage.clear();

    alert("Logout Successful");

    window.location.href = "index.html";

}