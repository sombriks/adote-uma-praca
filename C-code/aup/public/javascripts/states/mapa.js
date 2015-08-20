// controle e roteamento da tela com mapa
angular.module("aup")//
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyADAQ8IUnHOQqenOMKy6HhMFhPZr1Kmocs',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
.config(function($stateProvider,$urlRouterProvider){
    // o mapa é também nossa tela inicial
    // $urlRouterProvider.when("","/mapa");
    $urlRouterProvider.otherwise("/mapa");
    // states
    $stateProvider.state({
        name:"mapa",
        url:"/mapa",
        templateUrl:"views/mapa.html",
        controller:function($scope,uiGmapGoogleMapApi) {
            $scope.vepraca = function(){

            };
            $scope.veracao = function(){

            };
            $scope.adicionapraca = function(){

            };
            $scope.agendacao = function(){

            };
            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 18 };
            uiGmapGoogleMapApi.then(function(maps){

            });
        }
    });
});
