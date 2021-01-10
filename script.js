const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let form = document.getElementById('form');
let searchInput = document.getElementById('search');



loader.hidden = true;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 10;
var searchText = '';
const apiKey = 'YJa52NEIcG4qN8s6tavTfzGaECtCfDAFwJD_NLwPT4Q';
let url = () => `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=squarish&query=${searchText}`;



// Function to remove all photos for when searching again
const clearPhotos = () => {
    imageContainer.textContent = '';
}



// Search functionality


function handleSubmit(e) {
    e.preventDefault();
    clearPhotos();
    searchText = searchInput.value;
    loader.hidden = false;
    count = 10;
    getPhotos();
    count = 30;
}






// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}






// Helper function to set attributes on dom elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links and photos, then add them to the dom
const displayPhotos = () => {
    imagesLoaded=0;
    totalImages = photosArray.length;
    // Run function for each item in photos array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {href: photo.links.html, target: '_blank'});
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});
        // Add event listener to check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const apiUrl = url();
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}


// Check to see if scrolling near bottom of page and load more photos if so
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// Event Listeners
form.addEventListener('submit', handleSubmit);
