import BASE_URL from "./config.js";

// Generic reusable function to make API requests
// Handles GET, POST, PUT, DELETE in one place
async function apiRequest(endpoint = "", options = {}) {
    try {
        // Make API call using fetch
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert response into JSON format
        return await response.json();

    } catch (error) {
        // Log any API-related errors
        console.error("API Error:", error);

        // Pass error back to calling function
        throw error;
    }
}

// GET: Fetch all books from API
export function getBooksAPI() {
    return apiRequest("");
}

// POST: Add a new book to API
export function addBookAPI(bookData) {
    return apiRequest("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
}

// PUT: Update an existing book by ID
export function updateBookAPI(id, bookData) {
    return apiRequest(`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    });
}

// DELETE: Remove a book by ID
export function deleteBookAPI(id) {
    return apiRequest(`/${id}`, {
        method: "DELETE",
    });
}