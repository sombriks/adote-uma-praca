// controle e roteamento da tela com mapa
angular.module("aup").config(function($urlRouterProvider,$stateProvider){
  //$urlRouterProvider.when("/detalheacao","/detalheacao/novo");
  $stateProvider.state({
    name:"cuidador",
    url:"/cuidador/:idcuidador",
    templateUrl:"views/cuidador.html",
    controller:function($scope,$location,Cuidadores) {
      if($scope.cuidador){
        var idcuidador = $scope.cuidador.idcuidador;
        // TODO por hora não podemos ver os dados de outros cuidadores
        if(idcuidador == $stateParams.idcuidador){
          Cuidadores.countplazas(idcuidador).then(function(ret){
              $scope.countplazas=ret.data;
          });
        }
      }
    }
  });
});
