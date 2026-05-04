// Import required functions from other modules
import { getBooksAPI } from "./api.js";
import { searchBar } from "./search.js";
import { createAddBookForm } from "./add.js";
import { createUpdateForm } from "./update.js";
import { confirmDelete } from "./delete.js";

// Main container where everything is rendered
const container = document.querySelector(".container");

// Stores all books fetched from API
let booksData = [];

// Fetch books from API and build UI
export async function getBooks() {
    try {
        // Get books data from backend
        booksData = await getBooksAPI();

        // Clear existing content
        container.innerHTML = "";

        // Add search bar
        const searchInput = searchBar(booksData);
        container.appendChild(searchInput);

        // Add genre filter dropdown
        const genreFilter = createGenreFilter(booksData);
        container.appendChild(genreFilter);

        // Create "Add New Book" button
        const addBtn = document.createElement("button");
        addBtn.className = "btn btn-success mb-3 w-100";
        addBtn.textContent = "+ Add New Book";
        container.appendChild(addBtn);

        // Container where form will appear
        const formContainer = document.createElement("div");
        formContainer.id = "form-area";
        container.appendChild(formContainer);

        // Show form only if not already open
        addBtn.onclick = () => {
            if (formContainer.innerHTML === "") {
                const form = createAddBookForm(booksData);
                formContainer.appendChild(form);
            }
        };

        // Container for book cards
        const bookListContainer = document.createElement("div");
        bookListContainer.id = "book-list-container";
        container.appendChild(bookListContainer);

        // Render all books
        renderBooks(booksData);

    } catch (err) {
        // Log API error
        console.error("API FAILED:", err);
    }
}

// Render books as cards
export function renderBooks(books) {

    const bookListContainer = document.getElementById("book-list-container");

    // Safety check (in case container is missing)
    if (!bookListContainer) return;

    // Clear previous list
    bookListContainer.innerHTML = "";

    // Bootstrap row for grid layout
    const row = document.createElement("div");
    row.className = "row g-4";

    // Loop through each book
    books.forEach(book => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";

        // Book card UI
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

        // Handle update button click
        const updateBtn = col.querySelector(".update-btn");
        updateBtn.onclick = () => {
            const modal = createUpdateForm(book, booksData);
            document.body.appendChild(modal);
        };

        // Handle delete button click
        const deleteBtn = col.querySelector(".delete-btn");
        deleteBtn.onclick = () => {
            confirmDelete(book, booksData, renderBooks);
        };

        // Add card to row
        row.appendChild(col);
    });

    // Add row to container
    bookListContainer.appendChild(row);
}

// Create dropdown filter for genres
function createGenreFilter(books) {

    // Extract unique genres + add default option
    const genres = ["All Genres", ...new Set(books.map(b => b.genre).filter(g => g))];

    const filterContainer = document.createElement("div");
    filterContainer.className = "mb-3";

    // Dropdown UI
    filterContainer.innerHTML = `
        <label class="form-label small fw-bold">Filter by Genre:</label>
        <select id="genreSelect" class="form-select">
            ${genres.map(genre => `<option value="${genre}">${genre}</option>`).join("")}
        </select>
    `;

    const select = filterContainer.querySelector("#genreSelect");

    // Handle filter change
    select.onchange = (e) => {
        const selectedGenre = e.target.value;

        // Show all books
        if (selectedGenre === "All Genres") {
            renderBooks(books);
        } else {
            // Filter books by selected genre
            const filtered = books.filter(b => b.genre === selectedGenre);
            renderBooks(filtered);
        }
    };

    return filterContainer;
}