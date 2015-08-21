angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state({
        name:"detalhepraca",
        url:"/detalhepraca",
        templateUrl:"views/detalhepraca.html",
        controller:function($scope,$location,Plazas) {
            $scope.plaza = {
                nomeplaza:"",
                lat:-3.7426492,
                lng:-38.5374927,
                descricaoplaza:"",
                message:"Nova praça",
                zoom:25
            };
            $scope.markers=[$scope.plaza];
            //https://github.com/tombatossals/angular-leaflet-directive/tree/master/examples
            $scope.$on("leafletDirectiveMap.click", function(event, args){
                var leafEvent = args.leafletEvent;
                $scope.plaza.lat=leafEvent.latlng.lat;
                $scope.plaza.lng=leafEvent.latlng.lng;
                $scope.plaza.message=$scope.plaza.nomeplaza;
            });
            $scope.salvar=function(){
                Plazas.salvar($scope.plaza).then(function(res){
                    
                });
            };
        }
    });
});
