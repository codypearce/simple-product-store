module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });
	app.get('/admin', function(req, res) {
    	res.render('admin/index');
    });
    app.get('*', function(req, res) {
        res.render('error');
    });
}