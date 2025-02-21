function darkmode() {
  var body = document.body;
  var icon = document.getElementById("darkModeIcon");

  body.classList.toggle("dark-mode");

  // Forza il ricalcolo dello stile
  setTimeout(() => {
    document.querySelector(".navbar").classList.toggle("dark-mode");
    document.querySelector(".sidebar").classList.toggle("dark-mode");
  }, 10);

  // Cambia l'icona in base alla modalità
  if (body.classList.contains("dark-mode")) {
      icon.innerHTML = "🌙";  // Luna
      icon.style.color = "#ffffff";  // Icona bianca
  } else {
      icon.innerHTML = "☀️";  // Sole
      icon.style.color = "#000000";  // Icona nera
  }
}
