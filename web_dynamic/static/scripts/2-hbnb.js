$(document).ready(function() {
	  // Variable to store the checked amenities
	var checkedAmenities = [];
	function updateAmenities() {
	  $('.popover .amenities h4').text(checkedAmenities.join(', '));
	}
	// Listen for changes on each input checkbox tag
	$('.popover .amenities input[type="checkbox"]').change(function() {
	  var amenityId = $(this).data('id');
	  var amenityName = $(this).data('name');
	
	if ($(this).is(':checked')) {
	  checkedAmenities.push(amenityId);
	} else {
	  var index = checkedAmenities.indexOf(amenityId);
	  if (index > -1) {
	    checkedAmenities.splice(index, 1);
	  }
	}
	
	                                                                                   // Update the h4 tag with the list of checked amenities
	updateAmenities();
	});
	

	// Request API status
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
	  if (data.status === 'OK') {
	    $('#api_status').addClass('available');
	  } else {
	    $('#api_status').removeClass('available');
	  }
	});
});
