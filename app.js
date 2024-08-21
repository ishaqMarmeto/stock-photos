// document.getElementById('searchButton').addEventListener('click', () => {
//     const query = document.getElementById('searchInput').value;

//     if (query.trim() === '') {
//         alert('Please enter a search term.');
//         return;
//     }

//     fetchPhotos(query);
// });

// async function fetchPhotos(query) {
//     const apiKey = 'qfEyIFUyWWsdKEwTODcVWz9HaHyrM7d2ldX2qEL5NghvtPL41A7tQQxg';
//     const url = `https://api.pexels.com/v1/search?query=${query}&per_page=12`;

//     try {
//         const response = await fetch(url, {
//             headers: {
//                 Authorization: apiKey
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch photos');
//         }

//         const data = await response.json();
//         displayPhotos(data.photos);
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error fetching photos');
//     }
// }

// function displayPhotos(photos) {
//     const resultsDiv = document.getElementById('results');
//     resultsDiv.innerHTML = '';

//     photos.forEach(photo => {
//         const img = document.createElement('img');
//         img.src = photo.src.medium;
//         img.alt = photo.photographer;
//         resultsDiv.appendChild(img);
//     });
// }



document.addEventListener('DOMContentLoaded', () => {
    // Fetch curated photos when the page loads
    fetchCuratedPhotos();
});

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;

    if (query.trim() === '') {
        alert('Please enter a search term.');
        return;
    }

    fetchPhotos(query);
});

async function fetchPhotos(query) {
    const apiKey = 'qfEyIFUyWWsdKEwTODcVWz9HaHyrM7d2ldX2qEL5NghvtPL41A7tQQxg';
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

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
        displayResults(data.photos.slice(1));
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching photos');
    }
}

async function fetchCuratedPhotos() {
    const apiKey = 'qfEyIFUyWWsdKEwTODcVWz9HaHyrM7d2ldX2qEL5NghvtPL41A7tQQxg';
    const url = `https://api.pexels.com/v1/curated?per_page=10`;

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
        displayResults(data.photos.slice(1));
    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching curated photos');
    }
}

function displayFirstResult(photo) {
    const img = document.getElementById('firstResultImage');
    const photographer = document.getElementById('firstResultPhotographer');
    const showAuthorButton = document.getElementById('showAuthorButton');

    img.src = photo.src.large;
    img.alt = photo.photographer;
    photographer.textContent = `Photo by ${photo.photographer}`;

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
        img.src = photo.src.medium;
        img.alt = photo.photographer;

        const heartButton = document.createElement('button');
        heartButton.className = 'heart-button';
        heartButton.innerHTML = '❤️';
        heartButton.addEventListener('click', () => {
            addToWishlist(photo, li);
        });

        li.appendChild(img);
        li.appendChild(heartButton);
        resultsContainer.appendChild(li);
    });

    new Splide('#splide', {
        type   : 'loop',
        perPage: 3,
        focus  : 'center',
        pagination: false,
        arrows: true,
    }).mount();
}

function addToWishlist(photo, slideElement) {
    slideElement.remove();

    const wishlistContainer = document.getElementById('wishlistItems');
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.photographer;

    const heartButton = document.createElement('button');
    heartButton.className = 'heart-button';
    heartButton.innerHTML = '❤️';
    heartButton.addEventListener('click', () => {
        removeFromWishlist(photo, img);
    });

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.appendChild(img);
    wrapper.appendChild(heartButton);

    wishlistContainer.appendChild(wrapper);
}

function removeFromWishlist(photo, imageElement) {
    imageElement.parentElement.remove();
    
    const resultsContainer = document.getElementById('resultsContainer');

    const li = document.createElement('li');
    li.className = 'splide__slide';
    
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.photographer;

    const heartButton = document.createElement('button');
    heartButton.className = 'heart-button';
    heartButton.innerHTML = '❤️';
    heartButton.addEventListener('click', () => {
        addToWishlist(photo, li);
    });

    li.appendChild(img);
    li.appendChild(heartButton);
    resultsContainer.appendChild(li);
}

function openModal(photo) {
    const modal = document.getElementById('authorModal');
    const modalPhotographer = document.getElementById('modalPhotographer');
    const modalImage = document.getElementById('modalImage');

    modalPhotographer.textContent = `Photo by ${photo.photographer}`;
    modalImage.src = photo.src.large;
    modal.style.display = 'block';

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
