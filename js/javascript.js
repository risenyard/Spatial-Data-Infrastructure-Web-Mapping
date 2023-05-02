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
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

/////////////////////////Map Elements/////////////////////////

// add popup to each feature of geoJSON
function popUPinfo(feature, layer) {
    layer.bindPopup(feature.properties.NIMI)
   }

// add geoJSON polygons layer
async function addDistrictsGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const polygons = L.geoJson(data, {
        onEachFeature: popUPinfo,
        style: polygonStyle,
        })
        polygons.addTo(map)
   }

// add geoJSON points layer
async function addCelltowersGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const markers = L.geoJson(data)
    const clusters = L.markerClusterGroup()
    clusters.addLayer(markers)
    clusters.addTo(map)
   }

// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
   }
   

//////////////////////STYLING////////////////////////////////

// polygon style
function polygonStyle(feature) {
    return {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: 'grey',
    }
   }

   