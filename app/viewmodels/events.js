define(['knockout', 'durandal/system', 'durandal/app'], function (ko, system, app) {
    "use strict";


  

    var activate = function () {

        
    };



    return {
    	attached: function(view) {
    		$(".reveal-more a").click(function(event) {
    			var idToShow = $(this).attr("data-reveal-id");
    			$(idToShow).slideDown();
    			return false;
    		});
    	}
    }
});