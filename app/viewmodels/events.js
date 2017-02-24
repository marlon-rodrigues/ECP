define(['knockout', 'durandal/system', 'durandal/app', 'body-params'], function (ko, system, app, bodyParams) {
    "use strict";

    var eventsVM = {        
        activate: activate,        
        attached: viewAttached,
    };

    return eventsVM;

    function activate() {

        
    };

    function viewAttached(view) {
            //add body class
        bodyParams.defineBodyClass('events');

        $(".reveal-more a").click(function(event) {
            var idToShow = $(this).attr("data-reveal-id");
            $(idToShow).slideDown();
            return false;
        });
    }
});