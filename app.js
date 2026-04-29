import { getBooksAPI } from "./api.js";
import {searchBar} from "./search.js"
import { createAddBookForm } from "./add.js";
import { createUpdateForm } from "./update.js";
import { confirmDelete } from "./delete.js";

const container = document.querySelector(".container");
let booksData = [];

export async function getBooks() {
    try {
        booksData = await getBooksAPI();

        container.innerHTML = "";

        const searchInput = searchBar(booksData);
        container.appendChild(searchInput);

        const addBtn = document.createElement("button");
        addBtn.className = "btn btn-success mb-3 w-100";
        addBtn.textContent = "+ Add New Book";
        container.appendChild(addBtn);

        const formContainer = document.createElement("div");
        formContainer.id = "form-area";
        container.appendChild(formContainer);

        addBtn.onclick = () => {
            if (formContainer.innerHTML === "") {
                const form = createAddBookForm(booksData);
                formContainer.appendChild(form);
            }
        };

        const bookListContainer = document.createElement("div");
        bookListContainer.id = "book-list-container"; 
        container.appendChild(bookListContainer);

        renderBooks(booksData);
    } catch (err) {
        console.error("API FAILED:", err);
    }
}

export function renderBooks(books) {

    const bookListContainer = document.getElementById("book-list-container");
    if (!bookListContainer) return; 
    
    bookListContainer.innerHTML = "";

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
                            <button class="btn btn-outline-danger btn-sm flex-fill delete-btn">Delete</button>
                            <button class="btn btn-primary btn-sm flex-fill update-btn ">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const updateBtn = col.querySelector(".update-btn");
        
        updateBtn.onclick = () => {
            const modal = createUpdateForm(book, booksData);
            document.body.appendChild(modal); 
        };

        const deleteBtn = col.querySelector(".delete-btn");
        deleteBtn.onclick = () => {
            confirmDelete(book, booksData, renderBooks);
        };
        
        row.appendChild(col);
    });

    bookListContainer.appendChild(row);
}

