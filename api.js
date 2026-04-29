import BASE_URL from "./config.js";

async function apiRequest(endpoint = "", options = {}) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export function getBooksAPI() {
    return apiRequest("");
}

export function addBookAPI(bookData) {
    return apiRequest("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
}
export function updateBookAPI(id, bookData) {
    return apiRequest(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
    });
}