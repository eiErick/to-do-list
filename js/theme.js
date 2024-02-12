const html = document.documentElement;

loadTheme();
loadThemeColor();

function loadTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) html.classList.toggle('light');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) html.classList.toggle('dark');
}

function loadThemeColor() {
    const savedThemesColors = localStorage.getItem("theme-color");
    savedThemesColors ? html.classList.add(savedThemesColors) : html.classList.add("color-blue");
}
