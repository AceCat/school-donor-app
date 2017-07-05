

createUser.click(function (){
	var email = $("#emailForm").val();
	var password = $('#passwordForm').val();
	var name = $('nameForm').val();
	var userType = $('userTypeForm').val();
	var address = $('addressForm').val();
	var image = $('imageForm').val();
	var description - $('descriptionForm').val();
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
			window.location.href = ("http://localhost:3000/users/edit/" + dataId)
		}
	})
})