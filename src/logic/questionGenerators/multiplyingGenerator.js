// Exports helpers for when questionGenerator has selected the "multiplying" topic
import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";


export function getMultiplyingQuestion(difficulty) {
    console.assert((difficulty === "easy" || difficulty === "medium" || difficulty === "hard"), `getMultiplyingQuestion recieved invalid difficulty ${difficulty}`)
    console.log(`Generating Multiplying Question of difficulty "${difficulty}"`)
    if (difficulty === "easy") {
        return easyMultiplyingQuestion()
    }
    else if (difficulty === "medium") {
        return mediumMultiplyingQuestion()
    }
    else if (difficulty === "hard") {
        return hardMultiplyingQuestion()
    }
}
function easyMultiplyingQuestion() {
    let types = [
        missingProductTwo,
        missingProductThree,
        missingFactorTwo,
        missingFactorThree,
        // doubleTripleQuadruple,

    ]
    return chooseRandomFromArray(types)("easy")
}
function mediumMultiplyingQuestion() {
    let types = [
        missingProductTwo,
        missingProductThree,
        // missingFactorTwo,
        // missingFactorThree,
    ]
    return chooseRandomFromArray(types)("medium")
}
function hardMultiplyingQuestion() {
    let types = [
        missingProductTwo,
        missingProductThree,
        // missingFactorTwo,
        // missingFactorThree,
    ]
    return chooseRandomFromArray(types)("hard")
}


const easyFactor = () => chooseRandomFromArray([4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60])



// MISSING PRODUCT

const missingProductInstructions = [
    "Multiply",
    "Find the Product",
]
function missingProductTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = easyFactor()
        vars.b = randomInt(2, 11)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 26)
        vars.b = randomInt(5, 26)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(11, 100)
        vars.b = randomInt(11, 100)
        vars.c = vars.a * vars.b
    }
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
        vars.a = randomInt(2, 6)
        vars.b = randomInt(2, 6)
        vars.c = randomInt(2, 11)
        vars.d = vars.a * vars.b * vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(2, 11)
        vars.b = randomInt(2, 11)
        vars.c = randomInt(2, 11)
        vars.d = vars.a * vars.b * vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(2, 26)
        vars.b = randomInt(2, 16)
        vars.c = randomInt(2, 11)
        vars.d = vars.a * vars.b * vars.c
    }
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

const missingFactorInstructions = [
    "What's missing?",
    "Times what?"
]
function missingFactorTwo(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(3, 16)
        vars.b = randomInt(2, 11)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 31)
        vars.b = randomInt(5, 16)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(11, 26)
        vars.c = vars.a * vars.b
    }
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
        vars.a = randomInt(2, 6)
        vars.b = randomInt(2, 6)
        vars.c = randomInt(2, 11)
        vars.d = vars.a * vars.b * vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(3, 11)
        vars.b = randomInt(3, 11)
        vars.c = randomInt(3, 11)
        vars.d = vars.a * vars.b * vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(4, 26)
        vars.b = randomInt(4, 11)
        vars.c = randomInt(4, 16)
        vars.d = vars.a * vars.b * vars.c
    }
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
const missingDivisorInstructions = [
    "Find the Divisor",
    "Divide by what?"
]
function missingDivisor(difficulty) {
    let vars = {}
    if (difficulty === "easy") {
        vars.a = randomInt(3, 16)
        vars.b = randomInt(2, 11)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 31)
        vars.b = randomInt(5, 16)
        vars.c = vars.a * vars.b
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(20, 100)
        vars.b = randomInt(11, 26)
        vars.c = vars.a * vars.b
    }
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

