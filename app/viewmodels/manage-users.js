define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var manageUsersVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return manageUsersVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('manage-users');
    }
});