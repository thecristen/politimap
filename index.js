var L = require('leaflet');
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

require('leaflet-providers');
var locate = require('leaflet.locatecontrol')

var map = L.map('map');
map.setView([47.63, -122.32], 6);

var marker = L.marker([47.63, -122.32]).addTo(map);
// add Stamen Watercolor to map.
L.tileLayer.provider('Hydda.Full').addTo(map);

L.control.locate({
	metric: false,
	markerClass: L.marker,
	showPopup: true,
	locateOptions: {
      maxZoom: 12
	}
}).addTo(map);


require('leaflet-pip')