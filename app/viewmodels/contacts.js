define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var contactsVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return contactsVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('contacts');

        $('.match-me').matchHeight();
    }
});