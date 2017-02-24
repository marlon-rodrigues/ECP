define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var documentsVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return documentsVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('documents');
    }
});