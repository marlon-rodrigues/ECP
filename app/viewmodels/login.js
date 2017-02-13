define(['knockout', 'durandal/system', 'durandal/app', 'authenticate', 'sweetalert'], function (ko, system, app, auth, swal) {
	var username = ko.observable();
   	var password = ko.observable();

	return {
    	username: username,
    	password: password,
    	submitForm: function() {
        	// Do a login, if success, auth module will take care of it
         	// and here will take of the error 
         	auth.login(username(), password()).fail(function(err) {
             	// notify user about the error (e.g invalid credentials)
             	swal("Login Failed!", auth.callError(), "error");
         	});
      	}
   	};
});


