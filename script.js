const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const menuList = document.getElementById("menuList");
const homeCards = document.getElementById("homeCards");
const content = document.getElementById("content");
const hero = document.querySelector(".hero");

let menuOpen = false;

// Toggle menu
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

function toggleMenu() {
  sideMenu.style.right = menuOpen ? "-260px" : "0";
  menuOpen = !menuOpen;
  menuBtn.classList.toggle("open");
}

// Click fuori → chiude menu
document.addEventListener("click", (e) => {
  if (menuOpen && !sideMenu.contains(e.target) && e.target !== menuBtn) {
    sideMenu.style.right = "-260px";
    menuOpen = false;
  }
});

// Carica JSON
fetch("assets/rivoluzioni.json")
  .then(res => res.json())
  .then(data => {
    data.rivoluzioni.forEach(riv => {

      // Menu laterale
      const li = document.createElement("li");
      li.textContent = riv.nome;
      li.onclick = () => showRivoluzione(riv);
      menuList.appendChild(li);

      // Card home
      const card = document.createElement("div");
      card.className = "home-card";
      card.innerHTML = `
       <img src="${riv.immagine}" alt="${riv.nome}">
       <h3>${riv.nome}</h3>
       <p>${riv.descrizione}</p>
      `;
      card.onclick = () => showRivoluzione(riv);
      homeCards.appendChild(card);
    });
  });

function showRivoluzione(riv) {
  hero.style.display = "none";
  homeCards.style.display = "none";
  content.classList.remove("hidden");

  content.innerHTML = `
    <h2>${riv.nome}</h2>
    <p>${riv.descrizione}</p>
    <div class="cards">
      ${riv.fasi.map(fase => `
        <div class="card">
          <h3>${fase.titolo}</h3>
          <p><strong>${fase.periodo}</strong></p>
          <p>${fase.descrizione}</p>
        </div>
      `).join("")}
    </div>
  `;

  sideMenu.style.right = "-260px";
  menuOpen = false;
}
