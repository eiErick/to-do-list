const html = document.documentElement;

function loadTheme() {
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) html.classList.toggle("light");
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) html.classList.toggle("dark");
}

function loadThemeColor() {
	const savedThemesColors = localStorage.getItem("theme-color");
	if (savedThemesColors) {
		html.classList.add(savedThemesColors);
	} else {
		html.classList.add("color-blue");
	}
}

loadTheme();
loadThemeColor();
