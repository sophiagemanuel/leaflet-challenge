# leaflet-challenge
Module 15 Challenge
This project visualizes earthquake data on an interactive map using Leaflet.js and D3.js. The earthquake data was fetched from the USGS Earthquake API and represented by the circle markers on the map, with the size and color of the markers cooresponding to the magnitude and depth of the earthquakes. A legend is included on the bottom right to interpret the marker color based on the depth.

To ensure the project functions correctly, several tasks were accomplished, primarily focused on the JavaScript file responsible for fetching data, creating the map, and adding features.
HTML Setup: Adjusted the starter code to correctly link the JavaScript file. For CSS, referenced the Backdrop CMS style guide (https://docs.backdropcms.org/api/backdrop/core%21themes%21bartik%21css%21style.css/1) to properly load and center the legend. 
JavaScript Setup:
Utilized D3.json to load the earthquake data from USGS Earthquake API. 
Created the 'chooseColor' function to determine marker color based off the depth of the earthquake.
Created the 'markerSize' function to set the marker size according to the earthquake magnitude.
Created the 'createFeatures' function to generate markers with the appropriate features and layers: Using onEachFeature to create markers for each data point, setting marker radius with the 'markerSize' function, and setting the marker fill color with the 'chooseColor' function.
Implemented the 'createMap' function to add the scale, map instance, and legend. This ensured the correct map scaling and properly loaded the legend. 

After implementing these setups, it resulted in a functional and visually informative map, showcasing the earthquake data with markers that vary in size and color based on the magnitude and depth based on the longitude and latitude of the dataset. 
