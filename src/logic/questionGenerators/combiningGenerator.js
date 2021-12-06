// Exports helper for when questionGenerator has selected the "combining" topic
import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";

const missingMinuendInstructions = [
    "Minus how many?",
    "Take away what?",
    "How far apart?",
]
const howFarApart = [
    "How far apart?"
]

export function getCombiningQuestion(difficulty) {
    console.assert((difficulty === "easy" || difficulty === "medium" || difficulty === "hard"), `getCombiningQuestion recieved invalid difficulty ${difficulty}` )
    console.log(`Generating Combining Question of difficulty "${difficulty}"`)
    if (difficulty === "easy") {
        return easyCombiningQuestion()
    }
    else if (difficulty === "medium") {
        return mediumCombiningQuestion()
    }
    else if (difficulty === "hard") {
        return hardCombiningQuestion()
    }
}

function easyCombiningQuestion() {
    let types = [
        missingSumTwo,
        missingSumThree,
        missingDifference,
        missingAddendTwo,
        // double,
        // howFarApart,        // a and b
    ]
    return chooseRandomFromArray(types)("easy") 
}
function mediumCombiningQuestion() {
    let types = [
        missingSumTwo,
        missingSumThree,
        missingDifference,
        missingAddendTwo,
        // triple,
        // combineAndCompare,   // a + b _ c - d
        // missingMinuend,     // a - _ = c
        // howFarApart,        // a and b
    ]
    return chooseRandomFromArray(types)("medium") 
}
function hardCombiningQuestion() {
    let types = [
        missingSumTwo,
        missingSumThree,
        missingDifference,
        missingAddendTwo,
        // quadruple,
        // combineAndCompare,   // a + b _ c - d
        // missingMinuend,     // a - _ = c
        // howFarApart,        // a and b
    ]
    return chooseRandomFromArray(types)("hard") 
}


const missingSumInstructions = [
    "Add",
    "What's the Sum?",
    "Find the Total"
]
function missingSumTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(5,75)
        vars.b = randomInt(5,75)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(40, 160)
        vars.b = randomInt(40, 160)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(100, 1000)
        vars.b = randomInt(100, 1000)
        vars.c = vars.a + vars.b
    }
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
    if (difficulty === "easy") {
        vars.a = randomInt(5, 25)
        vars.b = randomInt(5, 25)
        vars.c = randomInt(5, 25)
        vars.d = vars.a + vars.b + vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(20, 100)
        vars.c = randomInt(20, 100)
        vars.d = vars.a + vars.b + vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(100, 333)
        vars.b = randomInt(100, 333)
        vars.c = randomInt(100, 333)
        vars.d = vars.a + vars.b + vars.c
        
    }
    return {
        type: "missingSumThree",
        vars: vars,
        correctAnswer: vars.d,
        equationString: `${vars.a} + ${vars.b} + ${vars.c} = __`,
        instructions: chooseRandomFromArray(missingSumInstructions),
        inputType: "textField",
    }
}



function missingDifference(difficulty) {
    const instructions = [
        "Subtract",
        "Find the Difference",
        "How much is left?"
    ]
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(20, 80)
        vars.b = randomInt(5, 20)
        vars.c = vars.a - vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(100, 300)
        vars.b = randomInt(20, 100)
        vars.c = vars.a - vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(200, 1000)
        vars.b = randomInt(50, 200)
        vars.c = vars.a - vars.b
    }
    return {
        type: "missingDifference",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} - ${vars.b} = __`,
        instructions: chooseRandomFromArray(instructions),
        inputType: "textField",
    }
}


const missingAddendInstructions = [
    "What's missing?",
    "How many more?"
]
function missingAddendTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(20, 80)
        vars.b = randomInt(5, 25)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(50, 300)
        vars.b = randomInt(50, 100)
        vars.c = vars.a + vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(200, 1000)
        vars.b = randomInt(200, 500)
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
    if (difficulty === "easy") {
        vars.a = randomInt(2, 20)
        vars.b = randomInt(2, 20)
        vars.c = randomInt(2, 20)
        vars.d = vars.a + vars.b + vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(20, 100)
        vars.c = randomInt(20, 100)
        vars.d = vars.a + vars.b + vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(50, 300)
        vars.b = randomInt(50, 300)
        vars.c = randomInt(50, 300)
        vars.d = vars.a + vars.b + vars.c
    }
    return {
        type: "missingAddendThree",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} + ${vars.b} + __ = ${vars.d}`,
        instructions: chooseRandomFromArray(missingAddendInstructions),
        inputType: "textField",
    }

}


