// A "line" is a set of four squareIds that together form a win.
// There are four 'types' of Line: 'vertical', 'horizontal', 'upslash', 'downslash'
// There are 64 lines and 42 squares. 
// This module exports two high-level constants that map these two types of id to one another.
// 1) lineIdToSquareIdsMap  could be renamed "squaresInLine". It takes a lineId 0-63 and gives back the four squares in it.
// 2) squareIdToLineIdsMap  could be renamed "linesThatIncludeSquare". It takes a squareId 0-41 and gives back the 3 to 13 lines that square is part of.

// Low-level Constants
const squaresPerCol = 6;
const squaresPerRow = 7;
const totalSquares = squaresPerCol * squaresPerRow;
const linesPerCol = (squaresPerCol >= 4) ? (squaresPerCol - 3) : 0;
const linesPerRow = (squaresPerRow >= 4) ? (squaresPerRow - 3) : 0;
const numberOfVerticalLines = linesPerCol * squaresPerRow;
const numberOfHorizontalLines = linesPerRow * squaresPerCol;
const numberOfUpslashLines = linesPerCol * linesPerRow;
const numberOfDownslashLines = linesPerCol * linesPerRow;

