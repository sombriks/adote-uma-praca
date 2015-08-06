/*
 * GET home page.
 */
module.exports = function(model) {
	return {
		index : function(req, res) {
			res.render('index', {
				title : 'Express'
			});
		}
	};
};
