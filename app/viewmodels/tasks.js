define(['knockout', 'durandal/system', 'durandal/app', 'body-params', 'app-params'], function (ko, system, app, bodyParams, appParams) {
    "use strict";

    var tasksVM = {        
        activate: activate,        
        attached: viewAttached
    };

    return tasksVM;

    function activate() {
        var self = this;
        
            //add body class
        bodyParams.defineBodyClass('tasks');    
    };

    function viewAttached(view) {
        $("td.more").click(function(event) {
            $(this).parent().find(".more-details").slideToggle();
        });
    }
});