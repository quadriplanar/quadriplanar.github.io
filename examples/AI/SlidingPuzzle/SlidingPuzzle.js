
//global variables

var currentBoard;

var maxMoves;
var size;
var type;


//draws the board to the screen
function drawCurrentBoard(){
	//console.log("the array is currently: "+currentBoard.b);
	var out = document.getElementById("output");
	var newTable = document.createElement("table");
	for(var i =0; i< currentBoard.size; i++){
		var row = document.createElement("tr");
		
		for(var j =0; j < size; j++){
			var cell = document.createElement("td");
			if(currentBoard.b[i][j] != 0){
				cell.innerHTML = currentBoard.b[i][j];	//if the cell is non zero, print the number there
			}else{
				cell.innerHTML = ''; //if its 0 make it blank
			}
			row.appendChild(cell);
		}
		newTable.appendChild(row);
	}	
	
	out.appendChild(newTable);
	out.innerHTML+="</br>";
	//console.log("done printing the board");
}

//counts turns ans process the game
function playGame(){
	var turns =0;
	while(turns < maxMoves){
		
		var index = getNextMove();
		
		//console.log("best score = "+max+" making move: "+index);
		currentBoard.move(index);
		drawCurrentBoard();
		turns++;
		if(currentBoard.checkSolved()){//solved so quick exit
			alert("Solved in "+turns+" moves");
			console.log("Solved in "+turns+" moves");
			break;
		}
	}
	if(turns >= maxMoves){
		alert("timed out after "+turns+" moves");
		console.log("timed out after "+turns+" moves");
	}
	return turns;
}

//helper function run the switch to pick which method to use
function getNextMove(){
	switch(type){ 
		case 0: //look for the next state with the most correct
			return scoreBased();
			break;
		case 1: //move randomly
			return Math.floor(Math.random()*4);
			break;
	}
}

//this method can be modified to try different heuristics for solving the board
function evaluateBoard(possibleBoard){
	//use the creator functions to get a board that is correct and the current size to check against
	var correctBoard = new board(size);
	correctBoard.initializeBoard();
	//this algorithm checks how many tiles are in proper place
	/*
	console.log("looking at arrays:");
	console.log("		"+correctBoard.b);
	console.log("		"+possibleBoard.b);
	*/
	var score = 0;
	
	switch(type){
		case 0:
			for(var i =0; i< possibleBoard.size; i++){
				for(var j =0; j < possibleBoard.size; j++){
					//console.log("comparing: "+correctBoard.b[i][j]+", "+ possibleBoard.b[i][j]);
					if(correctBoard.b[i][j] == possibleBoard.b[i][j]){
						score++;
					}
				}
			}
			break;
	}
	return score;
	
}

//looks at an array of scored options and chooses the next best to proceed to
function scoreBased(){
	var moves = currentBoard.enumerateMoves();
	var scores = [];
	for(var i=0; i<moves.length; i++){
		if(moves[i]){ //if its defined
			scores[i] = evaluateBoard(moves[i]);
		}
	}
	
	//find the best score in the array, then use that move
	var max =evaluateBoard(currentBoard);
	var index=-1;
	for(var i=0; i<scores.length; i++){
		if(scores[i]>max){
			max=scores[i];
			index=i;
		}
	}
	if(index==-1){
		//nothing better so make a random move
		//console.log("no better option so will take a random move");
		index = Math.floor(Math.random()*4);
	}
	return index;
}

//when submitted, reads in the value and starts the processing
function start(){
	size = document.getElementById("size").value;
	maxMoves = document.getElementById("maxMoves").value;
	type = Number(document.getElementById("type").value);

	document.getElementById("output").innerHTML = '';

	currentBoard = new board(size);
	currentBoard.initializeBoard();
	currentBoard.shuffleBoard();
	drawCurrentBoard();
	playGame();
	
}

function load(){
	document.getElementById("submit").addEventListener("click", function() { start();}, false);
}

window.addEventListener("load", load, false);
