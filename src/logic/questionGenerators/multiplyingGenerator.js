// Exports helpers for when questionGenerator has selected the "multiplying" topic
import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";


export function getMultiplyingQuestion(difficulty) {
    console.assert((difficulty === "easy" || difficulty === "medium" || difficulty === "hard"), `getMultiplyingQuestion recieved invalid difficulty ${difficulty}`)
    console.log(`Generating Multiplying Question of difficulty "${difficulty}"`)
    
    let types = [
        missingProductTwo,
        missingProductThree,
        missingFactorTwo,
        missingFactorThree,
        halfThirdQuarter

    ]
    return chooseRandomFromArray(types)(difficulty)

}

const mediumFactor = () => chooseRandomFromArray([4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90])


/////////////////////////////////////////////////////////////////
//  INSTRUCTIONS
/////////////////////////////////////////////////////////////////
const missingProductInstructions = [
    "Multiply",
    "Find the Product",
]
const missingFactorInstructions = [
    "What's missing?",
    "Times what?"
]
const missingDivisorInstructions = [
    "Find the Divisor",
    "How many groups of...",
    "Divide by what?"
]
const missingQuotientInstructions = [
    "Find the Quotient",
    "How many per group?"
]

// MISSING PRODUCT
function missingProductTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {            // Grade 2
        vars.a = randomInt(2, 11)
        vars.b = randomInt(2, 11)
    }
    else if (difficulty === "medium") {     // Grade 3
        vars.a = mediumFactor()
        vars.b = randomInt(2, 16)
    }
    else if (difficulty === "hard") {       // Grade 5
        vars.a = randomInt(11, 100)
        vars.b = randomInt(11, 100)
    }
    vars.c = vars.a * vars.b

    return {
        type: "missingProductTwo",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} x ${vars.b} = __`,
        instructions: chooseRandomFromArray(missingProductInstructions),
        inputType: "textField",
    }
}
function missingProductThree(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(2, 7)
        vars.b = randomInt(2, 7)
        vars.c = randomInt(2, 7)
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(2, 11)
        vars.b = randomInt(2, 11)
        vars.c = randomInt(2, 11)
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(2, 26)
        vars.b = randomInt(2, 16)
        vars.c = randomInt(2, 11)
    }
    vars.d = vars.a * vars.b * vars.c
    return {
        type: "missingProductThree",
        vars: vars,
        correctAnswer: vars.d,
        equationString: `${vars.a} x ${vars.b} x ${vars.c} = __`,
        instructions: chooseRandomFromArray(missingProductInstructions),
        inputType: "textField",
    }
}


// MISSING FACTOR
function missingFactorTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(2, 11)
        vars.b = randomInt(2, 11)
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 31)
        vars.b = mediumFactor()
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(5, 20)
    }
    vars.c = vars.a * vars.b
    return {
        type: "missingFactorTwo",
        vars: vars,
        correctAnswer: vars.b,
        equationString: `${vars.a} x __ = ${vars.c}`,
        instructions: chooseRandomFromArray(missingFactorInstructions),
        inputType: "textField",
    }
}
function missingFactorThree(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(2, 7)
        vars.b = randomInt(2, 7)
        vars.c = randomInt(2, 7)
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(3, 11)
        vars.b = randomInt(3, 11)
        vars.c = randomInt(3, 11)
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(4, 26)
        vars.b = randomInt(4, 11)
        vars.c = randomInt(4, 16)
    }
    vars.d = vars.a * vars.b * vars.c

    return {
        type: "missingFactorThree",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} x ${vars.b} x __ = ${vars.d}`,
        instructions: chooseRandomFromArray(missingFactorInstructions),
        inputType: "textField",
    }
}


// MISSING DIVIDEND


// MISSING DIVISOR
function missingDivisor(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(3, 16)
        vars.b = randomInt(2, 11)
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 31)
        vars.b = randomInt(5, 16)
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(11, 26)
    }
    vars.c = vars.a * vars.b

    return {
        type: "missingDivisor",
        vars: vars,
        correctAnswer: vars.b,
        equationString: `${vars.c} ÷ __ = ${vars.a}`,
        instructions: chooseRandomFromArray(missingDivisorInstructions),
        inputType: "textField",
    }
}


// MISSING QUOTIENT
function missingQuotient(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(3, 16)
        vars.b = randomInt(2, 11)
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 31)
        vars.b = randomInt(5, 16)
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(11, 26)
    }
    vars.c = vars.a * vars.b

    return {
        type: "missingQuotient",
        vars: vars,
        correctAnswer: vars.b,
        equationString: `${vars.c} ÷ ${vars.a} = __`,
        instructions: chooseRandomFromArray(missingQuotientInstructions),
        inputType: "textField",
    }
}

// DOUBLE TRIPLE QUADRUPLE  --> Now lives in Combining

// HALF THIRD QUARTER 
function halfThirdQuarter(difficulty) {
    let vars = {}
    let instructions = ""
    if (difficulty === "easy") {            // Grade 1
        instructions = "What's half of"
        // instructions = chooseRandomFromArray(["What's half of", "Split evenly"])
        vars.a = randomInt(3, 50)
        vars.b = vars.a * 2
    }
    else if (difficulty === "medium") {     // Grade 2
        instructions = "What's a third of"
        // instructions = chooseRandomFromArray(["Find a third of", "Split three ways"])
        vars.a = randomInt(20, 100)
        vars.b = vars.a * 3
    }
    else if (difficulty === "hard") {       // Grade 3
        instructions = "What's a quarter of"
        // instructions = chooseRandomFromArray(["Find a quarter of", "Half and half again"])
        vars.a = randomInt(20, 250)
        vars.b = vars.a * 4
    }
    return {
        type: "doubleTripleQuadruple",
        vars: vars,
        correctAnswer: vars.a,
        equationString: `${vars.b} ?`,
        instructions: instructions,
        inputType: "textField",
    }
}