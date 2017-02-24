define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var allArticlesVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return allArticlesVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('all-articles');        
    };

    function viewAttached(view) {
            
    }
});