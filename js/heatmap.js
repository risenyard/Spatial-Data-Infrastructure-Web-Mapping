 //////////////////////EXECUTION //////////////////////////////////  

 // add OSM basemap
 let map = L.map('map').setView([58.373523, 26.716045], 12)

 var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
     maxZoom: 19,
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 })
 
 osm.addTo(map)
 // add layers
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

/////////////////////////Map Elements/////////////////////////

// add geoJSON points layer
async function addCelltowersGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const heatData = data.features.map(heatDataConvert)
    const heatMap = L.heatLayer(heatData, { radius: 10 })
    heatMap.addTo(map)   
   }

// convert spatial features attributes structure to  array of values acceptable for “Leaflet.heat” plugin
function heatDataConvert(feature) {
    return [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.area,
    ]
   }
   
// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
   }
   


   