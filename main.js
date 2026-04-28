const container = document.querySelector(".container");
container.className = "d-flex justify-content-center align-items-center vh-100";

const card = document.createElement("div");
card.className = "card p-4 shadow w-50";
card.style.height="300px";

const heading = document.createElement("h2");
heading.className = "text-center mb-3"
heading.textContent = "Login"

const userName = document.createElement("input")
userName.type = "text"
userName.placeholder = "Username"
userName.className = "form-control mb-3";

const password = document.createElement("input")
password.type = "password"
password.placeholder = "password"
password.className = "form-control mb-3";

const button = document.createElement("button");
button.textContent = "Login";
button.className = "btn btn-primary w-100"

card.appendChild(heading);
card.appendChild(userName);
card.appendChild(password);
card.appendChild(button);
container.appendChild(card);

button.addEventListener("click", ()=>
{
    if (userName.value === "Keerthana" && password.value==="Book@123")
    {
        alert("Login Success")
    }
    else{
        alert("Wrong credintails")
    }
})