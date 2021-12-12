import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";
import { getCombiningQuestion } from "./combiningGenerator";
import { getMultiplyingQuestion } from "./multiplyingGenerator";
// import { getFractionsQuestion } from "./fractionsGenerator";


export function testQuestion() {
    let vars = [1, 2, 3, 6]
    return {
        type: "missingSumThree",
        vars: vars,
        correctAnswer: vars[3],
        equationString: `${vars[0]} + ${vars[1]} + ${vars[2]} = __`,
        instructions: "Test Question",
        inputType: "textField",
    }
}

let generatorFuntions = new Map([
    ['combine', getCombiningQuestion],
    ['multiply', getMultiplyingQuestion]
])


export function generateQuestion(topic, difficulty) {
    return new Promise((resolve, reject) => {
        let question = (generatorFuntions.get(topic)(difficulty))
        console.log(`Generated an "${difficulty}" ${topic} Question --> ${JSON.stringify(question, null, 4)}`);
        resolve(question)
    });
}

function getExponentsQuestion(difficulty) {

}
function getAlgebraQuestion(difficulty) {

}

function getEquationString(type, vars) {
    let questionTypeToEquationStringMap = new Map([
        ["missingProductTwo", `${vars[0]} x ${vars[1]} = __}`],
        ["missingFactorTwo", `${vars[0]} x __ = ${vars[2]}`],
        ["completeMultiplication", `${vars[0]} x ${vars[1]} = ${vars[2]} x __`],
        ["compareFractions", "FRACTIONS NOT BUILT YET"],
        ["compareSums", `${vars[0]} + ${vars[1]} __ ${vars[2]} + ${vars[3]}`],
        ["divisibility", "divisibilityCheckboxes NOT BUILT YET"],
    ])
    if (questionTypeToEquationStringMap.has(type)) {
        console.log(`Equation String: ${questionTypeToEquationStringMap.get(type)}`);
        return questionTypeToEquationStringMap.get(type)
    }
    else {
        console.error(`Failed to getEquationString with type: "${type}" and vars: "${vars}"`)
    }
}

function getInputType(type) {
    let questionTypeToInputTypeMap = new Map([
        ["missingSumTwo", "textField"],
        ["missingSumThree", "textField"],
        ["missingAddendTwo", "textField"],
        ["missingAddendThree", "textField"],
        ["missingProductTwo", "textField"],
        ["missingFactorTwo", "textField"],
        ["completeMultiplication", "textField"],
        ["compareFractions", "compareButtons"],
        ["compareSums", "compareButtons"],
        ["divisibility", "divisibilityCheckboxes"],
    ])
    if (questionTypeToInputTypeMap.has(type)) {
        // console.log(`Input Type: ${questionTypeToInputTypeMap.get(type)}`);
        return questionTypeToInputTypeMap.get(type)
    }
    else {
        console.error(`Failed to getInputType with type: "${type}"`)
    }
}

function getCorrectAnswer(type, vars) {
    if (vars === undefined) {
        console.error(`Correct Answer called with no Vars.`);
        return -1
    }
    let questionTypeToCorrectAnswerMap = new Map([
        ["missingSumTwo", vars[vars.length - 1]],
        ["missingSumThree", vars[vars.length - 1]],
        ["missingAddendTwo", vars[1]],
        ["missingAddendThree", vars[1]],
        ["missingProductTwo", vars[vars.length - 1]],
        ["missingFactorTwo", vars[1]],
        ["completeMultiplication", vars[3]],
        ["compareFractions", "compareButtons"],
        ["compareSums", "compareButtons"],
        ["divisibility", "divisibilityCheckboxes"]
    ])
    if (questionTypeToCorrectAnswerMap.has(type)) {
        const correctAnswer = questionTypeToCorrectAnswerMap.get(type)
        console.log(`Correct Answer: ${correctAnswer}`);
        return correctAnswer
    }
    else {
        console.error(`Failed to getCorrectAnswer with type: "${type}" and vars: "${vars}"`)
    }
}

function getInstructions(type) {
    let questionTypeToInstructionsMap = new Map([
        ["double", chooseRandomFromArray(["Double it!", "Add it to itself"])],
        ["triple", chooseRandomFromArray(["Triple it!", "Three of them"])],
        ["quadruple", chooseRandomFromArray(["Quadruple it!", "Double double it!"])],
        ["half", chooseRandomFromArray(["Half it!", "Add it to itself"])],
        ["third", chooseRandomFromArray(["What's a third of", "Cut in three"])],
        ["quarter", chooseRandomFromArray(["Quarter it!", "Half half it!", "What's a fourth of"])],

        ["missingProductTwo", chooseRandomFromArray(["Find the Product.", "Multiply."])],
        ["missingFactorTwo", chooseRandomFromArray(["What's missing?", "How many groups?"])],
        ["completeMultiplication", chooseRandomFromArray(["Find that factor!", "How many copies?"])],
        ["compareFractions", chooseRandomFromArray(["Which is more?", "Compare", "Which is greater?"])],
        ["compareSums", chooseRandomFromArray(["Which is more?", "Compare", "Which is greater?"])],
        ["divisibility", chooseRandomFromArray(["Is divisible by...", "Is a multiple of..."])],
    ])
    if (questionTypeToInstructionsMap.has(type)) {
        const instructions = questionTypeToInstructionsMap.get(type)
        console.log(`Instructions for Question type "${type}"--> "${instructions}"`);
        return instructions
    }
    else {
        console.error(`Failed to getInstructions with type: "${type}"`)
    }
}