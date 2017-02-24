define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var allImagesVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return allImagesVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('all-images');
    }
});