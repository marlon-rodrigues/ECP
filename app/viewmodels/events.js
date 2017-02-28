define(['knockout', 'plugins/router', 'durandal/system', 'durandal/app', 'body-params', 'app-params', 'moment'], function (ko, router, system, app, bodyParams, appParams, moment) {
    "use strict";

    var eventsVM = {   
        canActivate: canActivate,     
        activate: activate,        
        attached: viewAttached,
        router: router,
        eventsList: ko.observableArray([]),
        pastEventsList: ko.observableArray([])
    };

    return eventsVM;

    function canActivate() {
        var dfd = $.Deferred();

        //TODO - UNCOMMENT THIS SECTION TO HANDLE MULTIPLE EVENTS VIEW
        /*appParams.getUserEvents().then(function() {                
            if(appParams.getredirectToEvents()) {
                appParams.setRedirectToEventsPage();
                dfd.resolve(true);
            } else {
                dfd.resolve({'redirect': 'home/:eventID'});
            }
        }, function(xhr, error_name_str, error_str) {
            dfd.resolve({'redirect': 'events'});
        });

        return dfd.promise();*/

        return true;
    }

    function activate() {
        var self = this;

            //get events list
        var getEventsList = $.ajax({
            url  : 'https://www.mockaroo.com/f4f40890/download?count=1&key=77af63b0',
            type : 'POST',
            data : {
                accoundCode: appParams.getLoggedInAccountCode()
            }
        }).then(function (response) {
            if(response[0].Events.length > 0){
                var evtObj = {};
                for(var i=0; i<response[0].Events.length; i++) {
                    evtObj.id = response[0].Events[i]['ID'];
                    evtObj.description = response[0].Events[i]['Description'];
                    evtObj.start_date = response[0].Events[i]['StartDate'];
                    evtObj.end_date = response[0].Events[i]['EndDate'];
                    evtObj.attendees = response[0].Events[i]['Attendance'];
                    evtObj.location = response[0].Events[i]['Location'];
                    evtObj.url = '#home/' + response[0].Events[i]['ID'];
                    evtObj.selectEvent = function(data, event){
                        selectEvent(data, event);
                    }

                    if(moment(response[0].Events[i]['StartDate']) >= moment()) {
                        self.eventsList.push(evtObj);
                    } else {
                        self.pastEventsList.push(evtObj);
                    }                    
                }
            } 
        });        

            //call promises
        return $.when(getEventsList).done(function(eventsData) {
                    //add body class
            bodyParams.defineBodyClass('events'); 
        });
    };

    function viewAttached(view) {
        $(".reveal-more a").click(function(event) {
            var idToShow = $(this).attr("data-reveal-id");
            $(idToShow).slideDown();
            return false;
        });

        $('.event-preview').matchHeight();
    }

    function selectEvent(data, event) {
        var dfd = $.Deferred();
        var eventID = data['id'];

        appParams.setCurrSelectedEvent(eventID);    
        dfd.resolve({'redirect': 'home/' + eventID});
    }
});