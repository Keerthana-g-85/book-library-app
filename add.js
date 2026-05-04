import { renderBooks } from "./app.js";
import { addBookAPI } from "./api.js";
import { notify } from "./notification.js"; 

// Function to create Add Book form UI
export function createAddBookForm(booksData) {

    // Create main form container
    const formContainer = document.createElement("div");
    formContainer.className = "card p-4 mb-4 shadow-sm border-primary";

    // Form structure (inputs + buttons)
    formContainer.innerHTML = `
        <h4>Add New Book</h4>
        <input type="text" id="titleInput" class="form-control mb-2" placeholder="Book Title">
        <input type="text" id="authorInput" class="form-control mb-2" placeholder="Author">
        <input type="text" id="genreInput" class="form-control mb-2" placeholder="Genre">
        <input type="text" id="yearInput" class="form-control mb-2" placeholder="Year">
        <div id="spinner" class="spinner-border text-primary d-none mb-2" role="status"></div>
        <div class="d-flex gap-2">
            <button id="addBtn" class="btn btn-success flex-fill">Add Book</button>
            <button id="cancelBtn" class="btn btn-secondary flex-fill">Cancel</button>
        </div>
    `;

    // Get elements from DOM
    const addBtn = formContainer.querySelector("#addBtn");
    const cancelBtn = formContainer.querySelector("#cancelBtn");
    const spinner = formContainer.querySelector("#spinner");

    // Remove form when cancel button is clicked
    cancelBtn.onclick = () => formContainer.remove();

    // Handle Add Book button click
    addBtn.onclick = async () => {

        // Get input values and remove extra spaces
        const title = formContainer.querySelector("#titleInput").value.trim();
        const author = formContainer.querySelector("#authorInput").value.trim();
        const genre = formContainer.querySelector("#genreInput").value.trim();
        const year = formContainer.querySelector("#yearInput").value.trim();

        // Validation: required fields check
        if (!title || !author) {
            notify("Fields cannot be empty!");
            return;
        }

        // Check for duplicate book (based on title)
        const isDuplicate = booksData.some(book => 
            book.title.toLowerCase() === title.toLowerCase()
        );

        if (isDuplicate) {
            notify("This book already exists in the library!");
            return;
        }

        // Show loading spinner and disable button
        spinner.classList.remove("d-none");
        addBtn.disabled = true;

        try {
            const newBook = { title, author, genre, year };

            // API call to add book
            const savedBook = await addBookAPI(newBook);

            // Update local data and UI
            booksData.push(savedBook);
            renderBooks(booksData);

            // Remove form after success
            formContainer.remove();

            notify("Book added successfully!");
        } catch (error) {
            notify("Failed to add book.");
            console.error(error);
        } finally {
            // Reset loading state
            spinner.classList.add("d-none");
            addBtn.disabled = false;
        }
    };

    return formContainer;
}