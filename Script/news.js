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

// Function to fetch random anime data
function fetchRandomAnime() {
    const cx = '06930e29686c246fd';
    const apiKey = 'AIzaSyAStsTV5gMd2RkscfnoFmNhdBWSkUUIisU';
    const url = `https://www.googleapis.com/customsearch/v1?q=anime&cx=${cx}&key=${apiKey}&searchType=image&num=8&safe=active&sort=date&dateRestrict=y1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImageResults(shuffle(data.items), 'image-results'); // Shuffle the array before displaying
        })
        .catch(error => {
            console.error('Error fetching random anime:', error);
        });
}

// Function to fetch anime articles with dates
function fetchAnimeArticles() {
    const cx = '06930e29686c246fd';
    const apiKey = 'AIzaSyAStsTV5gMd2RkscfnoFmNhdBWSkUUIisU';
    const url = `https://www.googleapis.com/customsearch/v1?q=anime news&cx=${cx}&key=${apiKey}&num=8&safe=active&sort=date&dateRestrict=y1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayArticleResults(data.items, 'article-results');
        })
        .catch(error => {
            console.error('Error fetching anime articles:', error);
        });
}

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetch random anime data and articles when the page loads
window.addEventListener('load', function () {
    fetchRandomAnime();
    fetchAnimeArticles();
});

// Function to display image results
function displayImageResults(results, elementId) {
    const searchResults = document.getElementById(elementId);
    searchResults.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(result => {
            const { title, link, image: { contextLink }, displayLink } = result;

            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            // Create image element
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', link);
            imageElement.setAttribute('alt', title);
            imageElement.style.cursor = 'pointer';
            imageElement.addEventListener('click', () => window.open(contextLink, '_blank'));
            resultItem.appendChild(imageElement);

            const resultContent = document.createElement('div');
            resultContent.classList.add('result-content');

            // Create title element
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.style.cursor = 'pointer';
            titleElement.addEventListener('click', () => window.open(contextLink, '_blank'));
            resultContent.appendChild(titleElement);

            // Create anime name element
            const animeNameElement = document.createElement('a');
            animeNameElement.textContent = displayLink;
            animeNameElement.href = contextLink;
            animeNameElement.target = '_blank';
            resultContent.appendChild(animeNameElement);

            resultItem.appendChild(resultContent);
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.textContent = 'No results found.';
    }
}

// Function to display article results with dates
function displayArticleResults(results, elementId) {
    const searchResults = document.getElementById(elementId);
    searchResults.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(result => {
            const { title, link, snippet, displayLink, pagemap } = result;

            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const resultContent = document.createElement('div');
            resultContent.classList.add('result-content');

            // Extract date from pagemap if available
            let date = 'Unknown date';
            if (pagemap && pagemap.metatags && pagemap.metatags[0]) {
                const metaTags = pagemap.metatags[0];
                if (metaTags['article:published_time']) {
                    date = new Date(metaTags['article:published_time']).toLocaleDateString();
                } else if (metaTags['og:updated_time']) {
                    date = new Date(metaTags['og:updated_time']).toLocaleDateString();
                }
            }

            // Create date element
            const dateElement = document.createElement('span');
            dateElement.textContent = date;
            resultContent.appendChild(dateElement);

            // Create title element
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.style.cursor = 'pointer';
            titleElement.addEventListener('click', () => window.open(link, '_blank'));
            resultContent.appendChild(titleElement);

            // Create snippet element
            const snippetElement = document.createElement('p');
            snippetElement.textContent = snippet;
            resultContent.appendChild(snippetElement);

            // Create source link element
            const sourceLinkElement = document.createElement('a');
            sourceLinkElement.textContent = displayLink;
            sourceLinkElement.href = link;
            sourceLinkElement.target = '_blank';
            resultContent.appendChild(sourceLinkElement);

            resultItem.appendChild(resultContent);
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.textContent = 'No results found.';
    }
}
