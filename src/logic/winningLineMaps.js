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
const linesPerCol = (cellsPerCol >= 4) ? (cellsPerCol - 3) : 0;
const linesPerRow = (cellsPerRow >= 4) ? (cellsPerRow - 3) : 0;
const numberOfVerticalLines = linesPerCol * cellsPerRow;
const numberOfHorizontalLines = linesPerRow * cellsPerCol;
const numberOfUpslashLines = linesPerCol * linesPerRow;
const numberOfDownslashLines = linesPerCol * linesPerRow;




const lineToCellsArray = [
    [
        0,
        [
            0,
            7,
            14,
            21
        ]
    ],
    [
        1,
        [
            0,
            1,
            2,
            3
        ]
    ],
    [
        2,
        [
            0,
            8,
            16,
            24
        ]
    ],
    [
        3,
        [
            1,
            8,
            15,
            22
        ]
    ],
    [
        4,
        [
            1,
            2,
            3,
            4
        ]
    ],
    [
        5,
        [
            1,
            9,
            17,
            25
        ]
    ],
    [
        6,
        [
            2,
            9,
            16,
            23
        ]
    ],
    [
        7,
        [
            2,
            3,
            4,
            5
        ]
    ],
    [
        8,
        [
            2,
            10,
            18,
            26
        ]
    ],
    [
        9,
        [
            3,
            10,
            17,
            24
        ]
    ],
    [
        10,
        [
            3,
            4,
            5,
            6
        ]
    ],
    [
        11,
        [
            3,
            11,
            19,
            27
        ]
    ],
    [
        12,
        [
            4,
            11,
            18,
            25
        ]
    ],
    [
        13,
        [
            5,
            12,
            19,
            26
        ]
    ],
    [
        14,
        [
            6,
            13,
            20,
            27
        ]
    ],
    [
        15,
        [
            7,
            14,
            21,
            28
        ]
    ],
    [
        16,
        [
            7,
            8,
            9,
            10
        ]
    ],
    [
        17,
        [
            7,
            15,
            23,
            31
        ]
    ],
    [
        18,
        [
            8,
            15,
            22,
            29
        ]
    ],
    [
        19,
        [
            8,
            9,
            10,
            11
        ]
    ],
    [
        20,
        [
            8,
            16,
            24,
            32
        ]
    ],
    [
        21,
        [
            9,
            16,
            23,
            30
        ]
    ],
    [
        22,
        [
            9,
            10,
            11,
            12
        ]
    ],
    [
        23,
        [
            9,
            17,
            25,
            33
        ]
    ],
    [
        24,
        [
            10,
            17,
            24,
            31
        ]
    ],
    [
        25,
        [
            10,
            11,
            12,
            13
        ]
    ],
    [
        26,
        [
            10,
            18,
            26,
            34
        ]
    ],
    [
        27,
        [
            11,
            18,
            25,
            32
        ]
    ],
    [
        28,
        [
            12,
            19,
            26,
            33
        ]
    ],
    [
        29,
        [
            13,
            20,
            27,
            34
        ]
    ],
    [
        30,
        [
            14,
            21,
            28,
            35
        ]
    ],
    [
        31,
        [
            14,
            15,
            16,
            17
        ]
    ],
    [
        32,
        [
            14,
            22,
            30,
            38
        ]
    ],
    [
        33,
        [
            15,
            22,
            29,
            36
        ]
    ],
    [
        34,
        [
            15,
            16,
            17,
            18
        ]
    ],
    [
        35,
        [
            15,
            23,
            31,
            39
        ]
    ],
    [
        36,
        [
            16,
            23,
            30,
            37
        ]
    ],
    [
        37,
        [
            16,
            17,
            18,
            19
        ]
    ],
    [
        38,
        [
            16,
            24,
            32,
            40
        ]
    ],
    [
        39,
        [
            17,
            24,
            31,
            38
        ]
    ],
    [
        40,
        [
            17,
            18,
            19,
            20
        ]
    ],
    [
        41,
        [
            17,
            25,
            33,
            41
        ]
    ],
    [
        42,
        [
            18,
            25,
            32,
            39
        ]
    ],
    [
        43,
        [
            19,
            26,
            33,
            40
        ]
    ],
    [
        44,
        [
            20,
            27,
            34,
            41
        ]
    ],
    [
        45,
        [
            21,
            22,
            23,
            24
        ]
    ],
    [
        46,
        [
            21,
            15,
            9,
            3
        ]
    ],
    [
        47,
        [
            22,
            23,
            24,
            25
        ]
    ],
    [
        48,
        [
            22,
            16,
            10,
            4
        ]
    ],
    [
        49,
        [
            23,
            24,
            25,
            26
        ]
    ],
    [
        50,
        [
            23,
            17,
            11,
            5
        ]
    ],
    [
        51,
        [
            24,
            25,
            26,
            27
        ]
    ],
    [
        52,
        [
            24,
            18,
            12,
            6
        ]
    ],
    [
        53,
        [
            28,
            29,
            30,
            31
        ]
    ],
    [
        54,
        [
            28,
            22,
            16,
            10
        ]
    ],
    [
        55,
        [
            29,
            30,
            31,
            32
        ]
    ],
    [
        56,
        [
            29,
            23,
            17,
            11
        ]
    ],
    [
        57,
        [
            30,
            31,
            32,
            33
        ]
    ],
    [
        58,
        [
            30,
            24,
            18,
            12
        ]
    ],
    [
        59,
        [
            31,
            32,
            33,
            34
        ]
    ],
    [
        60,
        [
            31,
            25,
            19,
            13
        ]
    ],
    [
        61,
        [
            35,
            36,
            37,
            38
        ]
    ],
    [
        62,
        [
            35,
            29,
            23,
            17
        ]
    ],
    [
        63,
        [
            36,
            37,
            38,
            39
        ]
    ],
    [
        64,
        [
            36,
            30,
            24,
            18
        ]
    ],
    [
        65,
        [
            37,
            38,
            39,
            40
        ]
    ],
    [
        66,
        [
            37,
            31,
            25,
            19
        ]
    ],
    [
        67,
        [
            38,
            39,
            40,
            41
        ]
    ],
    [
        68,
        [
            38,
            32,
            26,
            20
        ]
    ]
]
export const lineToCellsMap = new Map(lineToCellsArray)

const cellToLinesArray = [
    [
        0,
        [
            0,
            1,
            2
        ]
    ],
    [
        1,
        [
            1,
            3,
            4,
            5
        ]
    ],
    [
        2,
        [
            1,
            4,
            6,
            7,
            8
        ]
    ],
    [
        3,
        [
            1,
            4,
            7,
            9,
            10,
            11,
            46
        ]
    ],
    [
        4,
        [
            4,
            7,
            10,
            12,
            48
        ]
    ],
    [
        5,
        [
            7,
            10,
            13,
            50
        ]
    ],
    [
        6,
        [
            10,
            14,
            52
        ]
    ],
    [
        7,
        [
            0,
            15,
            16,
            17
        ]
    ],
    [
        8,
        [
            2,
            3,
            16,
            18,
            19,
            20
        ]
    ],
    [
        9,
        [
            5,
            6,
            16,
            19,
            21,
            22,
            23,
            46
        ]
    ],
    [
        10,
        [
            8,
            9,
            16,
            19,
            22,
            24,
            25,
            26,
            48,
            54
        ]
    ],
    [
        11,
        [
            11,
            12,
            19,
            22,
            25,
            27,
            50,
            56
        ]
    ],
    [
        12,
        [
            13,
            22,
            25,
            28,
            52,
            58
        ]
    ],
    [
        13,
        [
            14,
            25,
            29,
            60
        ]
    ],
    [
        14,
        [
            0,
            15,
            30,
            31,
            32
        ]
    ],
    [
        15,
        [
            3,
            17,
            18,
            31,
            33,
            34,
            35,
            46
        ]
    ],
    [
        16,
        [
            2,
            6,
            20,
            21,
            31,
            34,
            36,
            37,
            38,
            48,
            54
        ]
    ],
    [
        17,
        [
            5,
            9,
            23,
            24,
            31,
            34,
            37,
            39,
            40,
            41,
            50,
            56,
            62
        ]
    ],
    [
        18,
        [
            8,
            12,
            26,
            27,
            34,
            37,
            40,
            42,
            52,
            58,
            64
        ]
    ],
    [
        19,
        [
            11,
            13,
            28,
            37,
            40,
            43,
            60,
            66
        ]
    ],
    [
        20,
        [
            14,
            29,
            40,
            44,
            68
        ]
    ],
    [
        21,
        [
            0,
            15,
            30,
            45,
            46
        ]
    ],
    [
        22,
        [
            3,
            18,
            32,
            33,
            45,
            47,
            48,
            54
        ]
    ],
    [
        23,
        [
            6,
            17,
            21,
            35,
            36,
            45,
            47,
            49,
            50,
            56,
            62
        ]
    ],
    [
        24,
        [
            2,
            9,
            20,
            24,
            38,
            39,
            45,
            47,
            49,
            51,
            52,
            58,
            64
        ]
    ],
    [
        25,
        [
            5,
            12,
            23,
            27,
            41,
            42,
            47,
            49,
            51,
            60,
            66
        ]
    ],
    [
        26,
        [
            8,
            13,
            26,
            28,
            43,
            49,
            51,
            68
        ]
    ],
    [
        27,
        [
            11,
            14,
            29,
            44,
            51
        ]
    ],
    [
        28,
        [
            15,
            30,
            53,
            54
        ]
    ],
    [
        29,
        [
            18,
            33,
            53,
            55,
            56,
            62
        ]
    ],
    [
        30,
        [
            21,
            32,
            36,
            53,
            55,
            57,
            58,
            64
        ]
    ],
    [
        31,
        [
            17,
            24,
            35,
            39,
            53,
            55,
            57,
            59,
            60,
            66
        ]
    ],
    [
        32,
        [
            20,
            27,
            38,
            42,
            55,
            57,
            59,
            68
        ]
    ],
    [
        33,
        [
            23,
            28,
            41,
            43,
            57,
            59
        ]
    ],
    [
        34,
        [
            26,
            29,
            44,
            59
        ]
    ],
    [
        35,
        [
            30,
            61,
            62
        ]
    ],
    [
        36,
        [
            33,
            61,
            63,
            64
        ]
    ],
    [
        37,
        [
            36,
            61,
            63,
            65,
            66
        ]
    ],
    [
        38,
        [
            32,
            39,
            61,
            63,
            65,
            67,
            68
        ]
    ],
    [
        39,
        [
            35,
            42,
            63,
            65,
            67
        ]
    ],
    [
        40,
        [
            38,
            43,
            65,
            67
        ]
    ],
    [
        41,
        [
            41,
            44,
            67
        ]
    ]
]
export const cellToLinesMap = new Map(cellToLinesArray)


export const numberOfLines = lineToCellsMap.size

// These were used once in development and do not need to rerun. It is easier on the client device to just send the copied in hard coded Maps
// export const lineToCellsMap = generateLineToCellsMap()
// export const numberOfLines = lineToCellsMap.size

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


// export const cellToLinesMap = generateCellToLinesMap()

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

