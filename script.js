mapboxgl.accessToken = 'pk.eyJ1IjoibHJvYml0YWlsbGUiLCJhIjoiY2tpaGh3ZTIyMHAzdDJ3bXFkczVhOWd6ZyJ9.rQT1IDn-ZJyBPXiM49CsDA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [4.83789, 45.759], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
     
    function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
     
    for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
    }
    
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
    );

    map.addControl(new mapboxgl.FullscreenControl());

    var url = 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=fpc_fond_plan_communaut.fpctoit&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4326&startIndex=0';
    
    //Extrusion du raster
    map.on('load', function () {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
         
        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
            }
        });
    });

    //Extrusion du bâti 
    map.on('load', function () {
        map.addSource('toit_lyon', {type: 'geojson', data: url}),
        map.addLayer({
            'id': 'toit_lyon_3D',
            'type': 'fill-extrusion',
            'source': 'toit_lyon',
            'layout': {},
            'paint': {
                'fill-extrusion-color': {
                    property: 'type',
                    type: 'categorical',
                        stops: [
                            ['Toit plan', '#FFEDA0'],
                            ['Toit non plan', '#1E90FF'],]},
                'fill-extrusion-opacity': 0.8,
                'fill-extrusion-height': {'type': 'identity','property': 'htotale'},
            }
        });
    });

    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 120,
        unit: 'metric'})); //add scale bare 

    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

