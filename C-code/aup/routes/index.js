var express = require('express');
var router = express.Router();
var url = require('url');

module.exports = function(knex) {
	// login
	router.post("/login", function(req, res) {
		var cuidador = req.body;
		knex("cuidador").select().where({
			idfacebook : cuidador.idfacebook
		}).then(function(result) {
			if (result.length) {
				knex("cuidador").update(cuidador).where({
					idfacebook : cuidador.idfacebook
				}).then(function() {
					res.json(result[0]);
				});
			} else {
				knex("cuidador").insert(cuidador, "idcuidador")//
				.then(function(retid) {
					cuidador.idcuidador = retid[0];
					res.json(result[0]);
				});
			}
		});
	});
	// lista de praças
	router.get("/plaza/list",function(req,res){
		var q = url.parse(req.url).query;
		console.log(q.lat);
		console.log(q.lng);
		console.log(q.r);

		knex("plaza").select().where({

		}).then(function(result){
			res.json(result);
		});
	});
	return router;
};
