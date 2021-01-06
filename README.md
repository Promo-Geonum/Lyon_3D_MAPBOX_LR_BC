![alt text](https://raw.githubusercontent.com/mapbox/mapbox-gl-js-docs/publisher-production/docs/pages/assets/logo.png)

# Utilisation de Mapbox pour visualiser le bâti de Lyon en 3D
Bastien Castello et Léopold Robitaille

Mapbox est une entreprise américaine spécialisée dans la cartographie en ligne. Mapbox propose des outils de cartographie libre, comme une librairie JavaScript Mapbox GL basée sur Leaflet, et un éditeur de cartographie en ligne Mapbox Studio. L'utilisation de Mapbox est gratuite, cependant, l'entreprise propose des services suplémentaires payants sur les bases de crédits prelevés à chaque utilisation de la carte par un utlisateur.

## Mapbox Studio

Mapbox Studio est un éditeur de cartographie en ligne simplifié pour la visualisation de données géographiques sous Mapbox. 

### Premiers paramétrages 
A l'ouverture de Mapbox Studio, on fait face à une liste de styles, qui sont en réalité l'ensemble des cartes qui ont été créées par l'utilisateur. 
On peut donc choisir de créer un nouveau style ou d'utiliser un style existant. 
Pour ce tutoriel, nous allons en créer un nouveau en cliquant sur le bouton New Style. 
Nous avons alors le choix de créer une nouvelle cartographie vierge, ou avec des styles prédéfinis par Mapbox. 
En partant sur une cartographie vierge, nous pourrons choisir tous les paramètres de base, notamment quels fonds de carte afficher, quels éléments afficher, ou encore
quelles symbologies appliquer à chaque élément. Sur les styles par défaut, c'est Mapbox qui le fait pour nous en choisissant un fond de carte et les éléments à afficher. C'est le style Basic que nous allons choisir pour gagner du temps. 
A partir de cette base, nous pouvons tout de même avoir accès au menu des éléments pour choisir les éléments que l'on veut conserver, masquer ou supprimer. On peut également définir leur symbologie, leur couleur et leur typographie. 
On choisira par exemple d'afficher les buildings en 3D en activant le paramètre correspndant dans l'élément Buildings. 

### Import de données sous Mapbox Studio
La seconde étape est ensuite d'importer ses données sous la forme d'un fichier GeoJSON en coordonnées WGS84. 
Pour ce faire, nous disposons d'un fichier travaillé au préalable regroupant l'ensemble des toits plats de la ville de Lyon, adapté à ces standards. 
Pour l'importer, il suffit d'aller dans l'onglet Layers et de cliquer sur l'icône + pour ajouter une nouvelle couche. 
Dans les sources, on peut alors choisir de télécharger une couche en cliquer sur "upload data" dans une limite de 300MB. 
On télécharge alors notre couche et on peut ensuite aller l'ajouter à notre carte en allant la chercher dans nos sources. 
La couche devient alors active. 

<a href="https://ibb.co/qDjNHfx"><img src="https://i.ibb.co/Fh35QMn/couche.png" alt="couche" border="0"></a>

### Extrusion des polygones 
La première étape pour visualiser notre couche en 2.5D est d'extruder les polygones, c'est-à-dire leur ajouter un volume en changeant le type prédéfini pour la couche. 
Ainsi dans type, changer le paramètre Fill pour Fill extrusion. 

<a href="https://ibb.co/FsXW8vS"><img src="https://i.ibb.co/hXcM25P/bati-studio.png" alt="bati-studio" border="0"></a>

### Améliorer la visualisation en 3D

#### Paramétrage de la hauteur
Une fois ces bases posées, on peut modifier les paramètres pour un affichage optimal de la couche en 2.5D. Ainsi, tout en restant dans la couche, nous allons changer d'onglet pour modifier le style. 
Dans cet onglet, nou pourrons modifier les paramètres de hauteur, de couleur, de gradient etc...
Le paramètre principal est celui de la hauteur.
Pour bien afficher les différentes hauteurs, on va choisir de catégoriser ce paramètrer en fonction d'un panel de valeurs (style across data range). 
On va alors sélectionner le champ qui contient les valeurs de hauteur, ici "hfacade" puis définir les valeurs limites de la série, qui sont proposées par défaut par Mapbox Studio (min et max). 
On voit alors les hauteurs de bâtiments apparaître.  

<a href="https://ibb.co/PxkRr0F"><img src="https://i.ibb.co/rk9gQNF/hauteur.png" alt="hauteur" border="0"></a>  


#### Couleurs 
Quand la couche est affichée correctement avec les bonnes valeurs de hauteur, on peut ensuite jouer avec la symbologie pour améliorer la visibilité et la lisibilité de notre couche. 
On peut pour cela changer les couleurs par défaut en choissant une couleur unique ou en choisissant de faire varier la couleur selon un paramètre choisi. 
Pour le test, on peut une nouvelle fois de catégoriser selon une série de valeurs (across data range). 
Si l'on prend encore le champ hfacade, on va pouvoir définir des couleurs en fonction de la hauteur des batiments selon des seuils. 
On peut ajouter des seuils en cliquant sur "Add another stop". Les valeurs des seuils seront calculés automatiquement pour faire des seuils égaux selon le nombre de seuils et les valeurs min et max. Mais ces dernières peuvent bien évidemment être modifiées. Il suffit ensuite de créer soi-même son gradient de couleur pour chaque valeur seuil. 
  
<a href="https://ibb.co/sWQdPNG"><img src="https://i.ibb.co/41MnfXG/couleur.png" alt="couleur" border="0"></a>  

## Mapbox GL
Mapbox GL est une bibliothèque JavaScript libre de cartographie open-source utilisant du WebGL pour l'affichage.

### Installation de la librairie Mapbox GL
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
 ![alt text](https://i.ibb.co/bsC79f0/raster.png)

 #### Extrusion du bâti

Dans le but de visualiser le bâti en 3D, Mapbox propose une <a href="https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/">documentation</a> afin d'extruder le bâti.  
Pour l'exemple, nous avons représenté le bâti de la métropole de Lyon en 3D. En partant de la couche <a href="https://data.grandlyon.com/jeux-de-donnees/volumes-toiture-3d-2015-bati-metropole-lyon/donnees">Volumes de toiture 3D 2015 du bati de la Métropole de Lyon</a> issue de Data Grand Lyon, nous avons appliqué une extrusion de cette donnée vectorielle.  
   
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
<a href="https://ibb.co/LvCYfxv"><img src="https://i.ibb.co/wYKB1SY/bati.png" alt="bati" border="0"></a>

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

#### Pour aller plus loin

* <a href="https://docs.mapbox.com/mapbox-gl-js/example/">Exemples d'utilisation</a> publiés sur le site de Mapbox
* <a href="https://geoviz.sciencesconf.org/data/pages/Atelier_MapboxGL.pdf">ATELIER : Introduction à la bibliothèque JavaScript MapboxGL</a>-Boris Mericskay
