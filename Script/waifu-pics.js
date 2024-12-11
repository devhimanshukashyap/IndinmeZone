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

document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const filterBtn = document.getElementById('filterBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const filterCard = document.getElementById('filterCard');
    const closeFilterCard = document.getElementById('closeFilterCard');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const warningCard = document.getElementById('warningCard');
    const closeWarningCard = document.getElementById('closeWarningCard');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const filterSelect = document.getElementById('filterSelect');
    let selectedFilter = 'sfw/waifu';
    let nsfwWarningAccepted = false;

    function fetchImages(filter) {
        let url = `https://api.waifu.pics/many/${filter}`;
        console.log(`Fetching images from: ${url}`);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exclude: [] })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched images:', data);
            displayImages(data.files);
        })
        .catch(error => console.error('Error fetching images:', error));
    }

    function displayImages(images) {
        console.log('Displaying images:', images);
        imageGrid.innerHTML = '';
        images.slice(0, 19).forEach(url => {
            let img = document.createElement('img');
            img.src = url;
            img.alt = 'Anime Image';
            img.addEventListener('click', () => window.open(url, '_blank'));
            imageGrid.appendChild(img);
        });
    }

    filterBtn.addEventListener('click', () => {
        filterCard.classList.remove('hidden');
    });

    closeFilterCard.addEventListener('click', () => {
        filterCard.classList.add('hidden');
    });

    applyFilterBtn.addEventListener('click', () => {
        selectedFilter = filterSelect.value;
        if (selectedFilter.startsWith('nsfw/') && !nsfwWarningAccepted) {
            warningCard.classList.remove('hidden');
        } else {
            filterCard.classList.add('hidden');
            fetchImages(selectedFilter);
        }
    });

    yesBtn.addEventListener('click', () => {
        nsfwWarningAccepted = true;
        warningCard.classList.add('hidden');
        filterCard.classList.add('hidden');
        fetchImages(selectedFilter);
    });

    noBtn.addEventListener('click', () => {
        selectedFilter = 'sfw/waifu';
        warningCard.classList.add('hidden');
        filterCard.classList.add('hidden');
        fetchImages(selectedFilter);
    });

    closeWarningCard.addEventListener('click', () => {
        warningCard.classList.add('hidden');
    });

    refreshBtn.addEventListener('click', () => {
        selectedFilter = 'sfw/waifu';
        nsfwWarningAccepted = false;
        fetchImages(selectedFilter);
    });

    // Initial load
    fetchImages(selectedFilter);
});
