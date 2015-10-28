angular.module("aup").config(function($stateProvider){
    $stateProvider.state({
        name:"listaprc",
        url:"/listaprc",
        templateUrl:"views/listaprc.html",
        controller:function($scope,Plazas) {
            Plazas.list({}).then(function(ret){
                $scope.plazas=ret.data;
            });
        }
    });
});
