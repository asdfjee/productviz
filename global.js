document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'is-open' class on the menu to show/hide it
            mainMenu.classList.toggle('is-open');
            // Toggle the 'active' class on the button to animate the icon
            menuToggle.classList.toggle('active');
        });
    }
});
