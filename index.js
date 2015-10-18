var L = require('leaflet');
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

var leafletProviders = require('leaflet-providers');

var map = L.map('map');
map.locate({setView: true, maxZoom: 11, enableHighAccuracy: true});

L.tileLayer.provider('CartoDB.Positron').addTo(map);

require('leaflet-ajax');
var counties = new L.GeoJSON.AJAX('./data/counties.json');


var leafletPip = require('leaflet-pip');

var chosenLocationMarker;

function getCounty(position){
	var results = leafletPip.pointInLayer(position, counties);
	return results[0].feature.properties.NAME;
}

function addMarker(e){
	if(typeof(chosenLocationMarker)!=='undefined') {
		map.removeLayer(chosenLocationMarker);
	}

	chosenLocationMarker = new L.Marker(e.latlng, {draggable:true});

	chosenLocationMarker.on('dragend', function(e){
    var marker = e.target;
    var position = marker.getLatLng();
    marker.setLatLng(position).update();
		getCounty(position);
  });

	var county_name = getCounty(e.latlng);
	var coordinates = [position.lat, position.lng];
  map.addLayer(chosenLocationMarker);
	updateList("Updated!", county_name, coordinates);
}

map.on('click', addMarker);

var Handlebars = require("hbsfy/runtime");
var template = require("./regionList.hbs");

Handlebars.registerPartial('subset', require("./template.hbs"));

var data = {
  name: "esa",
  links: [
    { name: "Blog", url: "http://esa-matti.suuronen.org/" },
    { name: "Twitter", url: "https://twitter.com/esamatti" },
    { name: "Github", url: "https://github.com/epeli" }
  ]
};

window.onload = function() {
  document.body.innerHTML = template(data);
};


// var template = require("./template.hbs");
// document.body.innerHTML = template({ name: "Epeli" });
