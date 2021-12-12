// Exports helper for when questionGenerator has selected the "combining" topic
import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";

const missingMinuendInstructions = [
    "Minus how many?",
    "Take away what?",
    "How far apart?",
]


export function getCombiningQuestion(difficulty) {
    console.assert((difficulty === "easy" || difficulty === "medium" || difficulty === "hard"), `getCombiningQuestion recieved invalid difficulty ${difficulty}` )
    console.log(`Generating Combining Question of difficulty "${difficulty}"`)
    
    let types = [
        missingSumTwo,
        missingSumThree,
        missingDifference,
        missingAddendTwo,
        missingAddendThree,
        doubleTripleQuadruple,
        howFarApart,
    ]
    return chooseRandomFromArray(types)(difficulty)
    
}


/////////////////////////////////////////////////////////////////
//  INSTRUCTIONS
/////////////////////////////////////////////////////////////////

const missingSumInstructions = [
    "Add",
    "What's the Sum?",
    "Find the Total"
]
const missingDifferenceInstructions = [
    "Subtract",
    "Find the Difference",
    "How much is left?"
]
const missingAddendInstructions = [
    "Plus what?",
    "Add how many?",
    "How many more?"
]
const howFarApartInstructions = [
    "How far apart?"
]

function missingSumTwo(difficulty) { 
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(3,20)
        vars.b = randomInt(3,20)
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(20, 100)
        vars.b = randomInt(20, 100)
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(100, 1000)
        vars.b = randomInt(100, 1000)
    }
    vars.c = vars.a + vars.b
    return {
        type: "missingSumTwo",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} + ${vars.b} = __`,
        instructions: chooseRandomFromArray(missingSumInstructions),
        inputType: "textField",
    }
}
function missingSumThree(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(2, 13)
        vars.b = randomInt(2, 13)
        vars.c = randomInt(2, 13)
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(10, 100)
        vars.b = randomInt(10, 100)
        vars.c = randomInt(10, 100)
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(100, 600)
        vars.b = randomInt(50, 100)
        vars.c = randomInt(50, 100)
    }
    vars.d = vars.a + vars.b + vars.c
    return {
        type: "missingSumThree",
        vars: vars,
        correctAnswer: vars.d,
        equationString: `${vars.a} + ${vars.b} + ${vars.c} =__`,
        instructions: chooseRandomFromArray(missingSumInstructions),
        inputType: "textField",
    }
}
function missingDifference(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(10, 40)
        vars.b = randomInt(3, 10)
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(40, 200)
        vars.b = randomInt(10, 40)
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(300, 1000)
        vars.b = randomInt(50, 300)
    }
    vars.c = vars.a - vars.b
    return {
        type: "missingDifference",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} - ${vars.b} = __`,
        instructions: chooseRandomFromArray(missingDifferenceInstructions),
        inputType: "textField",
    }
}

function missingAddendTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(10, 40)
        vars.b = randomInt(3, 10)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(40, 200)
        vars.b = randomInt(10, 40)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(100, 700)
        vars.b = randomInt(50, 300)
        vars.c = vars.a + vars.b
    }
    return {
        type: "missingAddendTwo",
        vars: vars,
        correctAnswer: vars.b,
        equationString: `${vars.a} + __ = ${vars.c}`,
        instructions: chooseRandomFromArray(missingAddendInstructions),
        inputType: "textField",
    }
}
function missingAddendThree(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(2, 12)
        vars.b = randomInt(2, 12)
        vars.c = randomInt(2, 12)
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(11, 33)
        vars.b = randomInt(11, 33)
        vars.c = randomInt(11, 33)
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(30, 100)
        vars.b = randomInt(30, 100)
        vars.c = randomInt(30, 100)
    }
    vars.d = vars.a + vars.b + vars.c
    return {
        type: "missingAddendThree",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} + ${vars.b} + __ = ${vars.d}`,
        instructions: chooseRandomFromArray(missingAddendInstructions),
        inputType: "textField",
    }
}
function howFarApart(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 1
        vars.a = randomInt(3, 10)
        vars.b = randomInt(10, 20)
    }
    else if (difficulty === "medium") {     // Grade 2
        vars.a = randomInt(10, 40)
        vars.b = randomInt(20, 100)
    }
    else if (difficulty === "hard") {       // Grade 3
        vars.a = randomInt(100, 1000)
        vars.b = randomInt(100, 1000)
    }
    vars.c = Math.abs(vars.a - vars.b)
    return {
        type: "howFarApart",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a}  &  ${vars.b}`,
        instructions: chooseRandomFromArray(howFarApartInstructions),
        inputType: "textField",
    }
}

// DOUBLE TRIPLE QUADRUPLE
function doubleTripleQuadruple(difficulty) {
    let vars = {}
    let dtqInstructions = ""
    if (difficulty === "easy") {            // Grade 1
        dtqInstructions = "Double"
        vars.a = randomInt(3, 50)
        vars.b = vars.a * 2
    }
    else if (difficulty === "medium") {     // Grade 2
        dtqInstructions = "Triple"
        vars.a = randomInt(20, 100)
        vars.b = vars.a * 3
    }
    else if (difficulty === "hard") {       // Grade 3
        dtqInstructions = chooseRandomFromArray(["Quadruple", "Double Double"])
        vars.a = randomInt(20, 250)
        vars.b = vars.a * 4
    }
    return {
        type: "doubleTripleQuadruple",
        vars: vars,
        correctAnswer: vars.b,
        equationString: `${vars.a}`,
        instructions: dtqInstructions,
        inputType: "textField",
    }

}

function missingMinuend(params) {
    // vars.c = randomInt(3, 20)
    // vars.a = randomInt(2, vars.c)
    // vars.b = vars.c - vars.a
}



// ["compareSums", `${vars[0]} + ${vars[1]} __ ${vars[2]} + ${vars[3]}`],
