// Funzione per creare una card HTML
function creaCard(rivoluzione, index) {
    return `
    <div class="col">
        <a href="#" class="text-decoration-none" data-index="${index}">
            <div class="card h-100 bg-dark text-light">
                <img src="${rivoluzione.foto}" class="card-img-top card-img-uniform" alt="${rivoluzione.titolo}">
                <div class="card-body">
                    <h5 class="card-title text-center">${rivoluzione.titolo}</h5>
                    <p class="description">${rivoluzione.descrizione}</p>
                    <p class="subtitle-nocaps">${rivoluzione.periodo}</p>
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

        // Salviamo il JSON in memoria per accedere facilmente al contenuto
        window.rivoluzioni = data;

        data.forEach((rivoluzione, index) => {
            container.innerHTML += creaCard(rivoluzione, index);
        });

        // Aggiunge evento click alle card
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const index = this.getAttribute('data-index');
                const riv = window.rivoluzioni[index];
                mostraContenuto(riv.titolo, riv.contenuto);
            });
        });
    })
    .catch(err => console.error(err));

// Funzione che mostra il contenuto completo della rivoluzione nel modal
function mostraContenuto(titolo, contenutoArray) {
    const modalBody = document.getElementById('modal-body');

    // Trasforma l'array di paragrafi in <p> HTML
    modalBody.innerHTML = contenutoArray.map(paragrafo => `${paragrafo}`).join('');

    const modalTitle = document.querySelector('#contenutoModal .modal-title');
    modalTitle.textContent = titolo;

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