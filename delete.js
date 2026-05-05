import { deleteBookAPI } from './api.js';
import { notify } from './notification.js'; 

// Function to show delete confirmation modal
export function confirmDelete(book, booksData, onSuccess) {

    // Create full-screen overlay for modal
    const modalOverlay = document.createElement('div');

    // Apply overlay styling (dark background + center alignment)
    Object.assign(modalOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '3000',
        backdropFilter: 'blur(4px)'
    });

    // Modal HTML structure
    modalOverlay.innerHTML = `
        <div class="card p-4 shadow-lg text-center" style="width: 350px; border-radius: 15px;">
            <div class="text-danger mb-3">
                <i class="bi bi-trash-fill" style="font-size: 2.5rem;"></i>
            </div>
            <h5>Delete Book?</h5>
            <p class="text-muted small">
                Are you sure you want to delete <br>
                <strong>"${book.title}"</strong>?
            </p>
            <div id="modalSpinner" class="spinner-border text-danger d-none mb-3"></div>
            <div class="d-flex gap-2">
                <button id="cancelDel" class="btn btn-light border flex-fill">Cancel</button>
                <button id="confirmDel" class="btn btn-danger flex-fill">Delete</button>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.appendChild(modalOverlay);

    // Close modal on cancel
    modalOverlay.querySelector('#cancelDel').onclick = () => modalOverlay.remove();

    // Handle delete confirmation
    modalOverlay.querySelector('#confirmDel').onclick = async () => {

        const confirmBtn = modalOverlay.querySelector('#confirmDel');
        const spinner = modalOverlay.querySelector('#modalSpinner');

        // Disable button and show loading spinner
        confirmBtn.disabled = true;
        spinner.classList.remove('d-none');

        try {
            // Call API to delete book
            await deleteBookAPI(book.id);

            // Remove book from local array
            const index = booksData.findIndex(b => b.id === book.id);
            if (index !== -1) {booksData.splice(index, 1);}

            // Close modal
            modalOverlay.remove();

            // Refresh UI
            if (onSuccess) {onSuccess(booksData);}

            notify('Book deleted successfully!');

        } catch (error) {
            // Show error notification
            console.log(error);
            notify('Delete failed!');

            // Reset UI state
            confirmBtn.disabled = false;
            spinner.classList.add('d-none');
        }
    };
}