import {renderBooks} from "./app.js";

export function searchBar(booksData){
    const searchContainer = document.createElement("div");
    searchContainer.className = "mb-4 mt-3";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search by book";
    searchInput.className = "form-control shadow-sm";

    searchInput.oninput = () => {
    const term = searchInput.value.toLowerCase();
    const filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(term)
        );
    renderBooks(filteredBooks)
    };

    searchContainer.appendChild(searchInput);
    return searchContainer;

}