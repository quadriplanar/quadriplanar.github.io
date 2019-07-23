

function board(size){
	
	this.size = size;
	//the array that represents the board
	this.b = [];
	
	//keeps track of the coordinates of the empty tile
	var empty = [-1,-1];

	
	//creates the board by filling the array, will be in solved state
	this.initializeBoard = function(){
		for(var i =0; i< size; i++){
			var row = [];
			
			for(var j =0; j < size; j++){
				row.push(i*size+j);
				if(i*size+j == 0){
					empty = [i,j];
				}
			}
			this.b.push(row);
		}
		//console.log("board was created");
	}
	
	//create a new board object that is deepcopied from an array of an existing board, used for the heuristic solving to look at next moves
	this.importBoard = function(b){
		for(var i =0; i< size; i++){
			var row = [];
			for(var j =0; j < size; j++){
				row.push(b[i][j]);
				if(b[i][j] == 0){
					empty = [i,j];
				}
			}
			this.b.push(row);
		}
	}
	
	//shuffles the board according to the game rules, thus the game must be solvable
	this.shuffleBoard = function(){
		for(var i=0; i<this.size*10; i++){ //this.size*10
			this.shuffle();
		}
		//console.log("a board was shuffled");
	}

	//helper method, swaps a cell and the empty cell. does not check for adjacency this should be done in calling function
	this.swap = function(target){
		//console.log(target); //allow this and it will prints the moves that it uses to shuffle the board
		this.b[empty[0]][empty[1]] = (this.b[target[0]])[target[1]];
		this.b[target[0]][target[1]]=0;

		//reassigns the the global array that tracks the empty space
		empty = target;

	}
	
	//performs a move on the board, check the adjacency so will not perform invalid moves
	this.move = function(moveID){
		switch(moveID){ 
			case 0:
				if(empty[0]-1 >= 0){
					this.swap([empty[0]-1, empty[1]]);
				}
				break;
			case 1:
				if(empty[0]+1 < size){
					this.swap([empty[0]+1, empty[1]]);
				}
				break;
			case 2:
				if(empty[1]-1 >= 0){
					this.swap([empty[0], empty[1]-1]);
				}
				break;

			case 3:
				if(empty[1]+1 < size){
					this.swap([empty[0], empty[1]+1]);
				}
				break;
		}
		
		
	}

	//helper method to shuffle. it calls move so the rules are checked, each call attempts 1 move at random
	this.shuffle = function(){
		var ran = Math.floor(Math.random()*4)
		//console.log(ran);
		this.move(ran);
	}
	
	//checks if the board is solved
	this.checkSolved = function(){
		//use the creator functions to get a board that is correct and the current size to check against
		var correctBoard = new board(this.size);
		correctBoard.initializeBoard();
		
		for(var i =0; i< this.size; i++){
			for(var j =0; j < this.size; j++){
				if(correctBoard.b[i][j] != this.b[i][j]){
					return false;
				}
			}
		}	

		return true;
	}
	
	//returns an array containing up to 4 copies of the current board (as new board objects), each with a different possible move played
	//this is for use my the external heuristics that will solve the puzzle
	this.enumerateMoves = function(){
		var moves =[];
		if(empty[0]-1 >= 0){
			var m1 = new board(this.size);
			m1.importBoard(this.b.slice());
			m1.swap([empty[0]-1, empty[1]]);
			moves[0] = m1;
		}
		if(empty[0]+1 < size){
			var m2 = new board(this.size);
			m2.importBoard(this.b.slice());
			m2.swap([empty[0]+1, empty[1]]);
			moves[1] = m2;
		}
		if(empty[1]-1 >= 0){
			var m3 = new board(this.size);
			m3.importBoard(this.b.slice());
			m3.swap([empty[0], empty[1]-1]);
			moves[2] = m3;
		}
		if(empty[1]+1 < size){
			var m4 = new board(this.size);
			m4.importBoard(this.b.slice());
			m4.swap([empty[0], empty[1]+1]);
			moves[3] = m4;
		}
		return moves;
	}
	
}
