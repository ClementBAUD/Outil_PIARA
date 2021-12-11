//Initilisation de la carte
//Creation couche Leaflet contenant les troncons
var LayerTroncon = L.layerGroup(TableauTroncon);
//Creation de la map Leaflet
var carte = L.map('maCarte',{ zoomControl:false }, {
					layers: [LayerTroncon]
			})
			.setView([45.548, 4.946], 8);
//Gestion du click en dehors des tronçons (donc sur la carte)
carte.on('click', onMapClick);
function onMapClick(e) {
	//Pas de tronçon sélectionné
    Global = -1;
    //Pas d'information à donner
    document.getElementById("info").innerHTML = "Cliquez sur un tronçon pour afficher ses informations";
    //Radion button par défaut à niveau de restriction 0
    document.getElementById('Niveau0').checked = true;
}

//Creation des différentes variables pour les cartes 
var CarteOpenstreetmap = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
       ArcGIS = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
    CarteOpenstreetmap2 = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
////////////////////////////////////////////////////////////////////////////

//Creation variable attribution des cartes
var attribu = 'données @<a href="//osm.org/copyright">OpenStreetMap</a>/ODbl - rendu <a href="//openstreetmap.fr">OSM France</a>'
////////////////////////////////////////////////////////////////////////////

//Chargement des tuiles OpenStreetMap des différentes cartes
var myTileLayer = L.tileLayer(ArcGIS, {
 	attribution : attribu ,
	minZoom : 8,
	maxZoom : 19,
}).addTo(carte),

myTileLayer2 = L.tileLayer(CarteOpenstreetmap, {
 	attribution : attribu ,
	maxZoom : 19,
}),

myTileLayer3 = L.tileLayer(CarteOpenstreetmap2, {
 	attribution : attribu ,
	minZoom : 8,
	maxZoom : 19,
});
////////////////////////////////////////////////////////////////////////////   

//Ajout de la variable scale permettant de mettre l'échelle en bas de la carte
var scale = L.control.betterscale({
	metric: true, 
	imperial: false
}).addTo(carte);
////////////////////////////////////////////////////////////////////////////

//Ajout variable permettant d'afficher la carte en semi plein écran
var zoomFS = new L.Control.ZoomFS();
// add custom zoom control
carte.addControl(zoomFS);
// 2 evenement : plein écran et sorti du plein écran
//Plein écran
carte.on('enterFullscreen', function() {
	if (window.console) window.console.log('Plein écran');
});

carte.on('exitFullscreen', function() {
	if (window.console) window.console.log('Sorti du plein écran');
});

///////////////////////////////////////////////////
////////////////fonction icon//////////////////////
///////////////////////////////////////////////////
////////////////////////////////////////////////////
function IconCustomCol (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'icon/Black_triangle2.svg',
    iconSize:     [35, 35], // Largeur et hauteur de l'icon en pixel
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

function IconCustomNeige (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'icon/flocon.png',
    iconSize:     [35, 35], // Largeur et hauteur de l'icon en pixel
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

function IconCustomRampe (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'icon/Rampe.png',
    iconSize:     [30, 30], // Largeur et hauteur de l'icon en pixel
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

function IconCustomJonction (feature, latlng) {
  let myIcon = L.icon({
    iconUrl: 'icon/Croix.png',
    iconSize:     [35, 35], // Largeur et hauteur de l'icon en pixel
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  return L.marker(latlng, { icon: myIcon })
}

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

//Fonction pour le style des secteurs
function StyleAnnexe (feature){
	if (feature.properties.num == 1 || feature.properties.num == 2 || feature.properties.num == 3 || feature.properties.num == 4 || feature.properties.num == 5 || feature.properties.num == 6) {
		return {"color":"RED", "weight":3, "height":3, "fillOpacity":0.2};
	}
	else if (feature.properties.num == 17 || feature.properties.num == 16 || feature.properties.num == 11) {
		return {"color":"purple", "weight":3, "height":3, "fillOpacity":0.2};
	}
	else if (feature.properties.num == 13 || feature.properties.num == 14 || feature.properties.num == 15 || feature.properties.num == 12) {
		return {"color":"LIME", "weight":3, "height":3, "fillOpacity":0.2};
	}
	else {
		return {"weight":3, "height":3, "fillOpacity":0.2};
	}
}
/////////////////////////////////////////////////////

//Fonction pour le style des gestionnaire
function StyleGestionnaire (feature){
	if (feature.properties.GESTIONNAI == "APRR - PC Central Dijon") {
		return {"color":"#0F2BB3", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "AREA - PC Cesar") {
		return {"color":"#278BB4", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "ASF - PC Brive") {
		return {"color":"BROWN", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "ASF - PC Valence") {
		return {"color":"RED", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "ATMB - PC Sierra") {
		return {"color":"PURPLE", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "SFTRF - PC Césam") {
		return {"color":"PINK", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Genas") {
		return {"color":"ORANGE", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Gentiane") {
		return {"color":"#B45527", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Guéret") {
		return {"color":"GREEN", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Hyrondelle") {
		return {"color":"YELLOW", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Moulins") {
		return {"color":"#DB6228", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR CE - PC Osiris") {
		return {"color":"#B30976", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR MC - PC Issoire") {
		return {"color":"#DB6228", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "DIR MED - PC Gap") {
		return {"color":"#7CDB28", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "Métroppole") {
		return {"color":"BLACK", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else if (feature.properties.GESTIONNAI == "BPNL") {
		return {"color":"#1001AA", "weight":2, "height":2, "fillOpacity":1, "opacity":1};
	}
	else{
		return {"color":"LIME", "weight":2, "height":2, "fillOpacity":3, "opacity":3};
	}
} 

///////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////


	//Tableau regroupant les tronçons avec des variables dans le fichier geojson.js
var TableauTroncon = 
	[path1_1,  path1_2,  path2_1,  path2_2,  path3_1,  path3_2,  path4_1,  path4_2,  path5_1,  path5_2, 
	 path6_1,  path6_2,  path7_1,  path7_2,  path8_1,  path8_2,  path9_1,  path9_2,  path10_1, path10_2, 
	 path11_1, path11_2, path12_1, path12_2, path13_1, path13_2, path14_1, path14_2, path15_1, path15_2,
	 path16_1, path16_2, path17_1, path17_2, path18_1, path18_2, path19_1, path19_2, path20_1, path20_2, 
	 path21_1, path21_2, path22_1, path22_2, path23_1, path23_2, path24_1, path24_2, path25_1, path25_2, 
	 path26_1, path26_2, path27_1, path27_2, path28_1, path28_2, path29_1, path29_2, path30_1, path30_2, 
	 path31_1, path31_2, path32_1, path32_2, path33_1, path33_2, path34_1, path34_2, path35_1, path35_2, 
	 path36_1, path36_2, path37_1, path37_2, path38_1, path38_2, path39_1, path39_2, path40_1, path40_2, 
	 path41_1, path41_2, path42_1, path42_2, path43_1, path43_2, path44_1, path44_2, path45_1, path45_2, 
	 path46_1, path46_2, path47_1, path47_2, path48_1, path48_2, path49_1, path49_2, path50_1, path50_2, 
	 path51_1, path51_2, path52_1, path52_2, path53_1, path53_2, path54_1, path54_2, path55_1, path55_2, 
	 path56_1, path56_2, path57_1, path57_2, path58_1, path58_2, path59_1, path59_2, path60_1, path60_2, 
	 path61_1, path61_2, path62_1, path62_2, path63_1, path63_2, path64_1, path64_2, path65_1, path65_2,
	 path66_1, path66_2, path67_1, path67_2, path68_1, path68_2, path69_1, path69_2, path70_1, path70_2, 
	 path71_1, path71_2, path72_1, path72_2, path73_1, path73_2, path74_1, path74_2, path75_1, path75_2, 
	 path76_1, path76_2, path77_1, path77_2, path78_1, path78_2, path79_1, path79_2, path80_1, path80_2, 
	 path81_1, path81_2, path82_1, path82_2, path83_1, path83_2, path84_1, path84_2, path85_1, path85_2]

//Variable globale
//No de troncon selectionné dans carte
var Global = -1;
	
//Couche leaflet des cartes
var baseLayers = {
	"carte": myTileLayer,
	"Carte Détaillé": myTileLayer2,
	"Carte Basique": myTileLayer3
 };
/////////////////////////////////////////////////////


//Creation couche Leaflet département
var LayerDepartements = L.geoJSON(departement, { //departement - > nom variable dans le fichier data_js/dptARAgeojson.js
	style: {"color":"BLACK"},
	onEachFeature: function (feature, LayerDepartements) {
		var popupContent = "Départements : " + feature.properties.nom + "</br>Num : " + feature.properties.code ;
		if (LayerDepartements.on('click', function (e) {return feature.properties.nom;}))
		LayerDepartements.bindPopup(popupContent);
	}
});
/////////////////////////////////////////////////////

//Creation couche Leaflet extrémités des tronçons
var LayerExtremiteTroncon = L.geoJSON(point,  { //point -> nom variable dans le fichier data_js/extremiteTronconGeojson.js
	//Pour chaque élément de la couche : des points
	onEachFeature: function (feature, LayerExtremiteTroncon) {
		var popupContent = feature.properties.Nom_extrem;
		if (LayerExtremiteTroncon.on('click', function (e) {return feature.properties.Nom_extrem;}))
		LayerExtremiteTroncon.bindPopup(popupContent);
	},
	pointToLayer: IconCustomJonction,
});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour les cols,
var LayerColNeige = L.geoJSON(colNeige,{ //colNeige -> nom variable dans le fichier data_js/colRampeNeige.js
	//Pour chaque élément de la couche : des points
	onEachFeature: function (feature, LayerColNeige) {
		var popupContent = feature.properties.Etiquette + "<br>" + "Altitude : " + feature.properties.altitude_s + " m";
		if (LayerColNeige.on('click', function (e) {return feature.properties;}))
			LayerColNeige.bindPopup(popupContent);
	},
	pointToLayer: IconCustomCol, // fonction style cols
});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour les secteur enneigé
var LayerSecteurNeige = L.geoJSON(SecteurNeige,  { //SecteurNeige -> nom variable dans le fichier data_js/colRampeNeige.js
	//Pour chaque élément de la couche : des points
	onEachFeature: function (feature, LayerSecteurNeige) {
		var popupContent = feature.properties.Etiquette;
		if (LayerSecteurNeige.on('click', function (e) {return feature.properties;}))
		LayerSecteurNeige.bindPopup(popupContent);
	},
	pointToLayer: IconCustomNeige,
});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour les rampes
var LayerRampe = L.geoJSON(Rampe,  {
	//Pour chaque élément de la couche : des points
	onEachFeature: function (feature, LayerRampe) {
		var popupContent = feature.properties.Etiquette;
		if (LayerRampe.on('click', function (e) {return feature.properties;}))
		LayerRampe.bindPopup(popupContent);
	},
	pointToLayer: IconCustomRampe,
});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour les tunnels
var LayerTunnel = L.geoJSON(tunnel,  {
	//Pour chaque élément de la couche : des points
	style: {"color":"YELLOW", "weight":6, "height":6},
	onEachFeature: function (feature, LayerTunnel) {
		var popupContent = "Tunnel de/du : " + feature.properties.nom_voie_g;
		if (LayerTunnel.on('click', function (e) {return feature.properties;}))
		LayerTunnel.bindPopup(popupContent);
	},
});
/////////////////////////////////////////////////////


//Creation couche Leaflet pour les secteurs piara
	var LayerSecteurPiara = L.geoJSON(Secteur,  {
		//Pour chaque élément de la couche : des points
		style : StyleAnnexe,
		onEachFeature: function (feature, LayerSecteurPiara) {
			var popupContent = feature.properties.nom_secteu + "<br>" + feature.properties.reference_;
			if (LayerSecteurPiara.on('click', function (e) {return feature.properties;}))
			LayerSecteurPiara.bindPopup(popupContent);
		}
	});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour le secteur annexe
var LayerTronconAnnexe = L.geoJSON(Route_Annexe,  {
	//Pour chaque élément de la couche : des points
	style: {"color":"green", "weight":3, "height":3},
	onEachFeature: function (feature, LayerTronconAnnexe) {
		var popupContent = "route : " + feature.properties.ROUTE;
		if (LayerTronconAnnexe.on('click', function (e) {return feature.properties.ROUTE;}))
		LayerTronconAnnexe.bindPopup(popupContent);
	},
});
/////////////////////////////////////////////////////

//Creation couche Leaflet pour les gestionnaire et leur couleur
var LayerCouleurGestionnaire = L.geoJSON(route,  {
	//Pour chaque élément de la couche : des points
	style : StyleGestionnaire,
	onEachFeature: function (feature, LayerCouleurGestionnaire) {
		var popupContent = feature.properties.GESTIONNAI;
		if (LayerCouleurGestionnaire.on('click', function (e) {return feature.properties;}))
		LayerCouleurGestionnaire.bindPopup(popupContent);
	}
});
/////////////////////////////////////////////////////

//Couche leaflet pour avoir les differents layer sur notre carte
var overlayMaps = {
	"Départements": LayerDepartements,
    "Jonction tronçon": LayerExtremiteTroncon,
    "Cols": LayerColNeige,
    "Secteur Enneigé": LayerSecteurNeige,
    "Rampe": LayerRampe,
    "Tunnel": LayerTunnel,
    "Secteur Piara": LayerSecteurPiara,
    "Tronçon annexe": LayerTronconAnnexe,
    "Gestionnaire": LayerCouleurGestionnaire
};
/////////////////////////////////////////////////////

//Controle des couches de base (baseLayers) et optionnelles (overlayMaps)
L.control.layers(baseLayers, overlayMaps).addTo(carte);
/////////////////////////////////////////////////////

//Construction fonction modificationStyle() qui modifie les attributs de la structure style en fonction du niveau de restriction
function modificationStyle(LvlRestriction) {
	//Pas de restriction : style de base
	if (LvlRestriction == 0) {
		//modification des attributs de la structure style
		return {color: "BLUE", fillColor: "BLUE", weight: 1, opacity: 3, fillOpacity: 0.7};
	}
	//Restriction 1 : style interdition PL
	else if (LvlRestriction == 1) {
		return {color: "ORANGE", fillColor: "ORANGE", weight: 1, opacity: 3, fillOpacity: 0.7};
	}
	//Restriction 2 : style interdition TV
	else if (LvlRestriction == 2) {
		return {color: "RED", fillColor: "RED", weight: 1, opacity: 3, fillOpacity: 0.7};
	}
}


//Construction fonction yourOnEachFeatureFunction()
function yourOnEachFeatureFunction(feature,layer){
	//feature 			= couche Leaflet geoJson en construction
	//LvlRestriction  	= niveau de restriction {0; 1; 2}
	//Définition chaine de caracère "popupContent2"
var popupContent = "<p> Tronçon: " + feature.properties.NOTRONCON + "." + feature.properties.SENS + "<br>" +
					"[" + feature.properties.DE + " ; " + feature.properties.A + "]<br>" +
					"[" + feature.properties.DEVILLE + " ; " + feature.properties.AVILLE + "]<br>" + 
					"Département : " + feature.properties.CODE_DPT + "<br>" +
					"Route : " + feature.properties.ROUTE + "<br>" + 
					"Gestionnaire : " + feature.properties.gestionnaire + "<br>" +
					"Niveau de restriction : " + feature.properties.NiveauRestriction +"</p>";
		
	//Gestion du click sur la couches Leaflet contenue dans le tableau tableauLayerTroncon
	if (layer.on('click', function (e) {
		//Initialise la variable "Global" au no id de la couche clickée
		Global = feature.properties.id;
		//Initialise la variable "IndiceTroncon" au no tronçons -1 (par rapport indice Tableau) de la couche clickée
		IndiceTroncon = feature.properties.NOTRONCON - 1;
		//Condition pour savoir le sens du troncon à l'aide d'une variable SensIndiceTroncon
		if (feature.properties.SENS == 1) {
			SensIndiceTroncon = 1;
		}
		else {
			SensIndiceTroncon = 2;
		}
		//Affichage des infos dans la console
		console.log(Global);
		console.log(IndiceTroncon);
		console.log(SensIndiceTroncon);
		//Affichage de certains attributs de la couche Leaflet clickée dans l'encart "info"
		var infoPanneau = document.getElementById("info");
		infoPanneau.innerHTML = "<p> Tronçon: " + feature.properties.NOTRONCON + "." + feature.properties.SENS + "<br>" +
								"[" + feature.properties.DE + " ; " + feature.properties.A + "]<br>" + 
								"Route : " + feature.properties.ROUTE + "</p>";
		//Mise à jour des radio button
		if(feature.properties.NiveauRestriction == 0){
			document.getElementById('Niveau0').checked = true;
		} else if(feature.properties.NiveauRestriction == 1) {
			document.getElementById('Niveau1').checked = true;
		} else {
			document.getElementById('Niveau2').checked = true;
		}
		//Retour fonction
		return feature.properties;
	}))
	//Construction de la popup de la couche Leaflet clickée 
	layer.bindPopup(popupContent);
};


//Construction du tableau de 170 couches à partir d'objet geoJSON = 1 tronçon
//Fonction onEachFeature = yourOnEachFeatureFunction
var tableauLayerTroncon = new Array();
for (let i = 0 ; i < 170 ; i++) {
	TableauTroncon[i].properties.NiveauRestriction = 0;
	tableauLayerTroncon[i] = L.geoJSON(TableauTroncon[i], {
		onEachFeature: yourOnEachFeatureFunction,
		style : modificationStyle(TableauTroncon[i].properties.NiveauRestriction) 
	});
	tableauLayerTroncon[i].addTo(carte);
};

//Gestion du click qui applique le niveau de restriction des radio bouton permettant d'appliquer le style et remplir le tableau
document.getElementById("LeBoutton").addEventListener("click", function(layer) {
	//Si radion bouton NIveau0 sélectionné
	if (document.getElementById('Niveau0').checked) {
		if (SensIndiceTroncon == 1) {
			Ligne5[IndiceTroncon] = "";
			Ligne6[IndiceTroncon] = "";
		}
		else {
			Ligne7[IndiceTroncon] = "";
			Ligne8[IndiceTroncon] = "";
		}
		//document.getElementById("test").innerHTML = ""
		//document.getElementById("test2").innerHTML = ""  
		//Affichage du niveau de restriction à appliquer dans consol
		console.log("Le niveau de restriction est le 0, couleur: vert");
		//Suppression de la couche Leaflet sélectionée sur la carte par un click
		//Global 				: no Id de la couche sélectionnée
		//tableauLayerTroncon[] : tableau des couches, chacun ayant un tronçon
		//Suprresion de l'ancien tronçon
		carte.removeLayer(tableauLayerTroncon[Global]);		
		//Recontruction de la couche mise à jour avec le troncon geoJson sélectionné et ajout sur la carte
		TableauTroncon[Global].properties.NiveauRestriction = 0 ;
		tableauLayerTroncon[Global] = L.geoJSON(TableauTroncon[Global], {
			onEachFeature: yourOnEachFeatureFunction,
			style : modificationStyle(0),
		}).addTo(carte);
		//Affichage dans consol
		CreationTableau(text);
		console.log(tableauLayerTroncon[Global]);
	}
	//Si radion bouton Niveau1 sélectionné
	else if (document.getElementById('Niveau1').checked) {
		//document.getElementById("test").innerHTML = "X"
		if (SensIndiceTroncon == 1) { 
			Ligne5[IndiceTroncon] = "X";
			Ligne6[IndiceTroncon] = "";
		}
		else {
			Ligne7[IndiceTroncon] = "X";
			Ligne8[IndiceTroncon] = "";
		}
		//Affichage du niveau de restriction à appliquer dans consol
		console.log("Le niveau de restriction est le 1, couleur: orange");
		//Suppression de la couche Leaflet sélectionée sur la carte par un click
		carte.removeLayer(tableauLayerTroncon[Global]);
		//Recontruction de la couche mise à jour avec le troncon geoJson sélectionné et ajout sur la carte
		TableauTroncon[Global].properties.NiveauRestriction = 1 ;
		tableauLayerTroncon[Global] = L.geoJSON(TableauTroncon[Global],{
			onEachFeature: yourOnEachFeatureFunction,
			style : modificationStyle(1),
		}).addTo(carte);
		//Affichage dans consol
		CreationTableau(text);
		console.log(tableauLayerTroncon[Global]);
	}
	//Si radion bouton NIveau2 sélectionné
	else {
		//Affichage du niveau de restriction à appliquer dans consol
		if (SensIndiceTroncon == 1) { 
			Ligne5[IndiceTroncon] = "";
			Ligne6[IndiceTroncon] = "X";
		}
		else {
			Ligne7[IndiceTroncon] = "";
			Ligne8[IndiceTroncon] = "X";
		}
		console.log("Le niveau de restriction est le 2, couleur: rouge");
		//document.getElementById("test").innerHTML = "" 
		//document.getElementById("test2").innerHTML = "X" 
		//Suppression de la couche Leaflet sélectionée sur la carte par un click
		carte.removeLayer(tableauLayerTroncon[Global]);
		//Recontruction de la couche mise à jour avec le troncon geoJson sélectionné et ajout sur la carte
		TableauTroncon[Global].properties.NiveauRestriction = 2 ;
		tableauLayerTroncon[Global] = L.geoJSON(TableauTroncon[Global], {
			onEachFeature: yourOnEachFeatureFunction,
			style : modificationStyle(2),
		}).addTo(carte);
		//Affichage dans consol
		CreationTableau(text);
		console.log(tableauLayerTroncon[Global]);
	}
}); 



function nav(){
	document.getElementById("nav").innerHTML = '<a href="#titre" onclick="nav2()" id="nav2">Consulter la carte</a><br>';
}

function nav2(){
	document.getElementById("nav2").innerHTML = '<a href="#Redirect" onclick="nav()" id="nav">Cjfjf avec les restriction</a><br>';
}




var sizeMode = "";

function View_Piara(){
	if (document.getElementById('defaut').selected) {
	carte.setView([45.548, 4.946], 8);
	console.log("defaut");
	}
	else if (document.getElementById('Piara0').selected) {
	carte.setView([45.548, 4.946], 8);
	console.log("Piara0");
	Secteur = 0;
	sizeMode = "Paysaezezzege";
	}
	else if (document.getElementById('Piara1').selected) {
	carte.setView([46.041924503228365, 6.323311269978301], 10);
	console.log("Piara1");
	Secteur = 1;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara2').selected) {
	carte.setView([45.935957321798845, 6.527107831395113], 10);
	console.log("Piara2");
	Secteur = 2;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara3').selected) {
	carte.setView([45.64933821287222, 6.0077925544241575], 10);
	console.log("Piara3");
	Secteur = 3;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara4').selected) {
	carte.setView([45.56086308858358, 5.442476532876619], 10);
	console.log("Piara4");
	Secteur = 4;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara5').selected) {
	carte.setView([45.38868390901506, 6.25317156943637], 10);
	console.log("Piara5");
	Secteur = 5;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara6').selected) {
	carte.setView([45.27220326718539, 5.510989581018126], 10);
	console.log("Piara6");
	Secteur = 6;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara7').selected) {
	carte.setView([45.18062406133014, 4.8697625232616515], 10);
	console.log("Piara7");
	Secteur = 7;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara8').selected) {
	carte.setView([44.7552033038002, 4.7932851785063875], 10);
	console.log("Piara8");
	Secteur = 8;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara9').selected) {
	carte.setView([45.77814943687401, 4.906649153037829], 10);
	console.log("Piara9");
	Secteur = 9;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara10').selected) {
	carte.setView([45.59939445095396, 4.2094404571831765], 10);
	console.log("Piara10");
	Secteur = 10;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara11').selected) {
	carte.setView([45.96191861673005, 4.208477182288405], 10);
	console.log("Piara11");
	Secteur = 11;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara12').selected) {
	carte.setView([45.87694116820978, 3.5954480439664445], 10);
	console.log("Piara12");
	Secteur = 12;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara13').selected) {
	carte.setView([46.1381326312654, 2.873499433779933], 10);
	console.log("Piara13");
	Secteur = 13;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara14').selected) {
	carte.setView([45.817030742125354, 3.0094552348467016], 10);
	console.log("Piara14");
	Secteur = 14;
	sizeMode = "A4Landscape";
	}
	else if (document.getElementById('Piara15').selected) {
	carte.setView([45.33334923485879, 3.2717395690783433], 10);
	console.log("Piara15");
	Secteur = 15;
	sizeMode = "A4Portrait";
	}
	else if (document.getElementById('Piara16').selected) {
	carte.setView([46.40954724735813, 3.458029289861448], 10);
	console.log("Piara16");
	Secteur = 16;
	sizeMode = "A4Landscape";
	}
	else {
	carte.setView([44.92498330823665, 3.993895829651567], 10);
	console.log("Piara17");
	Secteur = 17;
	}
	console	.log(Secteur);
	console.log(sizeMode);
	return sizeMode & Secteur;
}

