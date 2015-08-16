/* global angular */

var aup = angular.module("aup", ['ui.bootstrap', 'ui.router', 'facebook']);

aup.config(function(FacebookProvider) {
	FacebookProvider.init('133548160319465');
});

// controller da tela principal
aup.controller("TelaPrincipalController", ["$scope", "$rootScope", "Facebook", function ($scope,$rootScope,Facebook) {

	$scope.loginFB = function(){
		Facebook.login(function(response1) {
			if(response1.status == "connected") {
				Facebook.api('/me', function(response2) {
					var cuidador = {
						chaveacessofb:response1.authResponse.accessToken
						nomecuidador:response2.name,
						idfacebook:response2.id,
					};
					console.debug(cuidador);
				});
			}
      	});
	};
}]);

function map_api_loaded() {
	console.debug(" - gmaps api loaded - ");
}
