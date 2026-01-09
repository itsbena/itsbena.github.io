// =========================
// Gestione Dark Mode
// =========================

// Applica il tema salvato o dark di default al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");
  let savedTheme = localStorage.getItem("theme");

  // Se non c'è tema salvato, default è "dark"
  if (!savedTheme) {
    savedTheme = "dark";
    localStorage.setItem("theme", "dark");
  }

  if (savedTheme === "dark") {
    enableDarkMode(body, icon);
  } else {
    disableDarkMode(body, icon);
  }
});

// Funzione toggle dark mode
function darkmode() {
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");

  if (body.classList.contains("dark-mode")) {
    disableDarkMode(body, icon);
    localStorage.setItem("theme", "light");
  } else {
    enableDarkMode(body, icon);
    localStorage.setItem("theme", "dark");
  }
}

// =========================
// Funzioni di supporto
// =========================
function enableDarkMode(body, icon) {
  body.classList.add("dark-mode");
  if (icon) {
    icon.innerHTML = "🌙";
    icon.style.color = "#ffffff";
  }
  setTimeout(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.classList.add("dark-mode");
  }, 10);
}

function disableDarkMode(body, icon) {
  body.classList.remove("dark-mode");
  if (icon) {
    icon.innerHTML = "☀️";
    icon.style.color = "#000000";
  }
  setTimeout(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.classList.remove("dark-mode");
  }, 10);
}