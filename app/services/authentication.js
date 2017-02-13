define(['durandal/system', 'plugins/router', "durandal/app"],function(system, router, app) {


  return {
     init: function() {
        // Initialize authentication...

        return system.defer(function(dfd) {
            // Check if user is authenticate or if there has stored token
            var isAuthenticate = checkAuthenticate();

            if (isAuthenticate) { 
               dfd.resolve(true); // return promise
            } else {
               // When not authenticate, set root to login page
               app.setRoot('viewmodels/login');
            }
        });
     }
  };

  function checkAuthenticate() {
    return false;
  }
});