define(['durandal/system', 'plugins/router', "durandal/app"],function(system, router, app) {

  var APP_ERR = '';
  var redirectToEventsPage = false;
  var loggedInUser = '';
  var loggedInAccountCode = '';
  var arrUserEvents = [];
  var currSelectedEvent = '';

  return {
     getUserEvents: function() {
     	return getUserEvents();
     },
     getUserEventsArray() {
     	return arrUserEvents;
     },

     getredirectToEvents: function() {
     	return redirectToEventsPage;
     },
     setRedirectToEventsPage: function() {
        redirectToEventsPage = false;
     },
     
     getLoggedInUser: function() {
     	return loggedInUser;
     },
     setLoggedInUser: function(userName) {
     	loggedInUser = userName;
     },

     getLoggedInAccountCode: function() {
     	return getLoggedInAccountCode();
     },
     setLoggedInAccountCode: function(accountCode) {
     	loggedInAccountCode = accountCode;
     },

     getCurrSelectedEvent: function() {
      return currSelectedEvent;
     },
     setCurrSelectedEvent: function(eventID) {
      currSelectedEvent = eventID;
     },     

     callError: function() {
     	return APP_ERR;
     }     
  };

  function getLoggedInAccountCode() {
	return loggedInAccountCode;
  }

  function getUserEvents() { 
	var self = this;

    	// get user events
    return $.ajax({
        url  : 'https://www.mockaroo.com/964feae0/download?count=1&key=f8ade920',
        type : 'POST',
        data : {
           accountCode: getLoggedInAccountCode()
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

});