/**
 * Created by deven on 1/29/2017.
 */

socialNetwork.controller('loginController', ['$scope', '$location', '$window', function($scope, $location, $window) {

    var loginController = this;

    $window.document.title = "Login";
    $("#welcome_image_container").hide();

    /*loginController.previewFile = function () {
        var preview = document.getElementById('user_image'); //selects the query named img
        var file    = document.querySelector('input[type=file]').files[0]; //sames as here
        var reader  = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            loginController.pictureSrc = preview.src;
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            preview.src = "";
        }
    };*/

    loginController.registerUser = function () {
        if(loginController.register_Email === null || loginController.register_Email === undefined || loginController.register_Email === '' || loginController.register_Name === null || loginController.register_Name === undefined || loginController.register_Name === '' || loginController.register_MobileNo === null || loginController.register_MobileNo === undefined || loginController.register_MobileNo === '' || gPictureSrc === null || gPictureSrc === undefined || gPictureSrc === '' || loginController.register_Password === null || loginController.register_Password === undefined || loginController.register_Password === '') {
                alert("Please enter all data fields to register.");
        }
        else {
            if(loginController.register_Password === loginController.register_ConfirmPassword){
                var data = {
                    'email': loginController.register_Email,
                    'name': loginController.register_Name,
                    'MobileNo': loginController.register_MobileNo,
                    'Picture': gPictureSrc,
                    'Password': loginController.register_Password
                }
                var email = loginController.register_Email;
                localStorage.setItem(email, JSON.stringify(data));
                $('.register-modal').modal('hide');
            }
            else
            {
                alert("Please enter same password to proceed.");
            }

        }
    };



    loginController.showUserPicture = function () {
        var keys = localStorage.getItem(loginController.login_email);
        if(keys !== null || keys !== '' || keys !== undefined) {
            $("#welcome_image_container").show();
            var dataImage = JSON.parse(keys).Picture;
            bannerImg = document.getElementById('user_welcome_image');
            bannerImg.src =  dataImage;
            gUserData = JSON.parse(keys);
        }
        else {
            $("#welcome_image_container").hide();
            gUserData = '';
        }
    };

    loginController.signIn = function () {
        var keys = localStorage.getItem(loginController.login_email);
        if(keys === null || keys === '' || keys === undefined){
            alert('Please enter valid email and password to login.');
        }
        else if(JSON.parse(keys).Password !== loginController.login_password){
            alert('Please enter correct password to login.');
        }
        else
        {
            $location.path("home");
        }
    };
}
]);