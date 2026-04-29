import { getBooksAPI } from "./api.js";

const container = document.querySelector(".container");
let booksData = [];

export async function getBooks() {
    try {
        booksData = await getBooksAPI();
        renderBooks(booksData);
    } catch (err) {
        console.error("API FAILED:", err);
    }
}

function renderBooks(books) {
    container.innerHTML = ""; 

    const header = document.createElement("h2");
    header.className = "text-center my-4 w-100";
    header.textContent = "Library Book";
    container.appendChild(header);

    const row = document.createElement("div");
    row.className = "row g-4"; 

    books.forEach(book => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4"; 

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 bg-light">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary">${book.title || "Untitled"}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by ${book.author || "Unknown"}</h6>
                    
                    <div class="mt-auto">
                        <hr>
                        <p class="card-text small">
                            <strong>Genre:</strong> ${book.genre || "N/A"}<br>
                            <strong>Year:</strong> ${book.year || "N/A"}
                        </p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-danger btn-sm flex-fill">Delete</button>
                            <button class="btn btn-primary btn-sm flex-fill">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    container.appendChild(row);
}

