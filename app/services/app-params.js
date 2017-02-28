define(['durandal/system', 'plugins/router', "durandal/app", "authenticate"],function(system, router, app, authentication) {

  var APP_ERR = '';
  var redirectToEventsPage = false;
  var arrUserEvents = [];
  
  return {
     getUserEvents: function() {
     	return getUserEvents();
     },

     getredirectToEvents: function() {
     	return redirectToEventsPage;
     },
     setRedirectToEventsPage: function() {
        redirectToEventsPage = false;
     },
     
     getSessionInfo: function(sessionVariable) {
        return getSessionInfo(sessionVariable);
     },
     setSelectedEvent: function(eventID) {
        localStorage.ECP_SELECT_EVENT = eventID;
     },

     callError: function() {
     	return APP_ERR;
     }     
  };

  function getUserEvents() { 
	var self = this;

    	// get user events
    return $.ajax({
        url  : 'https://www.mockaroo.com/964feae0/download?count=1&key=f8ade920',
        type : 'POST',
        data : {
           accountCode: getSessionInfo('userAcctCode')
        }
    }).then(function(userData){ 
    		//assign events to app params
    	if(userData[0]['Events'].length > 1) {
    		redirectToEventsPage = true;
    		for(var i=0; i<userData[0]['Events'].length; i++) {
	    		arrUserEvents.push(userData[0]['Events'][i]);
	    	}	
    	} else {
    		redirectToEventsPage = false;
    	}    	
    }, function (jqXHR, textStatus, errorThrown) {
        self.APP_ERR = 'An error has occured, please refresh the page and try again in a little while. If the error persists, please contact the system administrator. (' + textStatus + ':' + errorThrown + ')'; 
    });
  }

  function getSessionInfo(sessionVariable) {
    if(sessionVariable == 'userName') {
      if(localStorage.ECP_USER_NAME) {
        return localStorage.ECP_USER_NAME;
      } else {
        return null;
      }
    } else if (sessionVariable == 'userAcctCode') {
      if(localStorage.ECP_ACCT_CODE) {
        return localStorage.ECP_ACCT_CODE;
      } else {
        return null;
      }
    } else if (sessionVariable == 'selectedEvent') { 
      if(localStorage.ECP_SELECT_EVENT) {
        return localStorage.ECP_SELECT_EVENT;
      } else {
        return null;
      }
    }
  }

});