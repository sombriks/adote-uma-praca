/* global angular */
angular.module("aup")//
.controller("TelaPrincipalController", function ($scope, $rootScope, AupFB) {

    $scope.loginFB = AupFB.login;
});
