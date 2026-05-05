// Global notification function used across the app
export function notify(message) {
    const note = document.createElement('div');
    note.textContent = message;

    note.style.position = 'fixed';
    note.style.top = '20px';
    note.style.right = '20px';
    note.style.left = '50%';
    note.style.transform = 'translateX(-50%)';
    note.style.backgroundColor = 'black';
    note.style.color = 'white';
    note.style.padding = '10px';
    note.style.borderRadius = '5px';
    note.style.zIndex = '9999';

    document.body.appendChild(note);

    setTimeout(() => note.remove(), 2000);
}