import { renderBooks } from "./app.js";
import { updateBookAPI } from "./api.js";

export function createUpdateForm(book, booksData) {
  const modalOverlay = document.createElement("div");

  Object.assign(modalOverlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2000"
  });

  modalOverlay.innerHTML = `
    <div class="card shadow-lg border-0" style="width: 450px; border-radius: 15px; overflow: hidden;">
      <div class="card-header bg-primary text-white p-3">
        <h5 class="mb-0">Edit Book Details</h5>
      </div>
      <div class="card-body p-4 bg-white">
        <div class="mb-3">
          <label class="form-label small fw-bold">Title</label>
          <input type="text" id="upTitle" class="form-control" value="${book.title}">
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Author</label>
          <input type="text" id="upAuthor" class="form-control" value="${book.author}">
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <label class="form-label small fw-bold">Genre</label>
            <input type="text" id="upGenre" class="form-control" value="${book.genre || ""}">
          </div>
          <div class="col-6 mb-3">
            <label class="form-label small fw-bold">Year</label>
            <input type="text" id="upYear" class="form-control" value="${book.year || ""}">
          </div>
        </div>
        <div id="upSpinner" class="spinner-border text-primary d-none mb-2" role="status"></div>
        <div class="d-flex gap-2 mt-2">
          <button id="cancelBtn" class="btn btn-light border flex-fill">Cancel</button>
          <button id="saveBtn" class="btn btn-primary flex-fill">Save Changes</button>
        </div>
      </div>
    </div>
  `;

  const saveBtn = modalOverlay.querySelector("#saveBtn");
  const cancelBtn = modalOverlay.querySelector("#cancelBtn");
  const spinner = modalOverlay.querySelector("#upSpinner");

  const closeMenu = () => modalOverlay.remove();

  cancelBtn.onclick = closeMenu;

  saveBtn.onclick = async () => {
    const title = modalOverlay.querySelector("#upTitle").value.trim();
    const author = modalOverlay.querySelector("#upAuthor").value.trim();
    const genre = modalOverlay.querySelector("#upGenre").value.trim();
    const year = modalOverlay.querySelector("#upYear").value.trim();

    if (!title || !author) {
      alert("Title and Author cannot be empty!");
      return;
    }

    const isIdenticalToSelf =
      title === book.title &&
      author === book.author &&
      genre === (book.genre || "") &&
      year === (book.year || "");

    if (isIdenticalToSelf) {
      alert("No changes detected!");
      return;
    }

    const isDuplicateOfOther = booksData.some(b =>
      b.id !== book.id &&
      b.title.toLowerCase() === title.toLowerCase() &&
      b.author.toLowerCase() === author.toLowerCase() &&
      (b.genre || "").toLowerCase() === genre.toLowerCase() &&
      (b.year || "").toString() === year.toString()
    );

    if (isDuplicateOfOther) {
      alert("Error: This exact book entry already exists in the library!");
      return;
    }

    spinner.classList.remove("d-none");
    saveBtn.disabled = true;

    try {
      const updatedBook = { ...book, title, author, genre, year };
      await updateBookAPI(book.id, updatedBook);

      const index = booksData.findIndex(b => b.id === book.id);
      if (index !== -1) {
        booksData[index] = updatedBook;
      }

      renderBooks(booksData);
      closeMenu();
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update database.");
    } finally {
      spinner.classList.add("d-none");
      saveBtn.disabled = false;
    }
  };

  return modalOverlay;
}