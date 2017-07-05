var createButton = $('#createUser');
var loginButton = $('#loginSubmit');


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
			console.log("Success")
		}
	})
})

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
