mapboxgl.accessToken = 'pk.eyJ1IjoibHJvYml0YWlsbGUiLCJhIjoiY2tpaGh3ZTIyMHAzdDJ3bXFkczVhOWd6ZyJ9.rQT1IDn-ZJyBPXiM49CsDA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [4.83789, 45.759], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    map.on('load', function () {
        map.addSource('toit_plat_lyon', {
        'type': 'geojson',
        'data': toit_plan}
        ),
        map.addLayer({
            'id': 'toit_plat_lyon_3D',
            'type': 'fill-extrusion',
            'source': 'toit_plat_lyon',
            'layout': {},
            'paint': {
                'fill-extrusion-color': '#1E90FF',
                'fill-extrusion-opacity': 0.8,
                'fill-extrusion-height': {'type': 'identity','property': 'htotale'},
            }
        });
    });
