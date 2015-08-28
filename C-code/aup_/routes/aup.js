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
		// TODO repensar essa fórmula aqui pra ser: maior o zoom, menor o range. 
		var r = parseFloat(req.query.zoom < 100 ? req.query.zoom : 100);
		var minlat = parseFloat(req.query.lat) - r;
		var maxlat = parseFloat(req.query.lat) + r;
		var minlng = parseFloat(req.query.lng) - r;
		var maxlng = parseFloat(req.query.lng) + r;
		var l = [minlat,maxlat,minlng,maxlng];
		if(r){
			knex("plaza").select()//
				.whereRaw("lat between ? and ? and lng between ? and ?",l)//
				.then(function(result){
					res.json(result);
				});
		} else {
			knex("plaza").select().limit(50)//
			.then(function(result){
				res.json(result);
			});
		}
	});
	// praça por id
	router.get("/plaza/id/:idplaza",function(req,res){
		knex("plaza").select().where({
			idplaza:req.params.idplaza
		}).then(function(ret){
			res.json(ret[0]);
		});
	});
	// salvar uma praça
	router.post("/plaza/save",function(req,res){
		var plaza = req.body;
		if(plaza.idplaza){
			knex("plaza").update({
				nomeplaza:plaza.nomeplaza,
				descricaoplaza:plaza.descricaoplaza,
				lat:plaza.lat,
				lng:plaza.lng
			}).where({
				idplaza:plaza.idplaza
			}).then(function(result){
				knex("plaza").select().where({
					idplaza:plaza.idplaza
				}).then(function(ret){
					res.json(ret[0]);
				});
			});
		}else{
			knex("plaza").insert({
				nomeplaza:plaza.nomeplaza,
				descricaoplaza:plaza.descricaoplaza,
				lat:plaza.lat,
				lng:plaza.lng
			},"idplaza").then(function(retid){
				var idplaza = retid[0];
				knex("plaza").select().where({
					idplaza:idplaza
				}).then(function(ret){
					res.json(ret[0]);
				});
			});
		}
	});
	return router;
};
