define(['plugins/router', "durandal/app", 'authenticate', 'match-height'], function (router, app, auth) {

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
            	{ route: ['', 'home'], moduleId: 'viewmodels/index', title: "Home", nav: true },
            	{ route: 'tasks', moduleId: 'viewmodels/tasks', title: "Tasks", nav: true },
            	{ route: 'documents', moduleId: 'viewmodels/documents', title: "Documents", nav: true },
            	{ route: 'contacts', moduleId: 'viewmodels/contacts', title: "Contacts", nav: true },
                { route: 'events', moduleId: 'viewmodels/events', title: "Events", nav: true },
                { route: 'profile', moduleId: 'viewmodels/profile', title: "Profile", nav: true },
                { route: 'manage-users', moduleId: 'viewmodels/manage-users', title: "Manage Users", nav: true }
            ]).buildNavigationModel();
            
            //return router.activate({ pushState: true }); //use pushState to avoid the hash(#) in the URL
            return router.activate(); //use pushState to avoid the hash(#) in the URL
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

            
            console.log("Logging is working.");
		},

        logout: function() {
                //log user out and redirects him to login page 
            auth.logout();
        }
    };
});