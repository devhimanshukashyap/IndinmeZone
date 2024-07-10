// script.js

const url = 'https://anime-db.p.rapidapi.com/anime?size=22&sortBy=ranking&sortOrder=asc';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5fd81a4351msh404b02d4c21d6d4p1d394djsnf79c82070bad',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
};

// Function to get a random page number
function getRandomPageNumber(maxPages) {
    return Math.floor(Math.random() * maxPages) + 1;
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array; // Return the shuffled array
}

async function fetchAnimeData(endpoint) {
    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function fetchAnimeRecommendations() {
    const pageNumber = getRandomPageNumber(12); // Assuming there are at least 12 pages
    const animeList = await fetchAnimeData(`${url}&page=${pageNumber}`);
    if (animeList) {
        const shuffledAnimeList = shuffleArray(animeList);
        displayAnimeRecommendations(shuffledAnimeList);
    } else {
        displayFallbackAnime();
    }
}

// script.js

// Function to display anime recommendations with hover details
function displayAnimeRecommendations(animeList) {
    const animeListElement = document.getElementById('ranking-anime');
    animeListElement.innerHTML = '';

    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="title">${anime.title}</div>
            <div class="details">
                <h3>${anime.title}</h3>
                <p>${anime.synopsis ? anime.synopsis.slice(0, 80) : ''}...</p>
                <p>Type: ${anime.type}</p>
                <div class="genres">${anime.genres.map(genre => `<span class="genre">${genre}</span>`).join('')}</div>
            </div>
        `;

        animeCard.addEventListener('click', () => {
            const searchQuery = encodeURIComponent(`${anime.title} anime`);
            window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
        });

        animeListElement.appendChild(animeCard);

        // Add event listeners for hover effect
        animeCard.addEventListener('mouseenter', () => {
            animeCard.classList.add('hovered');
        });

        animeCard.addEventListener('mouseleave', () => {
            animeCard.classList.remove('hovered');
        });
    });
}

function displayFallbackAnime() {
    const animeListElement = document.getElementById('ranking-anime');
    animeListElement.innerHTML = '';

    fallbackAnimeData.forEach(anime => {
        const animeCard = document.createElement('a');
        animeCard.classList.add('anime-card');
        animeCard.href = `https://www.google.com/search?q=${encodeURIComponent(anime.title)}`;
        animeCard.target = '_blank';
        animeCard.innerHTML = `
            <img src="${anime.image_url}" alt="${anime.title}">
            <div class="title">${anime.title}</div>
            <div class="details">
                <h3>${anime.title}</h3>
                <p>Genres: ${anime.genres.join(', ')}</p>
            </div>
        `;

        animeListElement.appendChild(animeCard);
    });
}

document.getElementById('refresh').addEventListener('click', () => {
    window.location.reload(); // Reload the page to refresh
});

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        const searchEndpoint = `https://anime-db.p.rapidapi.com/anime?size=22&search=${encodeURIComponent(query)}`;
        const searchResults = await fetchAnimeData(searchEndpoint);
        if (searchResults) {
            displayAnimeRecommendations(searchResults);
        } else {
            displayFallbackAnime();
        }
    }
});

window.onload = () => {
    fetchAnimeRecommendations();
};
