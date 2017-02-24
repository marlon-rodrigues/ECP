define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var allVideosVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return allVideosVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('all-videos');
    }
});