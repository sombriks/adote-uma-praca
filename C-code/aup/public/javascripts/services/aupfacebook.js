/* global angular */
angular.module("aup").config(function(FacebookProvider) {
	FacebookProvider.init('133548160319465');
}).factory("AupFB", function($rootScope, Facebook, LoginService) {
	return {
		login : function() {
			Facebook.login(function(response1) {
				if (response1.status == "connected") {
					Facebook.api('/me', function(response2) {
						var cuidador = {
							chaveacessofb : response1.authResponse.accessToken,
							nomecuidador : response2.name,
							idfacebook : response2.id
						};
						LoginService.entrar(cuidador).then(function(res) {
							$rootScope.cuidador = res.data;
						});
					});
				}
			});
		}
	};
});
