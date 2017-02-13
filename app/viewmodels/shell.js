define(['plugins/router', "durandal/app", 'match-height'], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([
            	{ route: ['', 'home'], moduleId: 'viewmodels/index', title: "Home", nav: true },
            	{ route: 'tasks', moduleId: 'viewmodels/tasks', title: "Tasks", nav: true },
            	{ route: 'documents', moduleId: 'viewmodels/documents', title: "Documents", nav: true },
            	{ route: 'contacts', moduleId: 'viewmodels/contacts', title: "Contacts", nav: true }
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
		}
    };
});