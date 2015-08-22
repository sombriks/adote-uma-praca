angular.module("aup").factory("Plazas",function($http){
    return {
        list:function(orig){
            return $http({
                method : "GET",
                url : "plaza/list",
                headers : {
                    "Content-Type" : "application/json"
                },
                params:orig
            });
        },
        byId:function(idplaza){
            return $http({
                method : "GET",
                url : "plaza/id/"+idplaza,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
        },
        save:function(plaza){
            return $http({
                method:"POST",
                url:"plaza/save",
                headers : {
                    "Content-Type" : "application/json"
                },
                data:JSON.stringify(plaza)
            });
        }
    }
});
