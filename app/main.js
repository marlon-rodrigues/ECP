requirejs.config({
    paths: {
        'text': '../libs/requirejs-text/text',
        'durandal': '../libs/Durandal/js',
        'plugins': '../libs/Durandal/js/plugins',
        'transitions': '../libs/Durandal/js/transitions',
        'knockout': '../libs/knockout/dist/knockout',
        'jquery': '../libs/jquery/dist/jquery',
        'bootstrap': '../libs/bootstrap-sass/assets/javascripts/bootstrap',
        'owl-carousel': '../libs/owl.carousel/dist/owl.carousel',
        'match-height': '../libs/matchHeight/dist/jquery.matchHeight',
        'fancybox': '../libs/fancybox/source/jquery.fancybox.pack',
        'fancybox-media': '../libs/fancybox/source/helpers/jquery.fancybox-media'
    },
  shim: {
    bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'],  function (system, app, viewLocator) {

    system.debug(true);


    app.title = "ECP";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});