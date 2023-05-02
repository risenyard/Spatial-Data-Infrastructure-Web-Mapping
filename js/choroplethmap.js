 //////////////////////EXECUTION //////////////////////////////////  

 // add OSM basemap
 let map = L.map('map').setView([58.373523, 26.716045], 12)

 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
     maxZoom: 19,
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 })
 
 osm.addTo(map)
 // add layers
addDistrictsGeoJson("geojson/tartu_city_districts_edu.geojson")


// add geoJSON polygons layer function
async function addDistrictsGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    L.choropleth(data, {
        valueProperty: 'TOWERS',
        scale: ['#ffffff', '#8000ff'],
        steps: 5,
        mode: 'q', // q for quantile, e for equidistant
        style: {
        color: '#fff',
        weight: 2,
        fillOpacity: 0.8,
        },
        onEachFeature: function (feature, layer) {
        layer.bindPopup('Value: ' + feature.properties.TOWERS)
        },
   }).addTo(map)
}
   

// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
   }
   

   