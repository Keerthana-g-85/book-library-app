import { getBooks } from "./app.js";
import { notify } from "./notification.js"; 

// Get main container from DOM
const container = document.querySelector(".container");

// Center login screen using Bootstrap classes
container.className = "d-flex justify-content-center align-items-center vh-100";

// Create login card
const card = document.createElement("div");
card.className = "card p-4 shadow w-50";
card.style.height = "300px";

// Heading
const heading = document.createElement("h2");
heading.className = "text-center mb-3";
heading.textContent = "Login";

// Username input field
const userName = document.createElement("input");
userName.type = "text";
userName.placeholder = "Username";
userName.className = "form-control mb-3";

// Password input field
const password = document.createElement("input");
password.type = "password";
password.placeholder = "password";
password.className = "form-control mb-3";

// Login button
const button = document.createElement("button");
button.textContent = "Login";
button.className = "btn btn-primary w-100";

// Append elements to card
card.appendChild(heading);
card.appendChild(userName);
card.appendChild(password);
card.appendChild(button);

// Add card to container
container.appendChild(card);

// Handle login click
button.addEventListener("click", () => {

    // Simple login validation (empty check)
    if (userName.value === "" && password.value === "") {

        // Success message
        notify("Login Success");

        // Clear login UI
        container.innerHTML = "";

        // Reset container layout
        container.className = "container mt-5";

        // Load books UI
        getBooks();

    } else {
        // Error message
        notify("Wrong credentials");
    }
});