mapboxgl.accessToken = 'pk.eyJ1IjoibHJvYml0YWlsbGUiLCJhIjoiY2tpaGh3ZTIyMHAzdDJ3bXFkczVhOWd6ZyJ9.rQT1IDn-ZJyBPXiM49CsDA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [4.83789, 45.759], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
    );

    map.addControl(new mapboxgl.FullscreenControl());

    var url = 'https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=fpc_fond_plan_communaut.fpctoit&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4326&startIndex=0';
    
    map.on('load', function () {
        map.addSource('toit_lyon', {type: 'geojson', data: url}),
        map.addLayer({
            'id': 'toit_lyon_3D',
            'type': 'fill-extrusion',
            'source': 'toit_lyon',
            'layout': {},
            'paint': {
                'fill-extrusion-color': '#1E90FF',
                'fill-extrusion-opacity': 0.8,
                'fill-extrusion-height': {'type': 'identity','property': 'htotale'},
            }
        });
    });

