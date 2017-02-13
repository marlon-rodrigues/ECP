define(['knockout', 'durandal/system', 'durandal/app', 'owl-carousel', 'match-height', 'fancybox', 'fancybox-media'], function (ko, system, app) {

    var indexVM = {
        activate: activate,
        attached: viewAttached,
        featuredEvents: ko.observableArray([])
    };

    return indexVM;

    function activate() {       
        /*var that = this;
        var pdts;
        var recs;
        var recipeJson = [];
        http.get('http:///Umbraco/Api/Products/GetAllProducts').then(function (response) {
            pdts = response;
            http.get('http:///Umbraco/Api/Recipes/GetAllRecipes').then(function (response1) {
                recs = response1;
                $.each(pdts, function (i, item) {
                    var json = [];
                    $.each(recs, function (j, jtem) {
                        if (item.DocumentTypeId == jtem.BelongstoProduct) {                           
                            json.push(jtem);                            
                        }
                    });

                    jsonitem = {}
                    jsonitem["product"] = item.ProductName;
                    jsonitem["recipes"] = json;
                    recipeJson.push(jsonitem);

                });
                that.products = recipeJson;
                return that.products;
            });
        });*/   

        var self = this;
		self.featuredEvents = ['<img src="images/imgHomeSlider.jpg" alt="">',
							   '<img src="images/imgHomeSlider.jpg" alt="">', 
							   '<img src="images/imgHomeSlider.jpg" alt="">'];                                                        
    }

    function viewAttached(view) {
        /***** Init all owl carousels ******/
		$('.owl-carousel').owlCarousel({
		    items: 1,
		    loop: true,
		    dots: true,
		    autoplay: true
		});

		/**** Init all fancybox media/video players ****/
	    $('.fancybox-media').fancybox({
	        fitToView: true,
	        openEffect: 'none',
	        closeEffect: 'none',
	        helpers: {
	        	media: {}
	        }
	    });

		/**** When heights need to match and flexbox not an option, add a class
	    or 'match-me' to both elements ****/
	    $('.match-me').matchHeight();
    }

});