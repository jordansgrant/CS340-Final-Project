express  = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var parse = require('body-parser');

var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'default',
	database: 'nodedb'
});

app.use(express.static('public'));

app.use(parse.urlencoded({ extended: false }));
app.use(parse.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3005);

/************************* SELECTION Queries *****************************/

/******** SELECT ALL Queries ***************/

app.get('/tree', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM tree;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	console.log(rows);
	res.render('tree', context);
	return;
  });
});

app.get('/leaf', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM leaf;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('leaf', context);
	return;
  });
});

app.get('/fruit', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM fruit;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('fruit', context);
	return;
  });
});

app.get('/climate', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM climate;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('climate', context);
	return;
  });
});

app.get('/soil', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM soil;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('soil', context);
	return;
  });
});

app.get('/tree-climate', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM tree_climate;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('tree_climate', context);
	return;
  });
});

app.get('/tree-soil', function (req, res) {
	var context = {};
  pool.query('SELECT * FROM tree_soil;', function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('tree_soil', context);
	return;
  });
});


/******************* Advanced SELECTION *************/
app.get('/tree-elevation', function (req, res) {
	var context = {};
  pool.query('SELECT DISTINCT t.genus, t.species, t.common_name FROM tree t ' +
			 'INNER JOIN tree_climate tc ON tc.t_species = t.species ' +
			 'INNER JOIN climate c ON c.name = tc.c_name ' +
			 'WHERE c.elevation > ?;', [req.query.elevation || 0],
	function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('elevation', context);
	return;
  });
});

app.get('/climate-count', function (req, res) {
	var context = {};
  pool.query('SELECT c.name, COUNT(t.species) as count FROM climate c ' +
			 'LEFT JOIN tree_climate tc ON tc.c_name = c.name ' +
			 'LEFT JOIN tree t ON t.species = tc.t_species ' +
			 'GROUP BY c.name ' +
			 'ORDER BY c.name;',
	function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('climate_count', context);
	return;
	});
  });
  
  app.get('/soil-count', function (req, res) {
	var context = {};
  pool.query('SELECT s.name, COUNT(t.species) as count FROM soil s ' +
			 'LEFT JOIN tree_soil ts ON ts.s_name = s.name ' +
			 'LEFT JOIN tree t ON t.species = ts.t_species ' +
			 'GROUP BY s.name ' +
			 'ORDER BY s.name;',
	function(err, rows, fields){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.data = rows;
	context.status = 'OK';
	
	res.render('soil_count', context);
	return;
  });
});

/******************************************** INSERT Qeuries ******************************/


/*************** Tree *****************/
app.get('/insert-tree', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO tree (`species`, `genus`, `common_name`, `region`, `bark`, ' +
								'`classification`, `height`, `diameter`, `life`)' +
			  'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', 
[req.query.species || null, req.query.genus || null, req.query.common_name || null, 
req.query.region || null, req.query.bark || null, (req.query.classification == 'true' ? 1 : 0),
req.query.height || null, req.query.diameter || null, req.query.life || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Row';
	context.result = result;
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

/*************** climate *****************/

app.get('/insert-climate', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO climate (`name`, `precipitation`, `elevation`) VALUES (?, ?, ?);', 
[req.query.name || null, req.query.precipitation || null, req.query.elevation || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Climate';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

/*************** Soil *****************/
app.get('/insert-soil', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO soil (`name`, `clay`, `sand`, `silt`) VALUES (?, ?, ?, ?);', 
[req.query.name || null, req.query.clay || null, req.query.sand || null, req.query.silt || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Soil';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

/*************** Leaf *****************/
app.get('/insert-leaf', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO leaf (`t_species`, `height`, `type`, `cuticle`) VALUES (?, ?, ?, ?);', 
[req.query.t_species || null, req.query.height || null, req.query.type || null, req.query.cuticle || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Leaf';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});
/*************** fruit *****************/
app.get('/insert-fruit', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO fruit (`t_species`, `name`, `seed`, `skin`, `bud`) VALUES (?, ?, ?, ?, ?);', 
[req.query.t_species || null, req.query.name || null, req.query.seed || null, req.query.skin || null, req.query.bud || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Fruit';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

/*************** tree_soil *****************/
app.get('/insert-tree-soil', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO tree_soil (`t_species`, `s_name`) VALUES ( ' +
			'(SELECT t.species FROM tree t WHERE t.species = ?),' +
			'(SELECT s.name FROM soil s WHERE s.name = ?)' +
			');', 
[req.query.t_species || null, req.query.s_name || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Tree Soil Relation';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

/*************** tree_climate *****************/
app.get('/insert-tree-climate', function (req, res, next) {
	
  var context = {};
  pool.query('INSERT INTO tree_climate (`t_species`, `c_name`) VALUES ( ' +
			'(SELECT t.species FROM tree t WHERE t.species = ?),' +
			'(SELECT c.name FROM climate c WHERE c.name = ?)' +
			');', 
[req.query.t_species || null, req.query.c_name || null],
	function(err, result){
    if(err){
	  console.log(err);
      next(err);
      return;
    }
	context.status = "OK";
    context.results = 'Successfully Inserted Tree Climate Relation';
	context.result = JSON.stringify(result);
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));
  });

});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	context = {};
	
	context.results = 'Encountered an Error';
	context.Status = "Error";
	context.info = err;
	res.setHeader('Content-Type', 'application/json');
    res.jsonp(JSON.stringify(context));

});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost: ' + app.get('port') +
			' press Ctrl-c to terminate.');
});
