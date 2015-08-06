/*
 * GET home page.
 */
module.exports = function(model) {
	return {
		index : function(req, res) {
			res.render('mapa-plaza', {
				title : "Temos xxx praças cadastradas"
			});
		}
	};
};
