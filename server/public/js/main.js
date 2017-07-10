var createButton = $('#createUser');
var loginButton = $('#loginSubmit');
var changeItems = $("#changeItems")
var submitSearch = $('#submitSearch');
var submitButton = $('#submitEdit');
var deleteButton = $('#deleteButton');
var itemImage = $('#itemImage')

$(document).ready(function() {
	var schoolTypeField = $("#schoolTypeForm");
  	$('#userTypeForm').on('change', function() {
  	var userTypeInput = $('#userTypeForm').val();
  	if (userTypeInput === "true") {
  		console.log('firing')
  		schoolTypeField.prop("disabled", false);
  		schoolTypeField.removeClass('disabled');
  	} else {
  		schoolTypeField.prop("disabled", true);
  		schoolTypeField.addClass('disabled')
  		console.log('School type stays hidden')
  	}
  })
})

createButton.click(function (){
	var schoolTypeFormDisabled = $('#schoolTypeForm').hasClass('disabled');
	var email = $("#emailForm").val();
	var password = $('#passwordForm').val();
	var name = $('#nameForm').val();
	var userType = $('#userTypeForm').val();
	if (schoolTypeFormDisabled === true){
		var schoolType;
	} else {
		var schoolType = $('#schoolTypeForm').val();
	}
	var address = $('#addressForm').val();
	var image = $('#imageForm').val();
	var description = $('#descriptionForm').val();
	var newUser = {
		email: email,
		password: password,
		name: name,
		isSchool: userType,
		schoolType: schoolType,
		address: address,
		image: image,
		description: description
	};
	$.ajax({
		method: "POST",
		url: "http://localhost:3000/users",
		data: newUser,
		success: function(response){
			var dataId = response;
			window.location.href = ("http://localhost:3000/users/" + dataId);
		}
	})
})

submitButton.click(function(){
	console.log('clicked')
	schoolTypeForm = $('#schoolTypeForm');
	var name = $("#nameField").val();
	if (schoolTypeForm.hasClass('disabled') === true){
		var schoolType = "";
	} else {
		var schoolType = $("#schoolTypeForm").val();
	}		
	var isSchool = $("#isSchool").val();
	var address = $("#addressField").val();
	var description = $("#descriptionField").val();
	var image = $("#imageField").val();
	var newUserData = {
		name: name,
		schoolType: schoolType,
		isSchool: isSchool,
		address: address,
		description: description,
		image: image,
	};
	var pageUrl = document.URL; // Get current url
	var urlArray = pageUrl.split('/') // Split the string into an array with / as separator
	var urlId = urlArray[urlArray.length-1];
	$.ajax({
		method: "PATCH",
		url: "http://localhost:3000/users/edit/" + urlId,
		data: newUserData,
		success: function(response){
			window.location.href = ("http://localhost:3000/users/" + urlId);

		}
	})
})

deleteButton.click(function(){
	var itemId = $('#deleteId').val();
	var userId = $('#userId').val();
	$.ajax({
		method: "DELETE",
		url: "http://localhost:3000/item/" + itemId,
		success: function(response){
			window.location.href = ("http://localhost:3000/users/" + userId);
		}
	})
})

// submitSearch.click(function (){
// 	var searchTerm = $('#searchBox').val();
// 	$.ajax({
// 		method: "POST",
// 		url: "http://localhost:3000/item/search",
// 		data: {searchTerm: searchTerm},
// 		success: function(response){
// 			console.log(response)
// 		}
// 	})
// })



// loginButton.click(function(){
// 	console.log('clicked')
// 	var email = $("#loginEmail").val();
// 	var password = $('#loginPassword').val();
// 	var userInfo = {
// 		email: email,
// 		password: password
// 	}
// 	$.ajax({
// 		method: "POST",
// 		data: userInfo,
// 		url: "http://localhost:3000/users/login",
// 		success: function(response){
// 			console.log(response);
// 		}
// 	})
// })
//these activate the open item list or closed item list

//Google maps stuff

var findNearbyButton = $('#findNearby');
var geocoder;
var map;
var address = $('#userAddress').text();
var geoCodedAddress;

function centerAddress (address) {
	console.log("running")
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address': address
	}, function (results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			var myOptions = {
				zoom: 14,
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			geoCodedAddress = results[0].geometry.location;
			map = new google.maps.Map(document.getElementById("map"), myOptions);

			var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
            });
        }
    });
}

function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
} 

findNearbyButton.click(function(){
	console.log(userLocations)
	for (i = 0; i < userLocations.length; i++) {
		var latitude = userLocations[i].latitude ;
		var longitude = userLocations[i].longitude;
		var name = userLocations[i].name;
		var description = userLocations[i].description;
		var userId = userLocations[i]._id
		var contentString = '<div id="content">'+
            '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
            '<div id="bodyContent">'+
            '<p>' + description + '</p>' +
            '<div class="view-link">' +
            '<p>View page:' + "<a href=http://localhost:3000/users/" + 
            userId + '>Link</a>' +
            '</div>' +
            '</div>' +
            '</div>';

        var marker = new google.maps.Marker({
			map: map,
			position: {lat: latitude, lng: longitude},
		})

		var infowindow = new google.maps.InfoWindow({
        	content: contentString
        });

		bindInfoWindow(marker, map, infowindow, contentString); 
	}
})
// 	function callback(results, status) {
//   	if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//     	console.log(results[i]);
//       	var place = results[i];
//       	createMarker(results[i]);
//     }
//   }
// }
// })



    // google.maps.event.addListener(marker, 'click', function() {
    // 	console.log('running')
    //     infowindow.setContent(marker.title);
    //     infowindow.open(map, this);
    // });


var userLocations;


window.onload = function() {
  centerAddress(address);
};

 $(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "http://localhost:3000/users",
		success: function(response) {
			userLocations = response;
		}
	})
});


function openList(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
///




$('.closedItem').hide();

$('#openButton').click(function(){
	$('.openItem').show()
	$('.closedItem').hide()
});
$('#closedButton').click(function(){
	$('.closedItem').show();
	$('.openItem').hide();
});
//this closes or opens an item if the user is logged in


$('#buttonOpen').click(function(){
	$('.closedItem').attr('class','.openItem')
	$('.closedItem').remove()
	// $('#buttonClosed').css(opacity, 0.6)
})

$('#buttonClosed').click(function(){
	$('.openItem').attr('class','.closedItem')
	$('.openItem').remove()
	// $('#buttonOpen').css(opacity, 0.6)

})

itemImage.click(function(){
	
})
