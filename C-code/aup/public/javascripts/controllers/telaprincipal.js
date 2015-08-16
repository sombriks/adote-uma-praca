/* global angular */
angular.module("aup")//
.controller("TelaPrincipalController", function($scope, $rootScope, AupFB) {

	$scope.loginFB = AupFB.login;

	$scope.logout = function() {
		if (confirm("está certo de que deseja se desconectar?")) {
			delete $rootScope.cuidador;
		}
	};
});
