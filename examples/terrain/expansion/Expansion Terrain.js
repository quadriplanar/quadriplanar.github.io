
//global variables for drawing properly
var canvas;
var context;
var width;
var height;

var tiles

//resolution to the grid (close to, but not quite pixels/tile) 
//can be any integer, but keep above 4 or it may take to much resources, no use in going higher than ~40, defualt is 5
var resolution;

//customization options for world gen //TODO add controls to html to adjust these
var seeds; //the number of land tiles seeded for inital generation //any number valid, should be less than what tiles area is
var expandThreshold; //the number of adjacent land tiles to expand land //any number between 0 and 8
var expandChance; //the chance that land will be extended regardless of passing expandThreshold // number between 0 and 1 (inclusive)
var expandTimes; //the number of time to run the expansion loop

function start(){
	
	//sets the values from the HTML input ranges
	setValues();
	
	canvas = document.getElementById("canvas");
	//sets the interior coordinates to allign  with exterior
	canvas.setAttribute("width", document.body.clientWidth);
	canvas.setAttribute("height", document.body.clientHeight);
	context = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	context.font = resolution*1.2+"px Arial";
	
	//the size of the screen divided by the resolution gives the size of the tiles array
	tileWidth = Math.floor(width/resolution);
	tileHeight = Math.floor(height/resolution);

	tiles = [];


	//establish whole grid as water
	for(var i=0; i<tileWidth; i++){
		tiles[i] = [];
		for(var j=0; j<tileHeight; j++){
				tiles[i][j] = "w";
		}
	}
	
	//randomly seeds a number of land tiles in the basic grid
	for(var i=0; i<seeds; i++){
		tiles[rndInt(0, tileWidth)][rndInt(0, tileHeight)] = "g";
	}
	
	
	//extends land masses based on how much adjactent land there is, with a random chance to expand anyway
	for(var t=0; t<expandTimes; t++){
		for(var i=0; i<tileWidth; i++){
			for(var j=0; j<tileHeight; j++){
				if((getSurroundingXCount(i,j, "g") > expandThreshold) || (Math.random() < expandChance)){
					tiles[i][j] = "g"
				}
			}
		}
	}

	//test print of array
	for(var i=0; i<tileWidth; i++){
		for(var j=0; j<tileHeight; j++){
			if(tiles[i][j] == "g"){
				context.fillStyle="#00cc00";
			}else if(tiles[i][j] == "w"){
				context.fillStyle="#0000ff";
			}
			context.fillText(String.fromCharCode(9639), i*resolution , j*resolution );
		}
	}
	document.getElementById("submit").addEventListener("click", function() { start();}, false);

}


//checks the set coords neigbours for how many are water
// x and y are the coordinates of the tile to check the neightbours of
//type is the value to check for (in this program a string of a letter)
function getSurroundingXCount(x, y, type){
		var count =0;
			for(var i =x-1; i <= x+1 ; i++){
				for(var j = y-1; j<= y+1; j++){
					if( i >= 0 && i < tileWidth && j >= 0 && j < tileHeight){
						if( i != x || j != y){
							if(tiles[i][j] == type){
								count ++;
							}
						}
					}else{
						count++;
					}
				}
			}
		return count;
}
	
//returns random interger between min inc and max excl
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//sets all the values for the HTML input
function setValues(){
	resolution = document.getElementById("resolution").value;

	seeds = document.getElementById("seed").value;
	expandThreshold = document.getElementById("threshold").value;
	expandChance = document.getElementById("chance").value; 
	expandTimes = document.getElementById("times").value;

}

window.addEventListener("load", function(){ start();}, false);
