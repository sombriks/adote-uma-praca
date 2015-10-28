// controle e roteamento da tela com mapa
angular.module("aup").config(function($stateProvider,$urlRouterProvider){
    // o mapa é também nossa tela inicial
    // $urlRouterProvider.when("","/mapa");
    $urlRouterProvider.otherwise("/mapa");
    // states
    $stateProvider.state({
        name:"mapa",
        url:"/mapa",
        templateUrl:"views/mapa.html",
        controller:function($scope,$location,Plazas) {
            $scope.orig={
                lat:-3.7426492,
                lng:-38.5374927,
                zoom:18
            };
            $scope.markers = [];
            //
            $scope.vepraca = function(){
                Plazas.newbygps().then(function(loc){
                    $scope.orig=loc;
                });
                Plazas.list($scope.orig).then(function(res){
                    $scope.markers = res.data.map(function(e){
                        // estava devolvendo string nesses
                        e.lat = parseFloat(e.lat);
                        e.lng = parseFloat(e.lng);
                        e.message = "<a href='#/detalhepraca/";
                        e.message += e.idplaza+"'>";
                        e.message += e.nomeplaza+"</a>"; 
                        return e;
                    });
                });
            };
            $scope.vepraca();
            $scope.veracao = function(){
                $location.path("/listact");
            };
            $scope.adicionapraca = function(){
                $location.path("/detalhepraca");
            };
            $scope.agendacao = function(){
                $location.path("/detalheacao");
            };
        }
    });
});
