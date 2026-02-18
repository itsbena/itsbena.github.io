// Questa funzione genera dinamicamente il codice HTML per una "card" Bootstrap
// Ogni card rappresenta una rivoluzione, con immagine, titolo, descrizione e periodo.
// `rivoluzione` è un oggetto JSON con i dati, `index` serve per identificarla.
function creaCard(rivoluzione, index) {
    return `
    <div class="col">
        <!-- Il link contiene un attributo data-index utile per sapere quale rivoluzione è stata cliccata -->
        <a href="#" class="text-decoration-none" data-index="${index}">
            <div class="card h-100 bg-dark text-light">
                <!-- Immagine della rivoluzione -->
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

// Carica il file JSON contenente i dati delle rivoluzioni (posizionato in assets/rivoluzioni.json)
fetch('assets/rivoluzioni.json')
    .then(response => response.json()) // Converte la risposta in oggetto JS
    .then(data => {
        const container = document.getElementById('cards-container');

        // Salva i dati globalmente per poterli riutilizzare in altre funzioni
        window.rivoluzioni = data;

        // Genera una card per ogni rivoluzione e la aggiunge al container
        data.forEach((rivoluzione, index) => {
            container.innerHTML += creaCard(rivoluzione, index);
        });

        // Dopo aver generato tutte le card, aggiunge un evento "click" a ciascuna
        const links = container.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Evita il comportamento predefinito del link
                const index = this.getAttribute('data-index'); // Recupera l’indice salvato
                const riv = window.rivoluzioni[index]; // Ottiene l’oggetto corrispondente
                mostraContenuto(riv.titolo, riv.contenuto); // Mostra i dettagli nel modal
            });
        });
    })
    .catch(err => console.error(err)); // Stampa eventuali errori nel caricamento

// ==========================
// FUNZIONE PER MOSTRARE IL CONTENUTO NEL MODAL
// ==========================

// Quando l’utente clicca su una card, si apre un modal (finestra sovrapposta)
// con il contenuto completo della rivoluzione.
function mostraContenuto(titolo, contenutoArray) {
    const modalBody = document.getElementById('modal-body');

    // Converte l’array di paragrafi in stringa HTML (<p>…</p>)
    modalBody.innerHTML = contenutoArray.map(paragrafo => `${paragrafo}`).join('');

    // Imposta il titolo del modal
    const modalTitle = document.querySelector('#contenutoModal .modal-title');
    modalTitle.textContent = titolo;

    // Crea e mostra il modal Bootstrap
    const myModal = new bootstrap.Modal(document.getElementById('contenutoModal'));
    myModal.show();
}

// RICERCA PER TITOLO

// Variabili globali per memorizzare tutte le card e i dati da ricercare
let tutteLeCard = [];
let tutteLeRivoluzioni = [];

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('searchBtn');   // Bottone lente
  const input = document.getElementById('searchInput'); // Campo di ricerca
  const container = document.getElementById('cards-container'); // Contenitore delle card
  
  if (!btn || !input || !container) return;

  const observer = new MutationObserver(() => {
    tutteLeCard = Array.from(container.querySelectorAll('.card'));
    tutteLeRivoluzioni = window.rivoluzioni || [];
    observer.disconnect();
  });
  
  // Osserva quando nel container vengono aggiunti elementi (card)
  observer.observe(container, { childList: true, subtree: true });
  
  // Mostra/nasconde il campo di ricerca al click sul bottone
  btn.onclick = () => {
    if (input.style.display === 'none') {
      input.style.display = 'block';
      input.style.width = '260px';
      input.style.opacity = '1';
      input.focus();
    } else {
      input.style.width = '0';
      input.style.opacity = '0';
      setTimeout(() => {
        input.style.display = 'none';
        input.value = '';
        mostraTutte(); // Ripristina tutte le card
      }, 300);
    }
  };
  
  // Ricerca in tempo reale + apertura del modal con Enter se la ricerca corrisponde a un titolo di una card
  input.oninput = input.onkeypress = () => {
    const term = input.value.toLowerCase().trim();
    
    // Cerca nel JSON caricando i titoli che corrispondono al testo inserito
    const risultato = tutteLeRivoluzioni.find(r => 
      r.titolo.toLowerCase().includes(term)
    );
    
    // Mostra solo le card che contengono il termine inserito
    tutteLeCard.forEach(card => {
      const titolo = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      card.style.display = titolo.includes(term) ? 'block' : 'none';
    });
    
    // Se l’utente preme Enter su un risultato, apre direttamente il modal
    if (input.onkeypress && event.key === 'Enter' && risultato) {
      mostraContenuto(risultato.titolo, risultato.contenuto);
      // Chiude e nasconde il campo ricerca
      input.style.width = '0';
      input.style.opacity = '0';
      setTimeout(() => input.style.display = 'none', 300);
    }
  };
});

// Ripristina la visualizzazione di tutte le card
function mostraTutte() {
  tutteLeCard.forEach(card => card.style.display = 'block');
}

// Attiva la modalità PWA per permettere il funzionamento offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./assets/PWA/sw.js')
      .then(reg => console.log('Service Worker registrato', reg))
      .catch(err => console.log('Service Worker non registrato', err));
  });
}
