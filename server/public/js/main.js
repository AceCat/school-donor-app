var createButton = $('#createUser');
var loginButton = $('#loginSubmit');
var changeItems = $("#changeItems")
var submitSearch = $('#submitSearch');
var submitButton = $('#submitEdit');
var deleteButton = $('#deleteButton');
var itemImage = $('#itemImage')


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
		url: "../users",
		data: newUser,
		success: function(response){
			var dataId = response;
			window.location.href = ("../users/" + dataId);
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
		image: image
	};
	var pageUrl = document.URL; // Get current url
	var urlArray = pageUrl.split('/') // Split the string into an array with / as separator
	var urlId = urlArray[urlArray.length-1];
	$.ajax({
		method: "PATCH",
		url: "../users/edit/" + urlId,
		data: newUserData,
		success: function(response){
			window.location.href = ("../users/" + urlId);
			console.log('success')

		}
	})
})

deleteButton.click(function(){
	var itemId = $('#deleteId').val();
	var userId = $('#userId').val();
	$.ajax({
		method: "DELETE",
		url: "../item/" + itemId,
		success: function(response){
			window.location.href = ("../users/" + userId);
		}
	})
})

//Google maps stuff

var findNearbyButton = $('#findNearby');
var geocoder;
var map;
var address = $('#userAddress').text();
var geoCodedAddress;

function centerAddress (address) {
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
	for (i = 0; i < userLocations.allUsers.length; i++) {
		var latitude = userLocations.allUsers[i].latitude ;
		var longitude = userLocations.allUsers[i].longitude;
		var name = userLocations.allUsers[i].name;
		var description = userLocations.allUsers[i].description;
		var userId = userLocations.allUsers[i]._id
		var contentString = '<div id="content">'+
            '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
            '<div id="bodyContent">'+
            '<p>' + description + '</p>' +
            '<div class="view-link">' +
            '<p>View page:' + "<a href=/users/" + userId + '>Link</a>' +
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
});
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
		url: "../users",
		success: function(response) {
			userLocations = response;
		}
	})
});

//Functionality for the buttons on the profile page
$('.closedItem').hide();
$('.claimedItem').hide();

$('#openButton').click(function(){
	$('.active').removeClass('active');
	$('.openItem').slideToggle()
	$('.closedItem').hide()
	$('.claimedItem').hide();
	$('#openButton').addClass('active')
});
$('#closedButton').click(function(){
	$('.active').removeClass('active');
	$('.closedItem').slideToggle();
	$('.openItem').hide();
	$('.claimedItem').hide();
	$('#closedButton').addClass('active')
});

$('#claimedButton').click(function(){
	$('.active').removeClass('active');
	$('.claimedItem').slideToggle();
	$('.openItem').hide();
	$('.closedItem').hide();
	$('#claimedButton').addClass('active')
});

$('#buttonOpen').click(function(){
	$('.closedItem').attr('class','.openItem')
	$('.closedItem').remove()
})

$('#buttonClosed').click(function(){
	$('.openItem').attr('class','.closedItem')
	$('.openItem').remove()
})

//This controls the functionality of the buttons on the browser page

$('#schoolOwned').click(function(){
	$('.ownerIsSchool').slideToggle();
	$('#schoolOwned').addClass('active')
	$('#donorOwned').removeClass('active');
	$('.ownerIsDonor').hide();
});

$('#donorOwned').click(function(){
	$('.ownerIsDonor').slideToggle();
	$('#donorOwned').addClass('active')
	$('#schoolOwned').removeClass('active')
	$('.ownerIsSchool').hide();
});
