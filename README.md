# Utilisation de Mapbox pour visualiser le bâti de Lyon en 3D
Bastien Castello et Léopold Robitaille

## Mapbox Studio

## Mapbox GL
Mapbox GL est une bibliothèque JavaScript libre de cartographie open-source utilisant du WebGL pour l'affichage.

### Instalation de la librairie Mapbox GL
Pour commencer à utiliser Mapbox GL, après vous êtes crée un compte Mapbox, vous devez ouvrir un éditeur de code comme Visual Studio Code par exemple.
Il y a ensuite deux solutions pour intégrer la bibliothèque Mapbox GL :
  1. Soit directement inclure les références des fichiers Javascript et CSS dans le `head` de votre html
 
<script src='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet'/>
  
  2. Télcharger les packages Mapbox GL depuis node.js avec la ligne suivante : npm install --save mapbox-gl. Puis ajouter dans votre fichier html le css suivant : 
href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet'


<link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />
