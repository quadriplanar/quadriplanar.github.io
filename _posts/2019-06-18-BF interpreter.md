Title: "BF interpreter" Date: 2019-06-18

[Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) or BF is an esoteric, turing complete programming language. It has 8 simple commands, but can technically be used to program any desired function. However, any reasonably complex program can quickly become very complicated and very difficult for human reading. For example, a program that prints "Hello World!" is:

>++++++++\[>++++\[>++>+++>+++>+<<<<-\]>+>+>->>+\[<\]<-\]>>.>- - -.+++++++..+++.>>.<-.<.+++.- - - - - -.- - - - - - - -.>>+.>++.

For this reason the language is not very useful in pratice, but is an interesting challenge language to try.

Work in the language consists of byte sized memory locations and a pointer to the 'current' location. The commands allow you to change or print the ASCII value of the currently pointed at memory location, change memory locations, and simple if _ then goto _ that allow for loops.

The commands are:

| Character | Function |
|----------|---------|
| \< | moves the pointer down 1 memory position |
| \> | moves the pointer up 1 memory position |
| \+ | Increments the current memory position by 1 |
| \- | decrements the current memory position by 1 |
| \. | Prints the ASCII value of the current memory position |
| , | takes an input and stores its value in the current position |
| \[ | if the current memory position is 0, skips to the matching \] |
| \] | if the current memory position is not 0, returns to the matching \[ (together \[ and \] allow loops) |
| any other characters or white space are ignored, and can be used as comments |
      
Below are links to a javascript + html app i made that can take and process a BF program and print out its input. If brackets do not match, the program will stop processing. It has no built in limit to the memory spaces available, but javascript has a maximum number value of 9007199254740991 at which point it will have an error. Browers and computers would likely have trouble before this.
      
[Click Here](https://quadriplanar.github.io/examples/interpreters/BF/BF.html) for the web app, or [Here](https://github.com/quadriplanar/quadriplanar.github.io/tree/master/examples/interpreters/BF) for the repository
