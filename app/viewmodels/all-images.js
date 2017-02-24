define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var allImagesVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return allImagesVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('all-images');        
    };

    function viewAttached(view) {
            
    }
});