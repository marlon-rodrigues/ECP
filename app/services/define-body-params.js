define(['durandal/system', 'plugins/router', "durandal/app"],function(system, router, app) {

  
  return {
     defineBodyClass: function(bodyClass) {
          //remove all classes
        $('body').removeClass();
          //add the specific class
        $('body').addClass(bodyClass);      
     }
  };

});