/* global angular */
angular.module("aup").factory("Acoes",function($http){
    return {
        listbyidplaza:function(idplaza){
            return $http({
                method : "GET",
                url : "eventos/byplaza/"+idplaza,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
        },
        findbyid:function(idevento){
            return $http({
                method : "GET",
                url : "eventos/"+idevento,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
        },
        salvar:function(evento){
          return $http({
            method:"POST",
            url:"/eventos/save",
            headers : {
                "Content-Type" : "application/json"
            },
            data:JSON.stringify(evento)
          })
        }
    };
});
