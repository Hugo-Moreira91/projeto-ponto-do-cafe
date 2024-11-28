const textareaIngredients = document.getElementById('additional-ingredients-container-text');

function showTextarea() {
    textareaIngredients.removeAttribute('hidden');
}

function hideTextarea() {
    textareaIngredients.setAttribute('hidden', true);
}