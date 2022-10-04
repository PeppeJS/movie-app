// LOGICA APPLICATA E SPIEGAZIONE DI SVILUPPO

// CREARE TRE VARIABILI DOVE IMPOSTARE AL LORO INTERNO LE 3 CHIAMATE ALLE API, FILM,IMG,SEARCH
// PRENDERE GLI ELEMENTI HTML DI CUI ABBIAMO BISOGNO
// CREARE UNA function PER OTTENERE UNA RISPOSTA DEL CONTENUTO DELL'API (info film) TRAMITE "fetch"
// CREARE UNA FUNZIONE CHE DETERMINI LA VISUAIZZAZIONE DEI FILM
// CREARE UNA FUNZIONE PER IL VOTO
// CREARE EVENTO DI LISTENER PER IL "search"

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

let form = document.getElementById('form');
let search = document.getElementById('search');
let main = document.getElementById('main');

getMovies(API_URL);

async function getMovies(url) {
  const risultato = await fetch(url);
  const data = await risultato.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((element) => {
    const { overview, poster_path, title, vote_average } = element;

    const elementMovie = document.createElement('div');

    elementMovie.classList.add('movie');

    elementMovie.innerHTML = `<img src="${
      IMG_PATH + poster_path
    }" alt="${title}" />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getVoteRate(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>overview</h3>
    ${overview}
  </div>`;

    main.appendChild(elementMovie);
  });
}

function getVoteRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

search.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchValue = search.value;

  if (searchValue && searchValue !== '') {
    searchValue(SEARCH_API + searchValue);

    search.value = '';
  } else {
    window.location.reload;
  }
});
