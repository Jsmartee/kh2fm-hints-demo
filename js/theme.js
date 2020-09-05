function toggleTheme(elem) {
    var theme = elem.checked ? "dark" : null;
    document.documentElement.setAttribute("theme", theme);
    localStorage.theme = theme;
}

var themeInput = document.getElementById("theme");
if (localStorage.theme === "dark")
    themeInput.checked = true;

toggleTheme(themeInput);
