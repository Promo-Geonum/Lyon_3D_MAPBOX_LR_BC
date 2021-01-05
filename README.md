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
  
Cette partie de code permet d'afficher à l'écran votre première carte. Il est important de se créer un compte Mapbox en amont afin d'obtenir une clef d'accès. La création du compte est totalement gratuite et rapide. Plusieurs styles de fond de carte existent (Open Street Map, carte grise ou noir ou encore image satelite). La fonction `center` permet de centrer la carte sur un point à partir de coordonnées géographiques en WGS 84, dans notre exemple nous centrons la carte sur la commune de Lyon.

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

#### Extrusion des tuiles

Mapbox GL offre la possibilité d'extruder des éléments raster ou vecteur. Extruder revient à passer en 3D, ou plutôt en 2.5D pour être plus exact. 
L'ajout d'un terrain en 3D est très simple grâce aux fonctions d'exctrusion de Mapbox. En partant d'un MNT (Modèle Numérique de Terrain) fourni par Mapbox, l'extrusion se fait pratiquement automatiquement. Il est également possible d'ajouter le ciel, ou d'exagerer la hateur. 

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
 
 #### Extrusion du bâti

Dans le but de visualiser le bâti en 3D, Mapbox propose une <a href="https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/">documentation</a> afin d'extruder le bâti.  
Pour l'exemple nous avons représenté le bâti de la métropole de Lyon en 3D. En partant de la couche <a href="https://data.grandlyon.com/jeux-de-donnees/volumes-toiture-3d-2015-bati-metropole-lyon/donnees">Volumes de toiture 3D 2015 du bati de la Métropole de Lyon</a> issue de Data Grand Lyon, nous avons appliqué une extrusion de cette donnée vectorielle.  
   
Dans un premier temps il faut importer un fichier vectoriel, ici nous passons par du geojson via du WFS (Web Feature Service) et nous prennons la couche en WGS 84 qui est le format prit en compte par Mapbox. Passer par du WFS nous permet d'alléger notre carte mais aussi de travailler plus facilement à plusieurs sur un code. Dans votre fichier JavaScript, vous pouvez créer un objet url et lui attribuer le lien vers la couche WFS. Puis avec la fonction map.on appeler cette couche dans data.   

Pour extruder le bâti il est bien important de choisir `'fill-extrusion'` comme type de couche. Puis spécifier le style de la couche avec les fonctions <a href="https://docs.mapbox.com/mapbox-gl-js/style-spec#layers-fill-extrusion">de fill-extrusion</a>.

```html
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
                    type: 'categorical', //Colorer les batiments par catégorie en fonction de leur type de toiture
                        stops: [
                            ['Toit plan', '#FFEDA0'],
                            ['Toit non plan', '#1E90FF'],]},
                'fill-extrusion-opacity': 0.8,
                'fill-extrusion-height': {'type': 'identity','property': 'htotale'},
            }
        });
    });
```
#### Ajouter des éléments de controle

A partir de la librairie Mapbox il est possible d'ajouter des éléments à votre carte comme une barre d'échelle, une fenêtre de grand écran, une barre de recherche d'adresse ou encore une barre de navigation.  

* Ajout d'une barre de géocodage :
```html
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
    );
```
Le code ci-dessus permet d'afficher une barre de recherche d'adresse, pour l'intégrer dans une carte Mapbox il est nécessaire d'installer l'extension en amont en rajoutant dans le `body`du fichier html la ligne de code suivante lui indiquant la référence vers l'extension : 

```html 
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"></script>
```
 
* Ajout d'une barre d'échelle : 
```html
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 120,
        unit: 'metric'})); //add scale bare 
```

* Ajout du mode plein écran :
```html
    map.addControl(new mapboxgl.FullscreenControl());
```
* Ajout de control de navigation :
```html
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
```


