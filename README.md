# Utilisation de Mapbox pour visualiser le bâti de Lyon en 3D
Bastien Castello et Léopold Robitaille

## Mapbox Studio

## Mapbox GL
Mapbox GL est une bibliothèque JavaScript libre de cartographie open-source utilisant du WebGL pour l'affichage.

### Instalation de la librairie Mapbox GL
Pour commencer à utiliser Mapbox GL, après vous êtes crée un compte Mapbox, vous devez ouvrir un éditeur de code comme Visual Studio Code par exemple.
Il y a ensuite deux solutions pour intégrer la bibliothèque Mapbox GL :
  1. Soit directement inclure les références des fichiers Javascript et CSS dans le `head` de votre html
  ```html
<script src='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js'></script>   
<link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet'/>
```
  
  2. Soit télcharger les packages Mapbox GL depuis node.js avec la ligne suivante : npm install --save mapbox-gl.    
    Puis ajouter dans votre fichier html le css suivant :   
    `<link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet'/>`
    
 Nous avons choisi la première option qui permet entre autre de ne pas avoir besoin d'importer les fonctions.
    
 ### Créez votre première carte 
 
 1. Afficher une carte :  
 Dans votre fichier JavaScript ajouter la partie de code suivante :   
 
 ```html
 mapboxgl.accessToken = 'EntrezVotreClefApiMapbox';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // Style du fond de map 
        center: [4.83789, 45.759], // Coordonnées géographiques du centre de la carte en WGS 84 [lng, lat]
        zoom: 10 // début du zoom
    });
```
Cette partie de code permet d'afficher à l'écran votre première carte. Il est important de se créer un compte Mapbox en amont afin d'obtenir une clef d'accès. La création du compte est totalement gratuite et rapide.  

2. Sélectionner le fond de carte : 

Il est également possible de chosir le fond de carte à afficher grâce à un bouton. Pour cela dans le fichier html il est nécessaire d'ajouter les lignes de codes suivantes :  
```html
<div id="menu">
        <input
        id="streets-v11"
        type="radio"
        name="rtoggle"
        value="streets"
        checked="checked"
        />
        <label for="streets-v11">streets</label>
        <input id="light-v10" type="radio" name="rtoggle" value="light" />
        <label for="light-v10">light</label>
</div>
```
Puis dans le fichier JavaScript intégrer la partie de code suivante afin d'afficher le fond de carte selectionné :

```html
var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
     
    function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    }
     
    for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
    }
```

### Extrusion des tuiles

Mapbox GL offre la possibilité d'extruder des éléments raster ou vecteur. Extruder revient à passer en 3D, ou plutôt en 2.5D pour être plus exact. 
L'ajout d'un terrain en 3D est très simple grâce aux fonctions d'exctrusion de Mapbox.   

```html
map.on('load', function () {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // ajoutez la source du MNT et l'exageration de la hauteur
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
         
        // Ajoutez le ciel
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
```

### Extrusion du bâti

Dans le but de visualiser le bâti de la métropole de Lyon en 3D, Mapbox propose une <a href="https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/">documentation</a> afin d'extruder le bâti.
