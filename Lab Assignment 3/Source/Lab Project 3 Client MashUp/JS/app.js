/**
 * Created by deven on 1/28/2017.
 */
var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'ngSanitize']);
var gPictureSrc = '';
var gUserData = '';
var gFbData = '';

socialNetwork.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController',
            controllerAs: 'loginController'
        })
        .when('/navya', {
            templateUrl: 'about.html',
            controller: 'aboutController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController',
            controllerAs: 'homeController'
        })
        .when('/clientMashUp', {
            templateUrl: 'mashup.html',
            controller: 'mashupController',
            controllerAs: 'mashupController'
        })
        .otherwise({ redirectTo: '/' });

});

gapi.client.setApiKey("AIzaSyA8tuvkSJPIKBTk2ryX6z2PugU1I3Iavfw");
gapi.client.load('youtube', 'v3', function() {
    //
});

socialNetwork.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
});

function previewFile() {
    var preview = document.getElementById('user_image'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        gPictureSrc = preview.src;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
};

function FBlogin() {



    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '267110513721091',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });

        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                /*FB.api('me/permissions', 'delete', function (r1) {
                    // FB.login relies on FB.getLoginStatus.
                    // Force reloading the login status.
                    FB.getLoginStatus(function (r2) {
                        FB.login(function (r3) {});
                    }, true);
                });*/
                FB.api('/me', function(response) {
                    console.log('Welcome to Client MashUp, ' + response.name + '.');
                    console.log(JSON.stringify(response));
                    gFbData = JSON.stringify(response);
                    window.location.href = window.location + 'clientMashUp';
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function(response) {
            console.log(response.status);
        });
    };
};


socialNetwork.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };

});
socialNetwork.directive('googlesourceplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gFromPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gFromPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                    var place = scope.gFromPlace.getPlace();
                    document.getElementById('fromcityLat').value = place.geometry.location.lat();
                    document.getElementById('fromcityLng').value = place.geometry.location.lng();
                });
            });
        }
    };

});
socialNetwork.directive('googledestinationplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gToPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gToPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                    var place = scope.gToPlace.getPlace();
                    document.getElementById('tocityLat').value = place.geometry.location.lat();
                    document.getElementById('tocityLng').value = place.geometry.location.lng();
                });
            });
        }
    };

});
