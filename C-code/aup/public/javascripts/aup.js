/* global angular */

/*
 * declaração do módulo do aplicativo e suas dependências
 */
angular.module("aup", ['ui.bootstrap', 'ui.router', 'facebook']);

function map_api_loaded() {
	console.debug(" - gmaps api loaded - ");
}
