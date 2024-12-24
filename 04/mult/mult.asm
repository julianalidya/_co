// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Initialize R2 (result) to 0
@R2
M=0

// Load R0 (multiplicand) into D
@R0
D=M

// If R0 == 0, skip the loop and leave R2 as 0
@END
D;JEQ

// Initialize counter (R1) and start loop
@R1
D=M  // Load R1 (multiplier) into D
@LOOP
M=D  // Store R1 (counter) in M

// Start of the loop
(LOOP)
    @R1
    D=M  // Load the counter
    @END
    D;JEQ  // If counter == 0, exit loop

    @R0
    D=M  // Load multiplicand
    @R2
    M=M+D  // Add multiplicand to result

    @R1
    M=M-1  // Decrement counter
    @LOOP
    0;JMP  // Repeat loop

// End of the program
(END)
@END
0;JMP
