define(['durandal/system', 'plugins/router', "durandal/app", 'authenticate', 'body-params', 'app-params', 'match-height'], function (system, router, app, auth, bodyParams, appParams) {

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
            router.map([
                { route: ['', 'events'], moduleId: 'viewmodels/events', title: "Events", nav: true }, //idx 0
                { route: 'home/:eventID', moduleId: 'viewmodels/index', title: "Home", nav: true }, //idx 1
            	{ route: 'tasks/:eventID', moduleId: 'viewmodels/tasks', title: "Tasks", nav: true }, //idx 2
            	{ route: 'documents/:eventID', moduleId: 'viewmodels/documents', title: "Documents", nav: true }, //idx 3
            	{ route: 'contacts/:eventID', moduleId: 'viewmodels/contacts', title: "Contacts", nav: true }, //idx 4
                { route: 'profile/:eventID', moduleId: 'viewmodels/profile', title: "Profile", nav: true }, //idx 5
                { route: 'manage-users/:eventID', moduleId: 'viewmodels/manage-users', title: "Manage Users", nav: true }, //idx 6
                { route: 'notifications/:eventID', moduleId: 'viewmodels/notifications', title: "Notifications", nav: true }, //idx 7
                { route: 'all-articles/:eventID', moduleId: 'viewmodels/all-articles', title: "All Articles", nav: true }, //idx 8
                { route: 'all-images/:eventID', moduleId: 'viewmodels/all-images', title: "All Images", nav: true }, //idx 9
                { route: 'all-videos/:eventID', moduleId: 'viewmodels/all-videos', title: "All Videos", nav: true } //idx 10
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

        loggedInUser: appParams.getLoggedInUser()
    };
});