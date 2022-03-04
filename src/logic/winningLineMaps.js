// A "line" is a set of four cellIds that together form a win.
// There are four 'types' of Line: 'vertical', 'horizontal', 'upslash', 'downslash'
// There are 64 lines and 42 cells. 
// This module exports two high-level constants that map these two types of id to one another.
// 1) lineIdToCellIdsMap  could be renamed "cellsInLine". It takes a lineId 0-63 and gives back the four cells in it.
// 2) cellIdToLineIdsMap  could be renamed "linesThatIncludeCell". It takes a cellId 0-41 and gives back the 3 to 13 lines that cell is part of.

// Low-level Constants
const cellsPerCol = 6;
const cellsPerRow = 7;
const totalCells = cellsPerCol * cellsPerRow;
// const linesPerCol = (cellsPerCol >= 4) ? (cellsPerCol - 3) : 0;
// const linesPerRow = (cellsPerRow >= 4) ? (cellsPerRow - 3) : 0;
// const numberOfVerticalLines = linesPerCol * cellsPerRow;
// const numberOfHorizontalLines = linesPerRow * cellsPerCol;
// const numberOfUpslashLines = linesPerCol * linesPerRow;
// const numberOfDownslashLines = linesPerCol * linesPerRow;


export const lineToCellsMap = generateLineToCellsMap()
export const numberOfLines = lineToCellsMap.size
export const cellToLinesMap = generateCellToLinesMap()


function generateLineToCellsMap() {
    console.warn(`generateLineToCellsMap was called.  This compute heavy function should only run once per game.`)
    let map = new Map()
    let currentLineId = 0
    for (let cell = 0; cell < totalCells; cell++) {
        if (isStartOfVerticalLine(cell)) {
            let line = verticalLineByStartCell(cell)
            map.set(currentLineId++, line)
        }
        if (isStartOfHorizontalLine(cell)) {
            let line = horizontalLineByStartCell(cell)
            map.set(currentLineId++, line)
        }
        if (isStartOfUpslashLine(cell)) {
            let line = upslashLineByStartCell(cell)
            map.set(currentLineId++, line)
        }
        if (isStartOfDownslashLine(cell)) {
            let line = downslashLineByStartCell(cell)
            map.set(currentLineId++, line)
        }
    }
    console.log(`Mapped each of the ${map.size} LineIds to the set of Cells in it.`)
    console.log([...map.entries()])
    return map
}
function verticalLineByStartCell(cellId) {
    let line = [
        cellId + (0 * cellsPerRow),
        cellId + (1 * cellsPerRow),
        cellId + (2 * cellsPerRow),
        cellId + (3 * cellsPerRow)
    ]
    return line
}
function horizontalLineByStartCell(cellId) {
    let line = [
        cellId + 0,
        cellId + 1,
        cellId + 2,
        cellId + 3
    ]
    return line
}
function upslashLineByStartCell(cellId) {
    let line = [
        cellId + (0 * cellsPerRow) + 0,
        cellId + (1 * cellsPerRow) + 1,
        cellId + (2 * cellsPerRow) + 2,
        cellId + (3 * cellsPerRow) + 3
    ]
    return line
}
function downslashLineByStartCell(cellId) {
    let line = [
        cellId - (0 * cellsPerRow) + 0,
        cellId - (1 * cellsPerRow) + 1,
        cellId - (2 * cellsPerRow) + 2,
        cellId - (3 * cellsPerRow) + 3
    ]
    return line
}



function generateCellToLinesMap() {
    console.warn(`cellToLinesMap was called.  This is a compute heavy function which should run once per game.`)
    let cellToLinesMap = new Map()
    for (let cell = 0; cell < totalCells; cell++) {
        cellToLinesMap.set(cell, [])
    }
    for (let lineId = 0; lineId < numberOfLines; lineId++) {
        let cellsInLine = lineToCellsMap.get(lineId)
        cellsInLine.forEach(cell => {
            let prevLinesList = cellToLinesMap.get(cell)
            cellToLinesMap.set(cell, prevLinesList.concat(lineId))
        })
    }
    console.log(`Mapped each of the ${totalCells} CellIds to the set of all Lines that include it.`)
    console.log([...cellToLinesMap.entries()])

    // cellsToLinesMap.forEach(logMapElement);
    return cellToLinesMap
}

// FIRST level BOOLEAN LINE helpers             // Currently there is only a Cell.js functional Component, however if I defined a Cell Class I would think that I could turn these functions that take cellId as a parameter and turn them into something that 'reads better' like Cell.isStartOfVerticalLine() written on the Cell object so that it has built in access to the relevant cellId and can be used in a no-parameter fashion. ??? 
function isStartOfVerticalLine(cellId) {
    const rowNumber = getRowByCellId(cellId)
    return (cellsPerCol - rowNumber >= 4)
}
function isEndOfVerticalLine(cellId) {
    const rowNumber = getRowByCellId(cellId)
    return (rowNumber >= 3)
}
function isStartOfHorizontalLine(cellId) {
    // If we are in the 0-th row then the minimum cellsPerCol that should return true is 4
    const colNumber = getColByCellId(cellId)
    return (cellsPerRow - colNumber >= 4)
}
function isStartOfUpslashLine(cellId) {
    // A cell is the Start Of an Upslash Line IFF it is BOTH the "start" of a vertical line AND the "start" of a horizontal line.  
    return (isStartOfVerticalLine(cellId) && isStartOfHorizontalLine(cellId));
}
function isStartOfDownslashLine(cellId) {
    // A cell is the Start Of an Downslash Line IFF it is BOTH the "end" of a vertical line AND the "start" of a horizontal line.  
    return (isEndOfVerticalLine(cellId) && isStartOfHorizontalLine(cellId));
}

// LOWEST LEVEL CELL-ROW-COL HELPERS
function getRowByCellId(id) {
    return (Math.floor(id / cellsPerRow))
}
function getColByCellId(id) {
    return (id % cellsPerRow)
}
function getCellIdByRowCol(row, col) {
    return (row * cellsPerRow + col);
}

