// Exports helpers for when questionGenerator has selected the "multiplying" topic

import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";


export function getMultiplyingQuestion(difficulty) {
    let multiplyingQuestionTypes = [
        missingProduct,
        missingFactor,
        missingProductTwo,
        missingProductThree,
        missingFactorTwo,
        missingFactorThree,
    ]
    let randomIndex = randomInt(0, multiplyingQuestionTypes.length)
    return multiplyingQuestionTypes[randomIndex](difficulty)
}


const easyFactor = () => chooseRandomFromArray([2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60])


const missingProductInstructions = [
    "Multiply",
    "Find the Product",
]
const missingFactorInstructions = [
    "What's missing?",
    "Times what?"
]

function missingProduct(difficulty) {
    if (difficulty === "easy") {        // 2 factors 2 thru 10
        let a = easyFactor()
        let b = randomInt(2, 11)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "medium") { // 2
        let a = randomInt(5, 25)
        let b = randomInt(5, 25)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "hard") {   // 3 part 
        let a = randomInt(11, 100)
        let b = randomInt(11, 100)
        let c = a * b
        return [a, b, c]
    }
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


function missingFactor(difficulty) {
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





// Mult


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
export function missingProductTwo(difficulty) {
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
export function missingProductThree(difficulty) {
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

export function missingFactorTwo(difficulty) {
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
export function missingFactorThree(difficulty) {
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