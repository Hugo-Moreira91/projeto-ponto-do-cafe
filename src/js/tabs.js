const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach(tab => {
    tab.addEventListener('click', changeTabPanel);
});

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const arrow = targetTab.querySelector('.arrow-image');

    toggleContent(targetPanel, arrow);
}

function toggleContent(content, arrow) {
    const recipe = document.querySelector(`#${content}`);
    
    arrow.classList.toggle('open');
    recipe.toggleAttribute('hidden');
}