angular.module("aup").factory("Plazas",function($http,$timeout,$q,$rootScope){
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
        },
        addcuidador:function(idplaza,idcuidador){
            return $http({
                method:"POST",
                url:"plaza/addcuidador",
                headers : {
                    "Content-Type" : "application/json"
                },
                data:JSON.stringify({"idplaza":idplaza,"idcuidador":idcuidador})
            });
        },
        rmcuidador:function(idplaza,idcuidador){
            return $http({
                method:"POST",
                url:"plaza/rmcuidador",
                headers : {
                    "Content-Type" : "application/json"
                },
                data:JSON.stringify({idplaza:idplaza,idcuidador:idcuidador})
            });
        },
        bynome : function(nomeplaza){
          return $http({
            method:"GET",
            url:"plaza/name/"+encodeURI(nomeplaza),
            headers:{
              "Content-Type":"application/json"
            }
          });
        },
        newbygps : function(){
            var p = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(evt){
                    $timeout(function(){
                        // console.debug("found pos:");
                        p.resolve({
                            zoom:20,
                            lat:evt.coords.latitude,
                            lng:evt.coords.longitude
                        });
                    },1000);
                });
            } else {
                $timeout(function(){
                    p.resolve({
                        zoom:20,
                        lat:-3.7426492,
                        lng:-38.5374927
                    });
                },1000);
            }
            return p.promise;
        }
    }
});
