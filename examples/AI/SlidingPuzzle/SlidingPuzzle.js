
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

function getNextMove(){
	switch(type){ 
		case 0:
		case 2:
			return scoreBased();
			break;
		case 1: //move randomly
			return Math.floor(Math.random()*4);
			break;
	}
}

//this method can be added to try different heuristics for solving the board
function evaluateBoard(possibleBoard){
	//use the creator functions to get a board that is correct and the current size to check against
	var correctBoard = new board(size);
	correctBoard.initializeBoard();
	
	var score = 0;
	
	switch(type){
		//simply checks how many tiles are in the proper place (worst =0, best =size^2)
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
		//checks how many moves each tile is away from proper but simplifies by disregarding the need to only slide into the empty position. number of moves is inverted so that higher score is less moves
		case 2:
			for(var i =0; i< possibleBoard.size; i++){
				for(var j =0; j < possibleBoard.size; j++){
					var x=possibleBoard.b[i][j];
					var properI=-1;
					for(var k=0;k< correctBoard.size; k++){ //find which board row the current tile SHOULD be in
						if(correctBoard.b[k].includes(x)){
							properI=k;
						}
					}
					var properJ=x-properI*correctBoard.size; // since board is created using x=i*s+j then j=x-i*s
					score+=Math.abs(i-properI);
					score+=Math.abs(j-properJ);
				}
			}		
			score = size*size*size*size-score; // inverts the score and keeps it positive
			break;
	}
	return score;
	
}

function scoreBased(){
	var moves = currentBoard.enumerateMoves();
	var scores = [];
	for(var i=0; i<4; i++){
		if(moves[i]){ //if its defined
			scores[i] = evaluateBoard(moves[i]);
		}
	}
	
	//find the best score in the array, then use that move
	var max =evaluateBoard(currentBoard);
	var index=-1;
	for(var i=0; i<4; i++){
		if(scores[i]>max){
			max=scores[i];
			index=i;
		}
	}
	if(index==-1){
		//nothing better so make a random move
		console.log("no better option so will take a random move");
		index = Math.floor(Math.random()*4);
	}
	return index;
}

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
