// Funzione per creare una card HTML
function creaCard(rivoluzione) {
    return `
    <div class="col">
        <a href="#" class="text-decoration-none" 
           data-titolo="${rivoluzione.titolo}" 
           data-contenuto='${rivoluzione.contenuto}'>
            <div class="card h-100 bg-dark text-light">
                <img src="${rivoluzione.foto}" class="card-img-top card-img-uniform" alt="${rivoluzione.titolo}">
                <div class="card-body">
                    <h5 class="card-title text-center">${rivoluzione.titolo}</h5>
                    <p class="description">${rivoluzione.descrizione}</p>
                </div>
            </div>
        </a>
    </div>
    `;
}

// Carica il JSON e genera le card
fetch('assets/rivoluzioni.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('cards-container');
        data.forEach(rivoluzione => {
            container.innerHTML += creaCard(rivoluzione);
        });

        // Aggiunge evento click alle card
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const contenuto = this.getAttribute('data-contenuto');
                const titolo = this.getAttribute('data-titolo'); // Prende il titolo
                mostraContenuto(titolo, contenuto);
            });
        });
    })
    .catch(err => console.error(err));

// Funzione che mostra il contenuto completo della rivoluzione nel modal
function mostraContenuto(titolo, contenuto) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = contenuto;

    const modalTitle = document.querySelector('#contenutoModal .modal-title');
    modalTitle.textContent = titolo; // Imposta il titolo dinamicamente

    const myModal = new bootstrap.Modal(document.getElementById('contenutoModal'));
    myModal.show();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrato', reg))
      .catch(err => console.log('Service Worker non registrato', err));
  });
}