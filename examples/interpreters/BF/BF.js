var memory;
var pointer;

//if not at the 0th spot in the memory array, move the pointer left
function left(){
	if(pointer !=0){
		pointer--;
	}	
}

//move the pointer to the right, if its at the end of the current array puch a 0 onto it
function right(){
	if(pointer == memory.length-1){
		memory.push(0);	
	}
	pointer++;

}

//+1 to the memory location being pointed at
function plus(){
	memory[pointer]++;
}

//-1 to the memory location being pointed at
function minus(){
	memory[pointer]--;
}

//append the current ASCII value to the output html location
function dot(){
	document.getElementById("output").innerHTML += String.fromCharCode(memory[pointer]);
}

//promts for input, should only take once character so trims it
function comma(){
	var string = prompt("Please enter a character:", 0);
	memory[pointer] = string.charCodeAt(0);
}

//progress forward thru the rest of the input, counting any left [ and ] brackets it passes to find the ] that this function was called for
function leftbracket(input, i){
	if(memory[pointer] == 0){
	var bracketCount = 0;
	for(var j=i+1; j<input.length; j++){
		switch(input.charAt(j)) {
			case '[':
				bracketCount++;
				break;
			case ']':
				if(bracketCount == 0){
					return j;
				}else{
					bracketCount--;
				}
				break;
		}
	}
	}
	return i;
}

//progress backward thru the rest of the input, counting any left [ and ] brackets it passes to find the [ that this function was called for
function rightbracket(input, i){
	if(memory[pointer] != 0){
		var bracketCount = 0;
		for(var j =i-1; j > 0; j--){
			switch(input.charAt(j)) {
				case ']': //]
					bracketCount++;
					break;
				case '[': //[
					if(bracketCount == 0){
						return j;
					}else{
						bracketCount--;
					}
					break;
			}			
		}		
	}
	return i;
}


function processProgram(input){
	
	for(var i=0; i<input.length; i++){
		switch(input.charAt(i)) {
			case '<': //<
				left();
				break;
			case '>': //>
				right();
				break;
			case '+': //+
				plus();
				break;
			case '-': //-
				minus();
				break;
			case '.': //.
				dot();
				break;
			case ',': //,
				comma();
				break;
			case '[': //[
				i = leftbracket(input, i);
				break;
			case ']': //]
				i = rightbracket(input, i);			
				break;
		} 
	}
}

function readProgram(){
	
	var input = document.getElementById("input").value;
	
	//"++++>+++++[<+>-]++++++++[<++++++>-]<.";

	
	//"++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++." //hello world
	
	//"++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++<[>.-<-]" //countdown
	
	memory = [0];
	pointer = 0;
	
	document.getElementById("output").innerHTML = "";
	
	processProgram(input);
}

document.getElementById("submit").addEventListener("click", function() { readProgram();}, false);
