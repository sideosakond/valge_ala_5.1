proj4.defs("EPSG:3301", "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

ol.proj.proj4.register(proj4);
var projection = ol.proj.get('EPSG:3301');

projection.setExtent([40500, 5993000, 1064500, 7017000]);
var wmts = [new ol.layer.Tile({
  title: 'Hallkaart',
  source: new ol.source.WMTS({
    url: 'https://tiles.maaamet.ee/tm/wmts?LAYER=hallkaart',
    layer: 'kaart',
    matrixSet: 'LEST',
    format: 'image/png',
    projection: 'EPSG:3301',
    tileGrid: new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(projection.getExtent()),
      resolutions: [4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625, 1.953125, 0.9765625, 0.48828125],
      matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    })
    ,attributions: "<a href='https://ttja.ee/lairiba-viies-etapp-2025-2029'>Lairiba viies etapp</a>"
  })
})];
var map = new ol.Map({
  target: 'map',
  layers: wmts,
  view: new ol.View({
    zoom: 3,
    projection: projection
  })
});
map.getView().setCenter(ol.extent.getCenter(projection.getExtent()));


function getRandomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}


let geojson = geojson_array[0];
let features = new ol.format.GeoJSON().readFeatures(geojson, {dataProjection: 'EPSG:3301', featureProjection: 'EPSG:3301'});
let hex_color = "#00AA00";//getRandomHexColor();

const layer = new ol.layer.Vector({
  //declutter: true,
  source: new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(geojson, {dataProjection: 'EPSG:3301', featureProjection: 'EPSG:3301'})
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: hex_color, width: 1 }),
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({ color: hex_color }),
        stroke: new ol.style.Stroke({ color: '#ffffffaa', width: 1 })
      })
    }),
    title: "punktid"
 });
 map.addLayer(layer);

// release variable data
geojson_array = null;