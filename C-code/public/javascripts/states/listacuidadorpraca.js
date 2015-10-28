angular.module("aup").config(function($stateProvider){
    //
    $stateProvider.state({
        name:"listacuidadorpraca",
        url:"/listacuidadorpraca/:idplaza",
        templateUrl:"views/listacuidadorpraca.html",
        controller:function($scope,$rootScope,$stateParams,Plazas,Cuidadores) {
            //
            $scope.jacuido=function(){
                return $scope.cuidadores && $rootScope.cuidador &&
                    $scope.cuidadores.filter(function(o){
                        return o.idcuidador == $rootScope.cuidador.idcuidador;
                    }).length;
            };
            //
            $scope.cuidar=function(){
                var idplaza = $stateParams.idplaza;
                var idcuidador = $rootScope.cuidador.idcuidador;
                Plazas.addcuidador(idplaza,idcuidador).then(function(res){
                    if(res.data!="ok")
                        alert(res.data);
                    $scope.listcuidador();
                });
            };
            //
            $scope.descuidar=function(){
                var idplaza = $stateParams.idplaza;
                var idcuidador = $rootScope.cuidador.idcuidador;
                Plazas.rmcuidador(idplaza,idcuidador).then(function(res){
                    if(res.data!="ok")
                        alert(res.data);
                    $scope.listcuidador();
                });
            };
            //
            $scope.listcuidador=function(){
                var idplaza = $stateParams.idplaza;
                Plazas.byId(idplaza).then(function(res){
                    $scope.plaza = res.data;
                });
                Cuidadores.listbyplaza(idplaza).then(function(res){
                    $scope.cuidadores=res.data;
                });
            }
            $scope.listcuidador();
        }
    });
});
