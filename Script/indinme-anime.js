$(document).ready(function () {
    const apiKey = "AIzaSyAStsTV5gMd2RkscfnoFmNhdBWSkUUIisU";
    const cseId = "06930e29686c246fd";

    function fetchAnime(query) {
        $.ajax({
            url: `https://www.googleapis.com/customsearch/v1`,
            method: 'GET',
            data: {
                key: apiKey,
                cx: cseId,
                q: query,
            },
            success: function (data) {
                displayAnimeInfo(data);
            },
            error: function () {
                $('#anime-info').html('<p>An error occurred. Please try again.</p>');
            }
        });
    }

    function displayAnimeInfo(data) {
        if (data.items && data.items.length > 0) {
            const anime = data.items[0];
            const animeInfo = `
                <img src="${anime.pagemap.cse_image ? anime.pagemap.cse_image[0].src : 'placeholder.jpg'}" alt="Anime Cover" class="anime-cover">
                <div class="anime-description">${anime.snippet}</div>
                <h2>Latest Article</h2>
                <div class="anime-article">
                    <h3><a href="${anime.link}" class="anime-link">${anime.title}</a></h3>
                    <p>${anime.snippet}</p>
                </div>
                <h2>Complete Information</h2>
                <div class="anime-details">
                    <p>${anime.htmlSnippet}</p>
                    <a href="${anime.link}" class="anime-link">Original Source</a>
                </div>
            `;
            $('#anime-info').html(animeInfo);
        } else {
            $('#anime-info').html('<p>No results found.</p>');
        }
    }

    $('#search-button').on('click', function () {
        const query = $('#search-input').val();
        if (query) {
            fetchAnime(query);
        }
    });

    // Fetch random popular anime on page load
    fetchAnime('popular anime');
});
