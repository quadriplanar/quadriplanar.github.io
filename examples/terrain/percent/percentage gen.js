
//global variables for drawing properly
var canvas;
var context;
var width;
var height;

var slider;
var seeds;

var tiles;


function start(){
	canvas = document.getElementById("canvas");
	//sets the interior coordinates to allign  with exterior
	canvas.setAttribute("width", document.body.clientWidth);
	canvas.setAttribute("height", document.body.clientHeight);
	context = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	context.font = "12px Arial";
	
	//get the slider value from the html
	slider = document.getElementById("percent");
	
	//TODO currently hardcoaded for tile size of 10
	tileWidth = Math.floor(width/10);
	tileHeight = Math.floor(height/10);
	
	//calculates seeds as percentage from slider,
	//note 100 won't be full land as the the locations are chosen randomly and there will be some repeats
	seeds = (tileWidth*tileHeight)*(slider.value/100);

	tiles = [];


	//establish whole grid as water or "w"
	for(var i=0; i<tileWidth; i++){
		tiles[i] = [];
		for(var j=0; j<tileHeight; j++){
				tiles[i][j] = "w";
		}
	}
	
	
	//uses rndInt function(defined below) to pick random tiles to turn into a ground or "g" tile
	for(var i=0; i<seeds; i++){
		tiles[rndInt(0, tileWidth)][rndInt(0, tileHeight)] = "g";
	}
	

	//prints the array tiles as a simple characters and color codes them for better visuals
	for(var i=0; i<tileWidth; i++){
		for(var j=0; j<tileHeight; j++){
			if(tiles[i][j] == "g"){
				context.fillStyle="#00cc00";
			}else if(tiles[i][j] == "w"){
				context.fillStyle="#0000ff";
			}
			//justs uses basic ascii for now
			context.fillText(String.fromCharCode(9639), i*10 + 10, j*10 + 10);
		}
	}
	//adds even listeners to track input on the slider and submit button
	slider.addEventListener("click", function() { document.getElementById("value").innerHTML = slider.value; }, false);
	document.getElementById("submit").addEventListener("click", function() { start();}, false);
}
	
//returns random interger between min inc and max excl
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


window.addEventListener("load", function(){ start();}, false);
