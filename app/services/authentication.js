define(['durandal/system', 'plugins/router', "durandal/app"],function(system, router, app) {

  var user_token = '';
  var error_text = '';
  var user_authenticated = false;

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
     },
     login: function(username, password) {
        var self = this;
        // do authenticate for login credentials (e.g for retrieve auth token)
        return $.ajax({
            url  : 'https://www.mockaroo.com/7c71d500/download?count=1&key=f8ade920',
            type : 'POST',
            data : {
               username: username,
               password: password
            }
        }).then(function(token){
            // on success, stored token and set root to shell
            storeToken(token);

            // Set root to shell
            app.setRoot('viewmodels/shell');
        }, function (jqXHR, textStatus, errorThrown) {
          self.error_text = 'An error has occured, please refresh the page and try again in a little while. (' + textStatus + ':' + errorThrown + ')'; 
        });
     },
     callError: function(){
        return this.error_text;
     },
     isAuthenticated: function() {
        return checkAuthenticate();
     }
  };

  function checkAuthenticate() {
    return this.user_authenticated;
  }

  function storeToken(token) {
    this.user_token = token[0]['access_token'];
    this.user_authenticated = true;
  }
});