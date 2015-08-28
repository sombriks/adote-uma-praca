/* global angular */
angular.module("aup").factory("LoginService", function($http) {
	return {
		entrar : function(cuidador) {
			return $http({
				method : "POST",
				url : "login",
				headers : {
					"Content-Type" : "application/json"
				},
				data : JSON.stringify(cuidador)
			});
		}
	};
});
