import { renderBooks } from './app.js';

// Creates a search bar component for filtering books
export function searchBar(booksData) {

    // Container for search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mb-4 mt-3';

    // Search input field
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search by book';
    searchInput.className = 'form-control shadow-sm';

    // Event triggered on every input change
    searchInput.oninput = () => {

        // Get search term in lowercase for case-insensitive match
        const term = searchInput.value.toLowerCase();

        // Filter books based on title match
        const filteredBooks = booksData.filter(book => 
            book.title.toLowerCase().includes(term)
        );

        // Re-render filtered books
        renderBooks(filteredBooks);
    };

    // Add input to container
    searchContainer.appendChild(searchInput);

    return searchContainer;
}