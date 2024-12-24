// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Fill.asm
// Toggles the screen between black and white based on keyboard input.

(START)
@KBD            // Address of the keyboard input
D=M             // Read the keyboard state into D
@DRAW_BLACK     // If a key is pressed (D != 0), jump to DRAW_BLACK
D;JNE

// No key pressed: clear the screen (write white to all pixels)
@SCREEN         // Address of the screen memory start
D=A             // Load the screen address
(CLEAR_LOOP)
M=0             // Write white (0) to the current pixel
D=D+1           // Move to the next pixel
@SCREEN_END     // Address just after the last screen memory
D;JLT           // Continue clearing until the end of the screen
@START          // Go back to check the keyboard again
0;JMP

(DRAW_BLACK)
// Key pressed: fill the screen (write black to all pixels)
