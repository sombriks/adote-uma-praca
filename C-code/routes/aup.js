/* global console */
var express = require('express');
var router = express.Router();
var url = require('url');
// ***
// TODO definir os .catch dessas promessas aí tudinha
// ***
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
		var r = 20.0;
		if(req.query.zoom)
			var r = parseFloat(req.query.zoom < 100 ? req.query.zoom : 100);
		var minlat = -90;
		var maxlat = 90;
		if(req.query.lat){
			minlat = parseFloat(req.query.lat) - 90*1/r;
			maxlat = parseFloat(req.query.lat) + 90*1/r;
		}
		var minlng = -180;
		var maxlng = 180;
		if(req.query.lng){
			minlng = parseFloat(req.query.lng) - 180*1/r;
			maxlng = parseFloat(req.query.lng) + 180*1/r;
		}
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
	// adicionar um cuidador
	router.post("/plaza/addcuidador",function(req,res){
		var ids = req.body;
		knex("cuidador_plaza").insert(ids).then(function(ret){
			res.send("ok");
		}).catch(function(err){
			console.error(err);
			res.send("ops");
		});
	});
	// remover um cuidador
	router.post("/plaza/rmcuidador",function(req,res){
		var ids = req.body;
		knex("cuidador_plaza").del().where(ids).then(function(ret){
			res.send("ok");
		}).catch(function(err){
			console.error(err);
			res.send("ops");
		});
	});

	// listar cuidadores por praça
	router.get("/cuidador/byplaza/:idplaza",function(req,res){
		var whr={};
		if(req.params.idplaza && req.params.idplaza!="all")
			whr.idplaza=req.params.idplaza;
		var sub = knex("cuidador_plaza").select("idcuidador").where(whr);
		knex("cuidador").select().whereIn("idcuidador",sub)//
		.then(function(ret){
			res.json(ret);
		});
	});

	//
	router.get("/plaza/name/:nomeplaza",function(req,res){
		var nme = req.params.nomeplaza;
		knex("plaza").select()//
		.whereRaw("upper(nomeplaza) like upper(?)",["%"+nme+"%"])//
		.then(function(ret){
			res.json(ret);
		});
	});

	// contar quantas praças um usuário é cuidador
	router.get("/cuidador/:idcuidador", function(req, res){
		var idcuidadorparam = req.params.idcuidador;
		var whr = {idcuidador:idcuidadorparam};
		knex("cuidador_plaza").count("idplaza")//
		.where(whr).then(function(ret){
			res.json(ret[0].count);
		});
	});

	// ações/eventos por id
	router.get("/eventos/:idevento",function(req,res){
		knex("evento").select().where({
			"idevento":req.params.idevento
		}).then(function(ret){
			res.json(ret[0]);//por id só retorna 1
		});
	});

	// ações/eventos em uma praça
	router.get("/eventos/byplaza/:idplaza",function(req,res){
		var whr={};
		if(req.params.idplaza && req.params.idplaza !="all")
			whr.idplaza=req.params.idplaza;
		knex("evento").select().where(whr).then(function(ret){
			res.json(ret);
		});
	});

	// salvar uma ação em uma praça
	router.post("/eventos/save",function(req,res){
		var acao = req.body;
		if(acao.idevento){
			knex("evento").update(acao).where({
				idevento:acao.idevento
			}).then(function(ret){
				res.send("ok");
			});
		}else{
			knex("evento").insert(acao).then(function(ret){
				res.send("ok");
			});
		}
	});
	return router;
};
