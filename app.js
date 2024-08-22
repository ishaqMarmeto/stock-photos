document.addEventListener('DOMContentLoaded', () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log("initial", savedFavorites);

    fetchCuratedPhotos();
    loadFavoritesFromLocalStorage(savedFavorites);

    

    document.getElementById('sortWishlist').addEventListener('change', () => {
        sortWishlist();
    });
});



function sortWishlist() {
    const sortCriteria = document.getElementById('sortWishlist').value;
    const wishlistContainer = document.getElementById('wishlistItems');
    const items = Array.from(wishlistContainer.children);

    items.sort((a, b) => {
        const aValue = a.querySelector('img').getAttribute(sortCriteria).toLowerCase();
        const bValue = b.querySelector('img').getAttribute(sortCriteria).toLowerCase();
        return aValue.localeCompare(bValue);
    });

    wishlistContainer.innerHTML = '';
    items.forEach(item => wishlistContainer.appendChild(item));
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;

    if (query.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

    fetchPhotos(query);
});

function loadFavoritesFromLocalStorage(savedFavorites) {
    savedFavorites.forEach(photo => {
        addToWishlist(photo);
    });
    sortWishlist();
}

function saveToFavoritesLocalStorage(photo) {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    savedFavorites.push(photo);
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    sortWishlist();
}

function removeFromFavoritesLocalStorage(photo) {
    let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    savedFavorites = savedFavorites.filter(fav => fav.src.original !== photo.src.original);
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
}

async function fetchPhotos(query) {
    const apiKey = 'qfEyIFUyWWsdKEwTODcVWz9HaHyrM7d2ldX2qEL5NghvtPL41A7tQQxg';
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=20`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch photos');
        }

        const data = await response.json();
        displayFirstResult(data.photos[0]);
        displayResults(data.photos);
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching photos');
    }
}

async function fetchCuratedPhotos() {
    const apiKey = 'qfEyIFUyWWsdKEwTODcVWz9HaHyrM7d2ldX2qEL5NghvtPL41A7tQQxg';
    const url = `https://api.pexels.com/v1/curated?per_page=20`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch curated photos');
        }

        const data = await response.json();
        displayFirstResult(data.photos[0]);
        displayResults(data.photos);
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching curated photos');
    }
}

function displayFirstResult(photo) {
    const img = document.getElementById('firstResultImage');
    const photographer = document.getElementById('firstResultPhotographer');
    const showAuthorButton = document.getElementById('showAuthorButton');

    img.src = photo.src.original;
    img.alt = photo.photographer;
    photographer.textContent = ` ${photo.alt}`;

    showAuthorButton.onclick = () => {
        openModal(photo);
    };
}

function displayResults(photos) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    photos.forEach(photo => {
        const li = document.createElement('li');
        li.className = 'splide__slide';

        const img = document.createElement('img');
        img.src = photo.src.original;
        img.alt = photo.photographer;

        const heartButton = document.createElement('button');
        heartButton.className = 'heart-button';
        heartButton.innerHTML = '<i class="fa fa-heart-o" style="font-size:24px"></i>';

        li.appendChild(img);
        li.appendChild(heartButton);
        
        heartButton.addEventListener('click', () => {
            saveToFavoritesLocalStorage(photo);
            addToWishlist(photo);
            li.remove();
        });

        li.addEventListener('click', () => {
            displayFirstResult(photo);
        });

        resultsContainer.appendChild(li);
    });

    new Splide('#splide', {
        type: 'loop',
        perPage: 3,
        pagination: true,
        arrows: true,
        autoplay: true,
        interval: 2000,
    }).mount();
}

function addToWishlist(photo) {
    const wishlistContainer = document.getElementById('wishlistItems');
    const wishhead = document.getElementById('fav');
    wishhead.textContent = "";

    const img = document.createElement('img');
    img.src = photo.src.original;
    img.alt = photo.alt || photo.photographer;
    img.title = photo.photographer;

    const heartButton = document.createElement('button');
    heartButton.className = 'heart-button';
    heartButton.innerHTML = '❤️';

    heartButton.addEventListener('click', () => {
        removeFromWishlist(photo, img);
        removeFromFavoritesLocalStorage(photo);
    });

    const wrapper = document.createElement('div');
    wrapper.className = "wish-cont";
    wrapper.style.position = 'relative';
    wrapper.appendChild(img);
    wrapper.appendChild(heartButton);

    wrapper.addEventListener('click', () => {
        displayFirstResult(photo);
    });

    wishlistContainer.appendChild(wrapper);
}

function removeFromWishlist(photo, imageElement) {
    imageElement.parentElement.remove();
    
    const resultsContainer = document.getElementById('resultsContainer');

    const li = document.createElement('li');
    li.className = 'splide__slide';

    const img = document.createElement('img');
    img.src = photo.src.original;
    img.alt = photo.photographer;

    const heartButton = document.createElement('button');
    heartButton.className = 'heart-button';
    heartButton.innerHTML = '<i class="fa fa-heart-o" style="font-size:24px"></i>';
    heartButton.addEventListener('click', () => {
        saveToFavoritesLocalStorage(photo);
        addToWishlist(photo);
        li.remove();
    });

    li.appendChild(img);
    li.appendChild(heartButton);
    resultsContainer.appendChild(li);
}

function openModal(photo) {
    const modal = document.getElementById('authorModal');
    const modalPhotographer = document.getElementById('modalPhotographer');
    const modalImage = document.getElementById('modalImage');
    const authButton = document.getElementById('authorProfile');

    modalPhotographer.textContent = `Photo by ${photo.photographer}`;
    modalImage.src = photo.src.original;
    modal.style.display = 'block';
    authButton.setAttribute('href', photo.photographer_url);

    const closeButton = document.querySelector('.close');
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
