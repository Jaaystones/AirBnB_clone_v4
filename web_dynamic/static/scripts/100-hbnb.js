const $ = window.$;
const url = 'http://0.0.0.0:5001/api/v1';
const checkedStates = {};
const checkedCities = {};
const checkedAmenities = {};

function updateSelectedLocations() {
   const selectedLocations = [];
   for (const stateId in checkedStates) {
     if (checkedStates[stateId]) {
       selectedLocations.push($(`input[data-id='${stateId}']`).data('name'));
       const cities = checkedCities[stateId];
       for (const cityId in cities) {
	 if (cities[cityId]) {
	   selectedLocations.push(` ${$('input[data-id="' + cityId + '"]').data('name')}`);
	 }
       }
     }
   }
   $('.locations h4').text(selectedLocations.join(', '));
}

function handleCheckboxChange() {
   const $checkbox = $(this);
   const id = $checkbox.data('id');
   const isChecked = $checkbox.is(':checked');
   const name = $checkbox.data('name');

   if ($checkbox.parents('.locations').length) {
     const stateId = $checkbox.parents('li').children('input').data('id');
     if (!checkedCities[stateId]) {
	checkedCities[stateId] = {};
     }
     checkedCities[stateId][id] = isChecked;
     updateSelectedLocations();
   } else if ($checkbox.parents('.amenities').length) {
     if (isChecked) {
       checkedAmenities[id] = name;
     } else {
       delete checkedAmenities[id];
     }
   }

function handleSearchButtonClick() {
   const data = {
     amenities: Object.values(checkedAmenities),
     states: Object.keys(checkedStates).filter(stateId => checkedStates[stateId]),
     cities: [],
   };
   for (const stateId in checkedCities) {
     const cities = checkedCities[stateId];
     for (const cityId in cities) {
      if (cities[cityId]) {
	data.cities.push(cityId);
      }
     }
   }

   $.ajax({
     type: 'POST',
     url: `${url}/places_search`,
     contentType: 'application/json',
     data: JSON.stringify(data),
     success: function (data) {
       const places = data.map(place => (
       `<article>
         <div class="title_box">
	   <h2>${place.name}</h2>
	   <div class="price_by_night">$${place.price_by_night}</div>
	   </div>
	  <div class="information">
	    <div class="max_guest">${place.max_guest} Guests</div>
	    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
	    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
	   </div>
	   <div class="description">
	     ${place.description}
	    </div>
	   </article>`
       ));
       $('.places').html(places.join(''));
     }
   });
}

$(document).ready(function () {
  $('.locations input[type="checkbox"]').change(handleCheckboxChange);
  $('.amenities input[type="checkbox"]').change(handleCheckboxChange);
  $('button').click(handleSearchButtonClick);

  $.getJSON(`${url}/status`, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
});
