angular.module("aup").factory("Plazas",function($http){
    return {
        list:function(lat,lng,r){
            return $http({
                method : "GET",
                url : "plaza/list",
                headers : {
                    "Content-Type" : "application/json"
                },
                params:{
                    lat:lat,
                    lng:lng,
                    r:r
                }
            });
        }
    }
});
