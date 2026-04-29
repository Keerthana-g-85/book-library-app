import { renderBooks } from "./app.js";
import { addBookAPI } from "./api.js"; 

export function createAddBookForm(booksData) {
    const formContainer = document.createElement("div");
    formContainer.className = "card p-4 mb-4 shadow-sm border-primary";

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

    const addBtn = formContainer.querySelector("#addBtn");
    const cancelBtn = formContainer.querySelector("#cancelBtn");
    const spinner = formContainer.querySelector("#spinner");

    cancelBtn.onclick = () => formContainer.remove();

    addBtn.onclick = async () => {
        const title = formContainer.querySelector("#titleInput").value.trim();
        const author = formContainer.querySelector("#authorInput").value.trim();
        const genre = formContainer.querySelector("#genreInput").value.trim();
        const year = formContainer.querySelector("#yearInput").value.trim();

        if (!title || !author) {
            alert("Fields cannot be empty!");
            return;
        }
        const isDuplicate = booksData.some(book => 
            book.title.toLowerCase() === title.toLowerCase()
        );

        if (isDuplicate) {
            alert("This book already exists in the library!");
            return;
        }

        spinner.classList.remove("d-none");
        addBtn.disabled = true;

        try {
            const newBook = { title, author, genre, year };
            const savedBook = await addBookAPI(newBook);

            booksData.push(savedBook);
            renderBooks(booksData);

            formContainer.remove();
            alert("Book added successfully!");
        } catch (error) {
            alert("Failed to add book.");
            console.error(error);
        } finally {
            spinner.classList.add("d-none");
            addBtn.disabled = false;
        }
    };

    return formContainer;
}