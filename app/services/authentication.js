define(['durandal/system', 'plugins/router', "durandal/app", 'moment'],function(system, router, app, moment) {

  var AUTH_ERR = '';
  var USER_AUTHENTICATED = false;

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
            // TODO - Verify object return before validating user

            // on success, stored token and set root to shell
            storeToken(token);

            // Set root to shell
            app.setRoot('viewmodels/shell');
        }, function (jqXHR, textStatus, errorThrown) {
            resetToken();
            self.AUTH_ERR = 'An error has occured, please refresh the page and try again in a little while. If the error persists, please contact the system administrator. (' + textStatus + ':' + errorThrown + ')'; 
        });
     },
     callError: function(){
        return this.AUTH_ERR;
     },
     isAuthenticated: function() {
        return checkAuthenticate();
     },
     logout: function() {
        localStorage.removeItem(ECP_USER_TOKEN);
        localStorage.removeItem(ECP_TOKEN_EXP);
     }
  };

  function checkAuthenticate() {    
      // check for local storage - if it exits and it's not expired, validate user. 
      // Otherwise clear storage and forces user to login.
    if(localStorage.ECP_USER_TOKEN && localStorage.ECP_TOKEN_EXP) {
      if(moment(localStorage.ECP_TOKEN_EXP) <= moment()) {
        this.USER_AUTHENTICATED = true;
      } else {
        resetToken();
      }
    }

    return this.USER_AUTHENTICATED;
  }

  function storeToken(token) {
    this.USER_AUTHENTICATED = true;

    // Store token on local storage
    localStorage.ECP_USER_TOKEN = token[0]['access_token'];
    localStorage.ECP_TOKEN_EXP = token[0]['expiration'];
  }

  function resetToken() {
    this.USER_AUTHENTICATED = false;

    if(localStorage.ECP_USER_TOKEN) {
      localStorage.removeItem(ECP_USER_TOKEN);
    }
    if(localStorage.ECP_TOKEN_EXP) {
      localStorage.removeItem(ECP_TOKEN_EXP);
    }
  }
});