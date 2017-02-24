define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var tasksVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return tasksVM;

    function activate() {
            //add body class
        bodyParams.defineBodyClass('tasks');        
    };

    function viewAttached(view) {
        $("td.more").click(function(event) {
            $(this).parent().find(".more-details").slideToggle();
        });
    }
});