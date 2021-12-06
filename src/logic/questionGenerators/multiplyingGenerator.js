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
        missingFactorTwo,
        // doubleTripleQuadruple,

    ]
    return chooseRandomFromArray(types)("easy")
}
function mediumMultiplyingQuestion() {
    let types = [
        missingProductTwo,
        // missingProductThree,
        missingFactorTwo,
        // missingFactorThree,
    ]
    return chooseRandomFromArray(types)("medium")
}
function hardMultiplyingQuestion() {
    let types = [
        missingProductTwo,
        // missingProductThree,
        missingFactorTwo,
        // missingFactorThree,
    ]
    return chooseRandomFromArray(types)("hard")
}


const easyFactor = () => chooseRandomFromArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60])



// MISSING PRODUCT

const missingProductInstructions = [
    "Multiply",
    "Find the Product",
]
function missingProductTwo(difficulty) {
    const instructions = chooseRandomFromArray(missingProductInstructions)
    let vars = {}
    let equationString = ""
    let correctAnswer

    if (difficulty === "easy") {
        vars.a = easyFactor()
        vars.b = randomInt(2, 11)
        vars.c = vars.a * vars.b
        correctAnswer = vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(5, 26)
        vars.b = randomInt(5, 26)
        vars.c = vars.a - vars.b
        correctAnswer = vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(11, 100)
        vars.b = randomInt(11, 100)
        vars.c = vars.a - vars.b
        correctAnswer = vars.c
    }
    return {
        type: "missingSumTwo",
        vars: vars,
        correctAnswer: vars.c,
        equationString: `${vars.a} x ${vars.b} = __`,
        instructions: instructions,
        inputType: "textField",
    }
    
}


// MISSING FACTOR

const missingFactorInstructions = [
    "What's missing?",
    "Times what?"
]
function missingFactorTwo(difficulty) {
    
}
function missingFactorThree(difficulty) {

}


// MISSING DIVIDEND

// MISSING DIVISOR

// MISSING QUOTIENT



export function getProductOfTwoFact(difficulty) {
    if (difficulty === "easy") {
        let a = easyFactor()
        let b = randomInt(2, 11)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "medium") {
        let a = randomInt(5, 25)
        let b = randomInt(5, 25)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "hard") {
        let a = randomInt(11, 100)
        let b = randomInt(11, 100)
        let c = a * b
        return [a, b, c]
    }
    else { console.error(`getProductOfTwoFact called with Invalid difficulty: "${difficulty}".`) }
}

const primeFactor = () => chooseRandomFromArray([2, 3, 5, 7, 11, 13])

export function getProductOfThreeFact(difficulty) {

    if (difficulty === "easy") {
        let a = randomInt(2, 11)
        let b = randomInt(2, 11)
        let c = randomInt(2, 11)
        let d = a * b * c
        return [a, b, c, d]
    }
    else if (difficulty === "medium") {
        let a = randomInt(12, 99)
        let b = randomInt(2, 11)
        let c = randomInt(2, 11)
        let d = a * b * c
        return [a, b, c, d]
    }
    else if (difficulty === "hard") {
        let a = randomInt(12, 100)
        let b = easyFactor()
        let c = randomInt(2, 100)
        let d = a * b * c
        return [a, b, c, d]
    }
    else { console.error(`getSumOfThreeFact called with Invalid difficulty: "${difficulty}".`) }
}

// Mult
export function missingProductTwgfo(difficulty) {
    let vars = getProductOfTwoFact(difficulty)
    return {
        type: "missingProductTwo",
        difficulty: difficulty,
        vars: vars,
        correctAnswer: vars[2],
        equationString: `${vars[0]} x ${vars[1]} = __`,
        instructions: chooseRandomFromArray(missingProductInstructions),
        inputType: "textField",
    }
}
export function missingProductTfhree(difficulty) {
    let vars = getProductOfThreeFact(difficulty)
    return {
        type: "missingSumThree",
        vars: vars,
        correctAnswer: vars[3],
        equationString: `${vars[0]} x ${vars[1]} x ${vars[2]} = __`,
        instructions: chooseRandomFromArray(missingProductInstructions),
        inputType: "textField",
    }
}

export function missingFajctorTwo(difficulty) {
    let vars = getProductOfTwoFact(difficulty)
    return {
        type: "missingFactorTwo",
        vars: vars,
        correctAnswer: vars[1],
        equationString: `${vars[0]} x __ = ${vars[2]}`,
        instructions: chooseRandomFromArray(missingFactorInstructions),
        inputType: "textField",
    }
}
export function missinggFactorThree(difficulty) {
    let vars = getProductOfThreeFact(difficulty)
    return {
        type: "missingFactorThree",
        vars: vars,
        correctAnswer: vars[1],
        equationString: `${vars[0]} x __ x ${vars[2]} = ${vars[3]}`,
        instructions: chooseRandomFromArray(missingFactorInstructions),
        inputType: "textField",
    }
}