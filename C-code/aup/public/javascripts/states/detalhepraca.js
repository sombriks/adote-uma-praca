angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state({
        name:"detalhepraca",
        url:"/detalhepraca",
        templateUrl:"views/detalhepraca.html",
        controller:function($scope,$location) {
            $scope.orig={
                lat:-3.7426492,
                lng:-38.5374927,
                zoom:25
            }
        }
    });
});
