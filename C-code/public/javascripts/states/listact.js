// controle e roteamento da tela com mapa
angular.module("aup").config(function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.when("/listact","/listact/all");
    $stateProvider.state({
        name:"listact",
        url:"/listact/:idplaza",
        templateUrl:"views/listact.html",
        controller:function($scope,$location,$stateParams,Acoes) {
            var idplaza = $stateParams.idplaza;
            Acoes.listbyidplaza(idplaza).then(function(res){
                $scope.eventos = res.data;
            });
        }

    });
});
