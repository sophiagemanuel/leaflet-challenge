//First creating a const of our url and then fetching our data in a GeoJson format

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function (data){
    console.log(data);
    createFeatures(data.features);
});

//Creating a function to determine the maker color by depth.
function chooseColor(depth){
    if (depth < 10) return '#00ff00'; //green
    else if (depth < 30) return '#adff2f'; //green-yellow
    else if (depth < 50) return '#ffff00'; //yellow
    else if (depth < 70) return '#ffa500'; //orange
    else if (depth < 90) return '#ff0000'; //red
    else return '#00ffff'; //cyan
}

//Creating a function to determine maker size
function markerSize(magnitude){
    return magnitude ? magnitude * 4 : 1
};

//Creating function to create features
function createFeatures(earthquakeData){
    //Creating a nested funtion that will run for each feature in features
    //Creates bindPopup that will describe the place and time of the earthquake
    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
        //Creating earthquakes variable that will contain the earthquakeData object and run the oneEachFeature for each piece in the array
        let earthquakes = L.geoJson(earthquakeData, {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latLng) {
                let magnitude = feature.properties.mag;
                let depth = feature.geometry.coordinates[2];
                return L.circleMarker(latLng, {
                    radius: markerSize(magnitude),
                    fillColor: chooseColor(depth),
                    color: "#000",
                    weight: .5,
                    opacity: 1,
                    fillOpacity: 0.75
                });
            }
        });
        //Creatre map fufcv snction to use our earthquakes layer
        createMap(earthquakes);
    }
    function createMap(earthquakes) {
        // Create the tile layer
        let scale = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

    //Creating the map
    let myMap = L.map('map', {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [scale, earthquakes]
    });

    //Adding legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd=function(){
        let div = L.DomUtil.create('div', 'info legend'),
        //Creating the depths set up our legend
        depths = [0, 10, 30, 50, 70, 90];
        div.innerHTML += "<h3 style='text-align: center'>Depth</h3>";

        for (let i = 0; i < depths.length; i++){
            div.innerHTML +=
            '<i style="background:' + chooseColor(depths[i] + 1) + '"></i> ' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
        return div;
    }
    legend.addTo(myMap)
};