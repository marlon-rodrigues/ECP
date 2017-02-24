define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var profileVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return profileVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('profile');        
    };

    function viewAttached(view) {
           
    }
});