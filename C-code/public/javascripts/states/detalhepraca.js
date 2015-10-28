angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    // se vier sem id é porque vamos fazer um novo
    $urlRouterProvider.when("/detalhepraca","/detalhepraca/novo");
    // https://github.com/angular-ui/ui-router/wiki/URL-Routing
    $stateProvider.state({
        name:"detalhepraca",
        url:"/detalhepraca/:idplaza",
        templateUrl:"views/detalhepraca.html",
        controller:function($scope, $rootScope, $stateParams, $location, Plazas, $timeout) {
            $scope.defaults = {
                keyboard : false,
                dragging : $rootScope.cuidador != undefined,
                scrollWheelZoom : $rootScope.cuidador != undefined
            };
            $scope.plaza={
                lat:-3.7426492,
                lng:-38.5374927,
                zoom:18
            };
            // TODO: clonar o plaza pra jogar nos markers em vez de referenciar
            if($stateParams.idplaza!="novo"){
                Plazas.byId($stateParams.idplaza).then(function(ret){
                    if(ret.data){
                        $scope.plaza = ret.data;
                        // $scope.plaza.idplaza = ret.data.idplaza;
                        // $scope.plaza.nomeplaza = ret.data.nomeplaza;
                        // $scope.plaza.descricaoplaza = ret.data.descricaoplaza;
                        // $scope.plaza.datacriacao = ret.data.datacriacao;
                        // $scope.plaza.zoom = ret.data.zoom;
                        $scope.plaza.lat = parseFloat(ret.data.lat);
                        $scope.plaza.lng = parseFloat(ret.data.lng);
                        // enfeites
                        $scope.markers = [$scope.plaza];
                        $scope.plaza.message = ret.data.nomeplaza;
                    }
                });
            }else{
                Plazas.newbygps().then(function(loc){
                    $scope.plaza=loc;
                    $scope.plaza.message="Nova praça";
                    $scope.markers=[$scope.plaza];
                });
            }
            //
            $scope.$on("leafletDirectiveMap.click", function(event, args){
                if($rootScope.cuidador != undefined){
                    $scope.defaults.dragging=true;
                    $scope.defaults.scrollWheelZoom=true;
                    var leafEvent = args.leafletEvent;
                    $scope.plaza.lat=leafEvent.latlng.lat;
                    $scope.plaza.lng=leafEvent.latlng.lng;
                    $scope.plaza.message=$scope.plaza.nomeplaza;
                }else{
                    $scope.defaults.dragging=false;
                    $scope.defaults.scrollWheelZoom=false;
                }
            });
            //
            $scope.salvar=function(){
                delete $scope.plaza.autoDiscover;
                delete $scope.plaza.message;
                Plazas.save($scope.plaza).then(function(res){
                    alert("Praça salva som sucesso!");
                    $location.path("/mapa");
                });
            };
        }
    });
});
