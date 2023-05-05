const url = 'http://0.0.0.0:5001/api/v1/places_search/';

// Helper function to fetch data from the API
function fetchData(data = {}) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

  })
   .then(response => response.json())
   .catch(error => console.error(error));
}

// Helper function to display places on the page
function displayPlaces(places) {
   const placesSection = document.querySelector('.places');
   placesSection.innerHTML = '';
   if (places.length === 0) {
     placesSection.innerHTML = '<p>No places found</p>';
     return;
   }
   for (const place of places) {
     const article = document.createElement('article');
     article.innerHTML = `
     <div class="title">
       <h2>${place.name}</h2>
       <div class="price_by_night">$${place.price_by_night}</div>
     </div>
     <div class="information">
       <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
       <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
       <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
       </div>
       <div class="description">
       ${place.description}
       </div>
      `;
       placesSection.appendChild(article);
   }
}

// Helper function to display reviews on the page
function displayReviews(reviews) {
   const reviewsList = document.getElementById('reviews-list');
   reviewsList.innerHTML = '';
   for (const review of reviews) {
     const li = document.createElement('li');
     li.innerHTML = `
     <h3>From ${review.user_first_name} ${review.user_last_name}:</h3>
     <p>${review.text}</p>
    `;
    reviewsList.appendChild(li);
   }
}


// Event listener for the search button
document.querySelector('.filters button').addEventListener('click', async () => {
  // Get selected states and cities
  const selectedCities = [];
  const selectedStates = [];
  const cityCheckboxes = document.querySelectorAll('.popover input[data-name][data-id]');
  for (const checkbox of cityCheckboxes) {
    if (checkbox.checked) {
      selectedCities.push(checkbox.getAttribute('data-id'));
      selectedStates.push(checkbox.parentElement.parentElement.firstElementChild.textContent.slice(0, -1));
    }
  }
// Get selected amenities
const selectedAmenities = [];
const amenityCheckboxes = document.querySelectorAll('.amenities input[data-name][data-id]');
for (const checkbox of amenityCheckboxes) {
  if (checkbox.checked) {
    selectedAmenities.push(checkbox.getAttribute('data-id'));
  }
}
// Fetch data from the API
   const data = {
   states: selectedStates,
   cities: selectedCities,
   amenities: selectedAmenities
   };
const places = await fetchData(data);
// Display places on the page
displayPlaces(places);
});

// Event listener for the Reviews toggle button
document.querySelector('#show-reviews').addEventListener('click', async (event) => {
   const buttonText = event.target.textContent;
   if (buttonText === 'show') {
     // Fetch reviews from the API
     const response = await fetch('http://0.0.0.0:500
