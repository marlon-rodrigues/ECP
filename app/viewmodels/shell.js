define(['knockout', 'durandal/system', 'plugins/router', "durandal/app", 'authenticate', 'body-params', 'app-params', 'match-height'], function (ko, system, router, app, auth, bodyParams, appParams) {

    router.guardRoute = function(routeInfo, params, instance){ 
            //array with pages that can be accessed without credentials
        var insecureRoutes = []; 
        //if ($.inArray(params.fragment, insecureRoutes) || auth.isAuthenticated()) {
        if ($.inArray(params.fragment, insecureRoutes) >= 0 || auth.isAuthenticated()) {
            return true;
        } else {
            app.setRoot('viewmodels/login');
        }
    };

    return {
        router: router,

        activate: function () {
            this.selectedEvent = appParams.getSessionInfo('selectedEvent');  

            router.map([
                { route: ['', 'events'], moduleId: 'viewmodels/events', title: "Events", nav: true }, //idx 0
                { route: 'home/:eventID', moduleId: 'viewmodels/index', title: "Home", nav: true, hash: "#home/" + this.selectedEvent }, //idx 1
            	{ route: 'tasks/:eventID', moduleId: 'viewmodels/tasks', title: "Tasks", nav: true, hash: "#tasks/" + this.selectedEvent }, //idx 2
            	{ route: 'documents/:eventID', moduleId: 'viewmodels/documents', title: "Documents", nav: true, hash: "#documents/" + this.selectedEvent }, //idx 3
            	{ route: 'contacts/:eventID', moduleId: 'viewmodels/contacts', title: "Contacts", nav: true, hash: "#contacts/" + this.selectedEvent }, //idx 4
                { route: 'profile', moduleId: 'viewmodels/profile', title: "Profile", nav: true, hash: "#profile" }, //idx 5
                { route: 'manage-users', moduleId: 'viewmodels/manage-users', title: "Manage Users", nav: true, hash: "#manage-users" }, //idx 6
                { route: 'notifications/:eventID', moduleId: 'viewmodels/notifications', title: "Notifications", nav: true, hash: "#notifications/" + this.selectedEvent }, //idx 7
                { route: 'all-articles/:eventID', moduleId: 'viewmodels/all-articles', title: "All Articles", nav: true, hash: "#all-articles/" + this.selectedEvent }, //idx 8
                { route: 'all-images/:eventID', moduleId: 'viewmodels/all-images', title: "All Images", nav: true, hash: "#all-images/" + this.selectedEvent }, //idx 9
                { route: 'all-videos/:eventID', moduleId: 'viewmodels/all-videos', title: "All Videos", nav: true, hash: "#all-videos/" + this.selectedEvent } //idx 10
            ]).buildNavigationModel();
            
            //return router.activate({ pushState: true }); //use pushState to avoid the hash(#) in the URL
            //return router.activate(); //use pushState to avoid the hash(#) in the URL
            router.activate(); //use pushState to avoid the hash(#) in the URL
        },

        attached: function(view) {
		    /***** Alter bootstrap dropdowns to slide *****/
		    $('.dropdown').on('show.bs.dropdown', function() {
		        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(200);
		    });
		    $('.dropdown').on('hide.bs.dropdown', function() {
		        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
		    });
		    /***** End bootstrap sliding dropdowns *****/

		    /**** When heights need to match and flexbox not an option, add a class
		    or 'match-me' to both elements ****/
		    $('.match-me').matchHeight();
		},

        logout: function() {
                //log user out and redirects him to login page 
            auth.logout();
        },

        loggedInUser: appParams.getSessionInfo('userName'),
        selectedEvent: ko.observableArray([])
    };
});