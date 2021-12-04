import { chooseRandomFromArray } from "./lowLevelHelpers";
import {
    missingSumInstructions,
    missingAddendInstructions,
    missingDifferenceInstructions,
    missingMinuendInstructions,
    howFarApart,
    missingProductInstructions,
    missingFactorInstructions
} from "./instructionsAndFeedbackStrings";
import {
    getSumOfTwoFact,
    getSumOfThreeFact
} from "./factFamilyGenerators";

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