define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var contactsVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return contactsVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('contacts');        
    };

    function viewAttached(view) {
        $('.match-me').matchHeight();
    }
});