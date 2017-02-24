define(['knockout', 'durandal/system', 'durandal/app'], function (ko, system, app) {
    "use strict";


  

    var activate = function () {

        
    };


    return {
    	attached: function(view) {
    		$("td.more").click(function(event) {
    			$(this).parent().find(".more-details").slideToggle();
    		});
    	}
    }
});