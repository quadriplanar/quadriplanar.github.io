

//global variables

//can change to make puzzle squares of different sizes
const size = 4;

//the [x,y] position of the empty space, initialized to an out of ragne place
var empty = [-1, -1];



function createBoard(){

	var tbody = document.getElementById("boardBody");
	var queue = randomOrder();
	for(var i =0; i< size; i++){
		var row = document.createElement("tr");
		
		for(var j =0; j < size; j++){
			var cell = document.createElement("td");
			//the numbers on the end are cartesian coordinates for the cell location
			//example for default size: the top left cell is cell00, but the top right cell is cell30
			cell.setAttribute("id", "cell"+j+i);
			//set the text of the cell to one of our numbers
			var number = queue.shift();
			if( number != 0){
				cell.innerHTML = number;	
			} else{
				//initialize the tracker for the empty space
				empty[0] = j;
				empty[1] = i;
			}
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
	document.getElementById("board").addEventListener("click", processClick, false);
}

function processClick( e){
	if(e.target.tagName.toLowerCase() == "td"){
		var current = processCellID(e.target.getAttribute("id"));
		//window.alert("You clicked: ["+current[0]+", "+current[1]+"], the empty is: ["+empty[0]+", "+empty[1]+"]");
		//test if the clicked cell was directly adjacent to the currently empty cell
		if( ((current[0] == empty[0]) && ( (current[1] == empty[1]-1) || (current[1]-1 == empty[1]))) ||
			((current[1] == empty[1]) && ( (current[0] == empty[0]-1) || (current[0]-1 == empty[0]))) ){
				
				//since this cell is adjacent with the empty, switch their text
				var emptyCell = document.getElementById("cell"+empty[0]+empty[1]);
				var currCell = e.target;
				
				//also update the new empty position
				empty[0] = current[0];
				empty[1] = current[1];
				//window.alert("the new empty is "+empty[0]+" "+empty[1]);
				
				emptyCell.innerHTML = currCell.innerHTML;
				currCell.innerHTML = "";
		}else{
			window.alert("You must click on a cell adjacent to the blank one");
		}
			
	} 
}


//makes an array (to be used as a queue) of the numbers 1 to 15 in a random order
function randomOrder(){
	var queue = [];
	var bucket = [];
	
	//fills the bucket with the ordered numbers
	for(var i = 0; i < size*size; i++){
		bucket.push(i);
	}
	
	//uses random to select random numbers from the bucket and put into the queue
	for(var i=0; i<size*size; i++){
		//select a random spot item in the bucket
		var n = Math.floor(Math.random() * bucket.length);
		//splice that element out and put it in the queue
		queue.push(bucket.splice(n, 1)[0]);
	}
	return queue;
}

//process the cellji that is the id of a cell, and returns aan array [j, i] to work with
function processCellID(id){
	var arr = [-1, -1];
	arr[0] = id.charAt(4);
	arr[1] = id.charAt(5);
	return arr;
}


function start(){
	createBoard();
}


window.addEventListener("load", start, false);
