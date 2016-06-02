
var address = "http://52.38.79.203:3005";

document.addEventListener('DOMContentLoaded', function() {
	
	document.getElementById('insert_tree').addEventListener('click', function() {
		var species = document.getElementById('tree_species').value;
		var genus = document.getElementById('tree_genus').value;
		var common_name = document.getElementById('tree_common').value;
		var region = document.getElementById('tree_region').value;
		var bark = document.getElementById('tree_bark').value;
		var height = document.getElementById('tree_height').value;
		var diameter = document.getElementById('tree_diameter').value;
		var life = document.getElementById('tree_life').value;
		var classification = document.getElementById('tree_class').checked;
		
		var query = '?species=' + species;
		query += '&genus=' + genus;
		query += '&common_name=' + common_name;
		query += '&region=' + region;
		query += '&bark=' + bark;
		query += '&height=' + (height ? height : null);
		query += '&diameter=' + (diameter ? diameter : null);
		query += '&life=' + (life ? life : null);
		query += '&classification=' + (classification ? classification : false);
		
		query = address + '/insert-tree' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("species cannot be null!");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_leaf').addEventListener('click', function() {
		var t_species = document.getElementById('leaf_t_species').value;
		var height = document.getElementById('leaf_height').value;
		var type = document.getElementById('leaf_type').value;
		var cuticle = document.getElementById('leaf_cuticle').value;
		
		var query = '?t_species=' + t_species;
		query += '&height=' + height;
		query += '&type=' + type;
		query += '&cuticle=' + cuticle;
		
		
		query = address + '/insert-leaf' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("t_species cannot be null!");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_fruit').addEventListener('click', function() {
		var t_species = document.getElementById('fruit_t_species').value;
		var name = document.getElementById('fruit_name').value;
		var seed = document.getElementById('fruit_seed').value;
		var skin = document.getElementById('fruit_skin').value;
		var bud = document.getElementById('fruit_bud').value;
		
		var query = '?t_species=' + t_species;
		query += '&name=' + name;
		query += '&seed=' + seed;
		query += '&skin=' + skin;
		query += '&bud=' + bud;
		
		
		query = address + '/insert-fruit' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("t_species cannot be null!");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_climate').addEventListener('click', function() {
		var name = document.getElementById('climate_name').value;
		var elevation = document.getElementById('climate_elevation').value;
		var precipitation = document.getElementById('climate_precipitation').value;
		
		var query = '?name=' + name;
		query += '&elevation=' + (elevation ? elevation : null);
		query += '&precipitation=' + (precipitation ? precipitation : null);
		
		
		query = address + '/insert-climate' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("t_species cannot be null!");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_soil').addEventListener('click', function() {
		var name = document.getElementById('soil_name').value;
		var clay = document.getElementById('soil_clay').value;
		var silt = document.getElementById('soil_silt').value;
		var sand = document.getElementById('soil_sand').value;
		
		var query = '?name=' + name;
		query += '&clay=' + (clay ? clay : null);
		query += '&silt=' + (silt ? silt : null);
		query += '&sand=' + (sand ? sand : null);
		
		
		query = address + '/insert-soil' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("t_species cannot be null!");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_ts').addEventListener('click', function() {
		var s_name = document.getElementById('ts_s_name').value;
		var t_species = document.getElementById('ts_t_species').value;
		
		var query = '?s_name=' + s_name;
		query += '&t_species=' + t_species;
		
		
		query = address + '/insert-tree-soil' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("Cannot have null Tree Species or Soil Name!\n" +
						"Check your spelling matches the database.");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('insert_tc').addEventListener('click', function() {
		var c_name = document.getElementById('tc_c_name').value;
		var t_species = document.getElementById('tc_t_species').value;
		
		var query = '?c_name=' + c_name;
		query += '&t_species=' + t_species;
		
		
		query = address + '/insert-tree-climate' + query + '&callback=?';
		
		$.getJSON(query, function(res) {
			if (JSON.parse(res).status == "OK") {
				alert(JSON.parse(res).results);
			
			} else {
			if (JSON.parse(res).info.code === 'ER_BAD_NULL_ERROR')
				alert("Cannot have null Tree Species or Climate Name!\n" +
						"Check your spelling matches the database.");
			else
				console.log(JSON.parse(res).results);
				alert(JSON.parse(res).results);
			}
		}).error(function (err) {
			alert(err.statusText + err.status);
		});
	});
	
	document.getElementById('select_tree').addEventListener('click', function() {
		var query = address + '/tree';
		window.location = query;
	});
	
	document.getElementById('select_leaf').addEventListener('click', function() {
		var query = address + '/leaf';
		window.location = query;
	});
	
	document.getElementById('select_fruit').addEventListener('click', function() {
		var query = address + '/fruit';
		window.location = query;
	});
	
	document.getElementById('select_climate').addEventListener('click', function() {
		var query = address + '/climate';
		window.location = query;
	});
	
	document.getElementById('select_soil').addEventListener('click', function() {
		var query = address + '/soil';
		window.location = query;
	});
	
	document.getElementById('select_ts').addEventListener('click', function() {
		var query = address + '/tree-soil';
		window.location = query;
	});
	
	document.getElementById('select_tc').addEventListener('click', function() {
		var query = address + '/tree-climate';
		window.location = query;
	});
	
	document.getElementById('select_elevation').addEventListener('click', function() {
		var elevation = document.getElementById('elevation').value;
		var query = address + '/tree-elevation' + '?elevation=' + elevation;
		window.location = query;
	});
	
	document.getElementById('count_climate').addEventListener('click', function() {
		var query = address + '/climate-count';
		window.location = query;
	});
	
	document.getElementById('count_soil').addEventListener('click', function() {
		var query = address + '/soil-count';
		window.location = query;
	});
});