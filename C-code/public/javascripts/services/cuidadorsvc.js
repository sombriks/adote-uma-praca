/* global angular */
angular.module("aup").factory("Cuidadores", function($http) {
    return {
        listbyplaza:function(idplaza){
            return $http({
                method : "GET",
                url : "cuidador/byplaza/"+idplaza,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
        },
        countplazas:function(idcuidador){
            return $http({
                method : "GET",
                url : "cuidador/"+idcuidador,
                headers : {
                    "Content-Type" : "application/json"
                },
            });
        }
    };
});
