// controle e roteamento da tela com mapa
angular.module("aup").config(function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.when("/detalheacao","/detalheacao/novo");
    $stateProvider.state({
        name:"detalheacao",
        url:"/detalheacao/:idacao",
        templateUrl:"views/detalheacao.html",
        controller:function($scope,$stateParams,$location,Acoes,Plazas){
            $scope.evento={
              dscevento:"",
              tituloevento:"",
              dtfimevento:new Date(),
              dtinicioevento:new Date()
            };
            $scope.defaults={
              zoomControl:false
            };
            $scope.plazamap={
              lat:-3.7426492,
              lng:-38.5374927,
              zoom:18,
            };
            $scope.markers=[$scope.plazamap];
            var idacao = $stateParams.idacao;
            if(idacao && idacao != "novo"){
              Acoes.findbyid(idacao).then(function(res){
                if(res.status==200){
                  res.data.dtinicioevento = new Date(res.data.dtinicioevento);
                  res.data.dtfimevento = new Date(res.data.dtfimevento);
                  $scope.evento=res.data;
                  Plazas.byId($scope.evento.idplaza).then(function(res2){
                    $scope.plazaac = res2.data;
                    $scope.plazaac.lat = parseFloat($scope.plazaac.lat);
                    $scope.plazaac.lng = parseFloat($scope.plazaac.lng);
                    $scope.plazamap=$scope.plazaac;
                  });
                }
              });
            }
            $scope.findplazas=function(partenomeplaza){
              return Plazas.bynome(partenomeplaza).then(function(res){
                return res.data;
              });
            };
            $scope.mudaposmapa=function(){
              if($scope.plazaac){
                $scope.plazaac.lat = parseFloat($scope.plazaac.lat);
                $scope.plazaac.lng = parseFloat($scope.plazaac.lng);
                $scope.plazamap=$scope.plazaac;
              }else{
                $scope.plazamap={
                  lat:-3.7426492,
                  lng:-38.5374927,
                  zoom:18,
                };
              }
              $scope.markers=[$scope.plazamap];
            }
            $scope.salvar=function(){
              var idplaza = $scope.plazamap.idplaza;
              if(idplaza){
                $scope.evento.idplaza=idplaza;
                Acoes.salvar($scope.evento).then(function(res){
                  if(res.data=="ok"){
                    alert("Ação salva com sucesso!");
                    $location.path("/listact/"+idplaza);
                  }
                })
              }else{
                alert("Informe uma praça para receber a ação");
              }
            };
        }
    });
});
