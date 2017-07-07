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
  	if (userTypeInput === 'School') {
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
	var email = $("#emailForm").val();
	var password = $('#passwordForm').val();
	var name = $('#nameForm').val();
	var userType = $('#userTypeForm').val();
	var schoolType = $('#schoolTypeForm').val();
	var address = $('#addressForm').val();
	var image = $('#imageForm').val();
	var description = $('#descriptionForm').val();
	var newUser = {
		email: email,
		password: password,
		name: name,
		userType: userType,
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
	var name = $("#nameField").val();
	var schoolType = $("#schoolTypeField").val();
	var address = $("#addressField").val();
	var description = $("#descriptionField").val();
	var image = $("#imageField").val();
	var newUserData = {
		name: name,
		schoolType: schoolType,
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

// itemImage.click(function(){
// 	this.css('max-height', '80px')
// })
