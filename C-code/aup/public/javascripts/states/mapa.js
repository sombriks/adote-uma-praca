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
            $scope.vepraca = function(){

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
