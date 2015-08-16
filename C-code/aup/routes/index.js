var express = require('express');
var router = express.Router();

module.exports = function(knex) {

	// na hora do login
	router.post("/login", function(req, res) {
		var cuidador = req.body;
		knex("cuidador").select().where({
			idfacebook : cuidador.idfacebook
		}).then(function(result) {
			if (result.length) {
				res.json(result[0]);
			} else {
				knex("cuidador").insert(cuidador, "idcuidador")//
				.then(function(retid) {
					cuidador.idcuidador = retid[0];
					res.json(result[0]);
				});
			}
		});
	});
	
	return router;
};
