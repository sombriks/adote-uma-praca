angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state({
        name:"detalhepraca",
        url:"/detalhepraca",
        templateUrl:"views/detalhepraca.html",
        controller:function($scope,$location) {
            $scope.plaza = {
                nomeplaza:"",
                lat:-3.7426492,
                lng:-38.5374927,
                descricaoplaza:"",
                zoom:25
            };
            $scope.markers=[];
            //https://github.com/tombatossals/angular-leaflet-directive/tree/master/examples
        }
    });
});
