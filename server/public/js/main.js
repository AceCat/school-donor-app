var createButton = $('#createUser');
var loginButton = $('#loginSubmit');
var changeItems = $("#changeItems")
var submitSearch = $('#submitSearch');


createButton.click(function (){
	var email = $("#emailForm").val();
	var password = $('#passwordForm').val();
	var name = $('#nameForm').val();
	var userType = $('#userTypeForm').val();
	var address = $('#addressForm').val();
	var image = $('#imageForm').val();
	var description = $('#descriptionForm').val();
	var newUser = {
		email: email,
		password: password,
		name: name,
		userType: userType,
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
