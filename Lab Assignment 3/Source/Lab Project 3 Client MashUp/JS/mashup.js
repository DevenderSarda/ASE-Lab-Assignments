/**
 * Created by deven on 2/8/2017.
 */
socialNetwork.controller('mashupController', function($scope,$http,$sce, $location) {
    var mashupController = this;

    mashupController.fb_Id = JSON.parse(gFbData).id;

    mashupController.videoIdList = new Array();
    gapi.client.setApiKey("AIzaSyA8tuvkSJPIKBTk2ryX6z2PugU1I3Iavfw");
    gapi.client.load('youtube', 'v3', function() {
        //
    });

    mashupController.signOut = function () {
        $location.path("login");
    };


    mashupController.searchTopVideos =function () {
        var search=document.getElementById("searchKey").value;
        var speakup = "Searching top 10 trending video in web for "+search;
        console.log(speakup);
        var msg = new SpeechSynthesisUtterance(speakup);
        window.speechSynthesis.speak(msg);
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            type: 'video',
            q: search
        });
        var vid;
        var YTurl1;

        var response=$http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+search+"&type=video&key=AIzaSyA8tuvkSJPIKBTk2ryX6z2PugU1I3Iavfw");
        response.then(function (response) {
            console.log("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+search+"&type=video&key=AIzaSyA8tuvkSJPIKBTk2ryX6z2PugU1I3Iavfw")
            for (var i = 0; i < 10; i++) {
                var filter = response.data.items[i].id.videoId;
                mashupController.videoIdList[i] = {
                    "vid": response.data.items[i].id.videoId,
                    "vurl": $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+filter)
                };
            }

            /* var item = data.items[0].id.videoId;
             console.log(item);
             $scope.YTURL = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+item);*/
        });
        console.log(response);
    };
});