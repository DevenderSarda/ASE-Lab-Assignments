/**
 * Created by deven on 4/7/2017.
 */
socialNetwork.controller('profileController', ['$scope', '$location', '$timeout', '$http', '$window', function($scope, $location, $timeout, $http, $window) {
    var profileController = this;

    profileController.data = gProfileData;

    profileController.logout = function () {
        $location.path('login');
    }
}]);