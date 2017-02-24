define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var notificationsVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return notificationsVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('notifications');        
    };

    function viewAttached(view) {
            
    }
});