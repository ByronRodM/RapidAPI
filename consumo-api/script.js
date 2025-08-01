// script.js - Consumo de Movie Database Alternative API

const API_KEY = "TU_API_KEY_AQUI"; // Pega tu API Key aquí
const API_HOST = "movie-database-alternative.p.rapidapi.com";

async function fetchMovies(searchTerm) {
    const url = `https://${API_HOST}/?s=${encodeURIComponent(searchTerm)}&r=json&page=1`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": API_HOST,
        },
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.Search && Array.isArray(data.Search)) {
            renderMovies(data.Search.slice(0, 6));
        } else {
            renderError("No se encontraron resultados.");
        }
    } catch (error) {
        renderError("Error al obtener datos de la API.");
    }
}

function renderMovies(movies) {
    const row = document.getElementById("movies-row");
    row.innerHTML = "";
    movies.forEach((movie) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="card card-custom h-100">
                <img src="${
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/350x500?text=No+Image"
                }" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text"><strong>Año:</strong> ${movie.Year}</p>
                    <p class="card-text"><strong>Tipo:</strong> ${movie.Type}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });
}

function renderError(message) {
    const row = document.getElementById("movies-row");
    row.innerHTML = `<div class="col-12"><div class="alert alert-danger text-center">${message}</div></div>`;
}

// Manejar búsqueda manual
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const term = input.value.trim();
    if (term) {
        fetchMovies(term);
    }
    document.activeElement.blur();
});
