Title: "BF interpreter" Date: 2019-06-18

[Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) or BF is an esoteric, turing complete programming language. It has 8 simple commands, but can technically be used to program an desired function

The commands are:

| Character | Function |
|----------|---------|
| \< | moves the pointer down 1 memory position |
| \> | moves the pointer up 1 memory position |
| \+ | Increments the current memory position by 1 |
| \- | decrements the current memory position by 1 |
| \. | Prints the ASCII value of the current memory position |
| \, | takes an input and stores its value in the current position |
| \[ | if the current memory position is 0, skips to the matching \] |
| \] | if the current memory position is not 0, returns to the matching \[ (together \[ and \] allow loops) |
| any other characters or white space are ignored, and can be used as comments |
      
      
[Click Here](https://quadriplanar.github.io/examples/interpreters/BF/BF.html) for the web app, or [Here](https://github.com/quadriplanar/quadriplanar.github.io/tree/master/examples/interpreters/BF) for the repository
