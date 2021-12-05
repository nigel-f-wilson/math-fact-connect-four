// Exports helpers for when questionGenerator has selected the "combining" topic

import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";
import { 
    missingSumInstructions,
    missingAddendInstructions,
    missingDifferenceInstructions,
    missingMinuendInstructions,
    missingProductInstructions,
    missingFactorInstructions,

} from "./instructionsAndFeedbackStrings";


// Takes a difficulty param: easy medium or hard

// some types only occur in hard mode such as 3 part sums and products
export function getCombiningQuestion(difficulty) {
    let combiningQuestionTypes = [
        missingSumTwo,
        missingSumThree,
        missingAddendTwo,
        missingAddendThree,
        // "combineAndCompare",   // a + b _ c - d
        // "missingDifference",  // a - b = _
        // "missingMinuend",     // a - _ = c
        // "howFarApart",        // a and b
    ]
    let randomIndex = randomInt(0, combiningQuestionTypes.length)
    return combiningQuestionTypes[randomIndex](difficulty)
}


export function getSumOfTwoFact(difficulty) {
    const instructions = [
        "Add",
        "What's the Sum?",
        "Find the Total"
    ]
    if (difficulty === "easy") {
        let a = randomInt(2, 60)
        let b = randomInt(2, 25)
        let c = a + b
        return [a, b, c]
    }
    else if (difficulty === "medium") {
        let a = randomInt(60, 300)
        let b = randomInt(6, 120)
        let c = a + b
        return [a, b, c]
    }
    else if (difficulty === "hard") {
        let a = randomInt(50, 900)
        let b = randomInt(50, 300)
        let c = a + b
        return [a, b, c]
    }
    else { console.error(`getSumOfTwoFact called with Invalid difficulty: "${difficulty}".`) }
}
export function getSumOfThreeFact(difficulty) {
    const instructions = [
        "Subtract",
        "How far apart?",
        "Find the Difference",
        "How much is left?"
    ]
    if (difficulty === "easy") {
        let a = randomInt(2, 33)
        let b = randomInt(2, 33)
        let c = randomInt(2, 33)
        let d = a + b + c
        return [a, b, c, d]
    }
    else if (difficulty === "medium") {
        let a = randomInt(12, 99)
        let b = randomInt(12, 33)
        let c = randomInt(12, 66)
        let d = a + b + c
        return [a, b, c, d]
    }
    else if (difficulty === "hard") {
        let a = randomInt(60, 600)
        let b = randomInt(21, 60)
        let c = randomInt(21, 100)
        let d = a + b + c
        return [a, b, c, d]
    }
    else { console.error(`getSumOfThreeFact called with Invalid difficulty: "${difficulty}".`) }
}

export function missingSumTwo(difficulty) {
    let vars = getSumOfTwoFact(difficulty)
    return {
        type: "missingSumTwo",
        vars: vars,
        correctAnswer: vars[2],
        equationString: `${vars[0]} + ${vars[1]} = __`,
        instructions: chooseRandomFromArray(missingSumInstructions),
        inputType: "textField",
    }
}
export function missingSumThree(difficulty) {
    let vars = getSumOfThreeFact(difficulty)
    return {
        type: "missingSumThree",
        vars: vars,
        correctAnswer: vars[3],
        equationString: `${vars[0]} + ${vars[1]} + ${vars[2]} = __`,
        instructions: chooseRandomFromArray(missingSumInstructions),
        inputType: "textField",
    }
}

export function missingAddendTwo(difficulty) {
    let vars = getSumOfTwoFact(difficulty)
    return {
        type: "missingAddendTwo",
        vars: vars,
        correctAnswer: vars[1],
        equationString: `${vars[0]} + __ = ${vars[2]}`,
        instructions: chooseRandomFromArray(missingAddendInstructions),
        inputType: "textField",
    const instructions = [
        "What's missing?",
        "How many more?"
    ]
    }
}
export function missingAddendThree(difficulty) {
    let vars = getSumOfThreeFact(difficulty)
    return {
        type: "missingAddendThree",
        vars: vars,
        correctAnswer: vars[1],
        equationString: `${vars[0]} + __ + ${vars[2]} = ${vars[3]}`,
        instructions: chooseRandomFromArray(missingAddendInstructions),
        inputType: "textField",
    }
}