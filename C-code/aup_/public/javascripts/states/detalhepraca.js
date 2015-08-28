angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    // se vier sem id é porque vamos fazer um novo
    $urlRouterProvider.when("/detalhepraca","/detalhepraca/novo");
    // https://github.com/angular-ui/ui-router/wiki/URL-Routing
    $stateProvider.state({
        name:"detalhepraca",
        url:"/detalhepraca/:idplaza",
        templateUrl:"views/detalhepraca.html",
        controller:function($scope, $stateParams, $location, Plazas) {
            $scope.plaza = {
                nomeplaza:"",
                lat:-3.7426492,
                lng:-38.5374927,
                descricaoplaza:"",
                message:"Nova praça",
                zoom:20
            };
            $scope.markers={atual:$scope.plaza};
            $scope.$on("leafletDirectiveMap.click", function(event, args){
                var leafEvent = args.leafletEvent;
                $scope.plaza.lat=leafEvent.latlng.lat;
                $scope.plaza.lng=leafEvent.latlng.lng;
                $scope.plaza.message=$scope.plaza.nomeplaza;
            });
            $scope.salvar=function(){
                Plazas.save($scope.plaza).then(function(res){
                    alert("Praça salva som sucesso!");
                    $location.path("/mapa");
                });
            };
            if($stateParams.idplaza!="novo"){
                Plazas.byId($stateParams.idplaza).then(function(ret){
                    if(ret.data){
                        $scope.plaza = ret.data;
                        // $scope.plaza.nomeplaza = ret.data.nomeplaza;
                        // $scope.plaza.descricaoplaza = ret.data.descricaoplaza;
                        // $scope.plaza.datacriacao = ret.data.datacriacao;
                        $scope.plaza.lat = parseFloat(ret.data.lat);
                        $scope.plaza.lng = parseFloat(ret.data.lng);
                        // enfeites
                        $scope.plaza.zoom = 20;
                        $scope.markers = {atual:$scope.plaza};
                        $scope.plaza.message = ret.data.nomeplaza;
                    }
                });
            }
        }
    });
});
