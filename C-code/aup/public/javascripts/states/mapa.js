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
        controller:function($scope) {

            $scope.orig={
                lat:-3.7426492,
                lng:-38.5374927,
                zoom:18
            };

            $scope.vepraca = function(){
                $scope.orig.lat-=0.001;
            };
            $scope.veracao = function(){

            };
            $scope.adicionapraca = function(){

            };
            $scope.agendacao = function(){

            };
        }
    });
});
