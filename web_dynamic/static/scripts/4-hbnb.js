$(document).ready(function() {
  // Variable to store the checked amenities
  var checkedAmenities = [];

  // Function to update the h4 tag with the list of checked amenities
  function updateAmenities() {
    $('.popover .amenities h4').text(checkedAmenities.join(', '));
  }
	
  // Listen for changes on each input checkbox tag
  $('.popover .amenities input[type="checkbox"]').change(function() {
    var amenityId = $(this).data('id');
    var amenityName = $(this).data('name');
	
  // If the checkbox is checked, add the Amenity ID to the variable
  if ($(this).is(':checked')) {
    checkedAmenities.push(amenityId);
  } else {
  // If the checkbox is unchecked, remove the Amenity ID from the variable
  var index = checkedAmenities.indexOf(amenityId);
  if (index > -1) {
    checkedAmenities.splice(index, 1);
  }
  }

  // Update the h4 tag with the list of checked amenities
  updateAmenities();
  });
