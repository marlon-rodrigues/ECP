define(['knockout', 'plugins/router', 'durandal/system', 'durandal/app', 'body-params', 'app-params', 'owl-carousel', 'match-height', 'fancybox', 'fancybox-media'], function (ko, router, system, app, bodyParams, appParams) {

    var indexVM = {
        router: router,
        activate: activate,
        attached: viewAttached,
        featuredImagesList: ko.observableArray([]),

        event_id: ko.observableArray([]),
        welcome_title: ko.observableArray([]),
        welcome_description: ko.observableArray([]),

        event_title: ko.observableArray([]),
        event_description: ko.observableArray([]),
        event_attendance: ko.observableArray([]),
        event_start_date: ko.observableArray([]),
        event_end_date: ko.observableArray([]),
        event_location: ko.observableArray([]),

        eventConfigurationProposals: ko.observableArray([]),

        eventArticlesList: ko.observableArray([]),
        articleSectionTitle: ko.observableArray([]),

        eventDocumentsList: ko.observableArray([]),
        documentsSectionTitle: ko.observableArray([])    
    };

    return indexVM;

    function activate(eventID) {
        var self = this;

            //get event featured images
        var getEventFeaturedImages = $.ajax({
            url  : 'https://www.mockaroo.com/2a832990/download?count=1&key=77af63b0',
            type : 'POST',
            data : {
                accoundCode: appParams.getLoggedInAccountCode()
            }
        }).then(function (response) {
            self.featuredImagesList = [];

            if(response[0].Images.length > 0){
                for(var i=0; i<response[0].Images.length; i++) {
                    var imageItem = '<img src="' + response[0].Images[i]['Url'] + '" alt="' + response[0].Images[i]['Title'] + '" seq="' + response[0].Images[i]['Sequence'] + '">';
                    self.featuredImagesList.push(imageItem);
                }                          
            } 
        }); 

            //get event information
        var getEventConfigurationDetails = $.ajax({
            url  : 'https://www.mockaroo.com/72ea1070/download?count=1&key=77af63b0',
            type : 'POST',
            data : {
                accoundCode: appParams.getLoggedInAccountCode(),
                eventID: '123' //TODO - GET CORRECT EVENT ID
            }
        }).then(function (response) {

            if(response.length > 0){ 
                var evtObj = {};
                var evtDetailsObj = {};
                var evtProposals = {};

                self.eventConfigurationProposals = [];

                    //get event info
                self.id = response[0]['ConfigurationId'];
                self.welcome_title = response[0]['WelcomeTitle'];
                self.welcome_description = response[0]['WelcomeDescription'];

                    //get event details
                self.event_title = response[0]['EventName'];
                self.event_description = response[0]['EventDescription'];
                self.event_attendance = response[0]['EventAttendance'];
                self.event_start_date = response[0]['EventStartDate'];
                self.event_end_date = response[0]['EvendEndDate'];
                self.event_location = response[0]['EventLocation'];

                if(response[0].Proposal != null){
                    for(var i=0; i<response[0].Proposal.length; i++) {
                        evtProposals.id = response[0].Proposal[0]['Id'];
                        evtProposals.name = response[0].Proposal[0]['Name'];
                        evtProposals.description = response[0].Proposal[0]['Description'];
                        evtProposals.date = response[0].Proposal[0]['Date'];
                        evtProposals.download_url = response[0].Proposal[0]['DownloadURL'];
                        evtProposals.version = response[0].Proposal[0]['Version'];

                        self.eventConfigurationProposals.push(evtProposals);
                    }     
                }
            } 
        }); 

            //get event articles
        var getEventArticles = $.ajax({
            url  : 'https://www.mockaroo.com/60844db0/download?count=1&key=77af63b0',
            type : 'POST',
            data : {
                accoundCode: appParams.getLoggedInAccountCode(),
                eventID: '123' //TODO - GET CORRECT EVENT ID
            }
        }).then(function (response) {

            if(response[0].Articles.length > 0){
                self.eventArticlesList = [];

                var articlesObj = {};
                var articlesToShow = response[0]['ArticlesToShow'];

                self.articleSectionTitle = response[0]['SectionTitle'];

                if(response[0].Articles != null) {
                    for(var i=0; i<(articlesToShow - 1); i++) {
                        articlesObj.id = response[0].Articles[i]['Id'];
                        articlesObj.title = response[0].Articles[i]['Title'];
                        articlesObj.description = response[0].Articles[i]['Description'];
                        articlesObj.sequence = response[0].Articles[i]['Sequence'];
                        articlesObj.url = response[0].Articles[i]['Url'];
                        
                        self.eventArticlesList.push(articlesObj);
                    }
                }
            } 
        }); 

            //get event documents
        //get event articles
        var getEventDocuments = $.ajax({
            url  : 'https://www.mockaroo.com/60844db0/download?count=1&key=77af63b0',
            type : 'POST',
            data : {
                accoundCode: appParams.getLoggedInAccountCode(),
                eventID: '123' //TODO - GET CORRECT EVENT ID
            }
        }).then(function (response) {

            if(response[0].Articles.length > 0){
                self.eventDocumentsList = [];

                var documentsObj = {};
                self.documentsSectionTitle = response[0]['SectionTitle'];

                if(response[0].Documents != null) {
                    for(var i=0; i<response[0].Documents.length; i++) {
                        documentsObj.id = response[0].Documents[i]['Id'];
                        documentsObj.name = response[0].Documents[i]['Name'];
                        documentsObj.description = response[0].Documents[i]['Description'];
                        documentsObj.date = response[0].Documents[i]['Date']; 
                        documentsObj.download_url = response[0].Documents[i]['DownloadURL'];                        
                        
                        self.eventDocumentsList.push(documentsObj);
                    }
                }
            } 
        }); 


            //call promises
        return $.when(getEventFeaturedImages, getEventConfigurationDetails, getEventArticles, getEventDocuments).done(function(imagesData, eventData) {
                //add body class
            bodyParams.defineBodyClass('home');
        });
    }

    function viewAttached(view) {

        var self = this;

        //getFeaturedImagesList(self);

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
		

        $("body").css("margin-bottom", "130px");    
    }
});