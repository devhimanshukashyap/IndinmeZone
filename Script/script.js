// ---------------------------- PRE LOADER ----------------------------

var PreLoader = document.getElementById("pre-loader");

window.addEventListener("load", function () {
    this.setTimeout(function () {
        PreLoader.style.display = "none";
    }, 1500);
});

//  ---------------------- RESPONISVE HAMBURGER NAVBAR ----------
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('open');
    });
});

// ---------------------------- FOR TEXT ANIMATION ---------------

document.addEventListener("DOMContentLoaded", () => {
    const mainLogo = document.getElementById("main-logo");
    const originalText = mainLogo.innerText;

    // Split the text into individual characters wrapped in span
    mainLogo.innerHTML = [...originalText].map(char => `<span>${char}</span>`).join('');

    const spans = mainLogo.querySelectorAll('span');
    let index = 0;
    let colorToggle = false;

    // Function to change the color of each span sequentially
    const changeColorSequentially = () => {
        if (index < spans.length) {
            spans[index].style.color = colorToggle ? 'white' : 'purple';
            index++;
        } else {
            index = 0;
            colorToggle = !colorToggle;
        }
    };

    // Start the color change loop
    setInterval(changeColorSequentially, 350); // Change color every 0.5 second

    // Initial colors setup
    changeColorSequentially();
});


// -------------------------------------- Anime Search ---------------------------------
// Function to fetch random anime data
function fetchRandomAnime() {
    var cx = '06930e29686c246fd';
    var apiKey = 'AIzaSyAStsTV5gMd2RkscfnoFmNhdBWSkUUIisU';
    var url = `https://www.googleapis.com/customsearch/v1?q=anime&cx=${cx}&key=${apiKey}&searchType=image&num=8&safe=active&sort=date&dateRestrict=y1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(shuffle(data.items)); // Shuffle the array before displaying
        })
        .catch(error => {
            console.error('Error fetching random anime:', error);
        });
}

// Function to shuffle array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch random anime data when the page loads
window.addEventListener('load', function () {
    fetchRandomAnime();
});

// List of prohibited terms
const prohibitedTerms = ['porn', 'sex', 'adult', 'xxx', 'nsfw', 'hentai', 'xnxx', 'xhamster', 'brazzers', 'brazzer', 'pornhub', 'nude', 'naked', 'explicit', 'mature', '18+', '18 plus',
    'hardcore', 'fetish', 'smut', 'lewd', 'provocative', 'vulgar'];

// Function to check if search term contains prohibited terms
function containsProhibitedTerms(term) {
    const lowerCaseTerm = term.toLowerCase();
    return prohibitedTerms.some(prohibitedTerm => lowerCaseTerm.includes(prohibitedTerm));
}

// Function to perform the anime search
function searchAnime(event) {
    event.preventDefault(); // Prevent default form submission behavior
    var searchTerm = document.getElementById('search-input').value;

    if (containsProhibitedTerms(searchTerm)) {
        alert('Your search contains prohibited content.');
        return;
    }

    // Append 'anime' to the search term
    var animeSearchTerm = `${searchTerm} anime`;
    var cx = '06930e29686c246fd';
    var apiKey = 'AIzaSyAStsTV5gMd2RkscfnoFmNhdBWSkUUIisU';
    var url = `https://www.googleapis.com/customsearch/v1?q=${animeSearchTerm}&cx=${cx}&key=${apiKey}&searchType=image&num=8&safe=active&sort=date&dateRestrict=y1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
            // Scroll to the results section
            document.getElementById('search-results').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// Function to display search results
function displayResults(results) {
    var searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(result => {
            var title = result.title;
            var link = result.link;
            var sourceLink = result.image.contextLink; // Use contextLink to get the actual source page

            var resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            // Create image element
            var imageElement = document.createElement('img');
            imageElement.setAttribute('src', link);
            imageElement.setAttribute('alt', title);
            imageElement.style.cursor = 'pointer';
            imageElement.addEventListener('click', function () {
                window.open(sourceLink, '_blank');
            });
            resultItem.appendChild(imageElement);

            // Create title element
            var titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.style.cursor = 'pointer';
            titleElement.addEventListener('click', function () {
                window.open(sourceLink, '_blank');
            });
            resultItem.appendChild(titleElement);

            // Create anime name element
            var animeNameElement = document.createElement('a');
            animeNameElement.textContent = result.displayLink;
            animeNameElement.href = sourceLink;
            animeNameElement.target = '_blank';
            resultItem.appendChild(animeNameElement);

            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.textContent = 'No results found.';
    }
}

//  --------------------------------------- ANIME RECOMMENDATION --------------------------------->

const url = 'https://anime-db.p.rapidapi.com/anime?size=8&sortBy=ranking&sortOrder=asc';
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

async function fetchAnimeRecommendations() {
    try {
        const pageNumber = getRandomPageNumber(10); // Assuming there are at least 10 pages
        const response = await fetch(`${url}&page=${pageNumber}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API Response:', result); // Debugging: log the API response
        if (result.data && Array.isArray(result.data)) {
            const shuffledAnimeList = shuffleArray(result.data);
            displayAnimeRecommendations(shuffledAnimeList);
        } else {
            console.error('Invalid data structure:', result);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayAnimeRecommendations(animeList) {
    const animeListElement = document.getElementById('anime-list');
    animeListElement.innerHTML = '';

    animeList.forEach(anime => {
        const animeCard = document.createElement('a');
        animeCard.classList.add('anime-card');
        animeCard.href = `https://www.google.com/search?q=${encodeURIComponent(anime.title)}`;
        animeCard.target = '_blank';
        animeCard.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="title">${anime.title}</div>
            <div class="info-hover">
                <h3>${anime.title}</h3>
                <p>${anime.synopsis ? anime.synopsis.slice(0, 80) : ''}...</p>
                <p>Type: ${anime.type}</p>
                <div class="genres">${anime.genres.map(genre => `<span class="genre">${genre}</span>`).join('')}</div>
            </div>
        `;

        animeListElement.appendChild(animeCard);
    });
}

fetchAnimeRecommendations();

// ------------------------------ Waifu Images ---------------------

async function fetchImages() {
    const response = await fetch('https://api.waifu.pics/many/sfw/waifu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exclude: [] })
    });
    const data = await response.json();
    displayImages(data.files.slice(0, 12));
}

function displayImages(urls) {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = '';
    urls.forEach(url => {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.download = '';

        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Waifu Image';

        const span = document.createElement('span');
        span.appendChild(anchor);
        anchor.appendChild(img);
        imageGrid.appendChild(span);
    });
}

fetchImages();

// ------------- View Counter --------------------------

// document.addEventListener('DOMContentLoaded', (event) => {
//     let viewCount = localStorage.getItem('viewCount');

//     if (viewCount === null) {
//         viewCount = 0;
//     } else {
//         viewCount = Number(viewCount);
//     }

//     viewCount++;

//     localStorage.setItem('viewCount', viewCount);

//     document.getElementById('viewCount').textContent = viewCount;
// });

