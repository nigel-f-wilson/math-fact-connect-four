import { randomInt, chooseRandomFromArray } from "./lowLevelHelpers";

export function generateQuestion(topic, difficulty) {
    let question
    if (topic === "combining") {
        question = getCombiningQuestion(difficulty)
    }
    else if (topic === "multiplying") {
        question = getMultiplyingQuestion(difficulty)
    }
    // else if (topic === "fractions") {
    //     question = getFractionsQuestion(difficultyLevel)
    // }
    // else if (topic === "exponents") {
    //     question = getExponentsQuestion(difficultyLevel)
    // }
    // else if (topic === "algebra") {
    //     question = getAlgebraQuestion(difficultyLevel)
    // }
    else {
        console.error(`FAILED TO GET QUESTION!!!`)
    }
    return question

}

function getCombiningQuestion(difficultyLevel) {
    let types = [
        "missingSumTwo",
        "missingAddendTwo",
        // "combineAndCompare"   // a + b _ c - d
        // "missingDifference",  // a - b = _
        // "missingMinuend",     // a - _ = c
        // "howFarApart",        // a and b
        "missingSumThree",
        "missingAddendThree",
    ]
    
    let type = chooseRandomFromArray(types)
    let vars = getCombiningFact(type, difficultyLevel) 
    let correctAnswer = getCorrectAnswer(type, vars)
    let instructions = getInstructions(type)
    let equationString = getEquationString(type, vars)
    let inputType = getInputType(type, vars)

    let question = {
        type: type,
        vars: vars,
        correctAnswer: correctAnswer,
        instructions: instructions,
        equationString: equationString,
        inputType: inputType,
    }
    return question
    
    
    
}


// Returns a 3 or 4 element array where the last element is the sum of the others
function getCombiningFact(type, difficultyLevel) {
    const getEasyAddend = () => { return randomInt(1, 20)  }
    const getMediumAddend = () => { return randomInt(20, 99) }
    const getHardAddend = () => { return randomInt(99, 999) }
    
    // A + B = C
    if (["missingSumTwo", "missingAddendTwo"].includes(type)) {
        let a = (difficultyLevel === "hard") ? getHardAddend() : getMediumAddend()
        let b = (difficultyLevel === "easy") ? getEasyAddend() : getMediumAddend()
        let c = a + b
        console.log(`Combining Vars of difficulty "${difficultyLevel}": ${[a, b, c]}`);
        return [a, b, c]
    }
    else {
        console.error(`Failed to get combining fact of difficulty Level "${difficultyLevel}"`);
    }
}


function getMultiplyingQuestion(difficultyLevel) {

}
function getFractionsQuestion(difficultyLevel) {

}
function getExponentsQuestion(difficultyLevel) {

}
function getAlgebraQuestion(difficultyLevel) {

}

// export function getInstructions(questionType) {
//     if (questionType === "missingSum") {
//         return chooseRandomFromArray([
//             "What's the Sum?",
//             "Find the Total"
//         ])
//     }
// }


function getEquationString(type, vars) {
    let questionTypeToEquationStringMap = new Map([
        ["missingSumTwo", `${vars[0]} + ${vars[1]} = __`],
        ["missingSumThree", `${vars[0]} + ${vars[1]} + ${vars[2]} = __`],
        ["missingAddendTwo", `${vars[0]} + __ = ${vars[2]}`],
        ["missingAddendThree", `${vars[0]} + __ + ${vars[2]} = ${vars[3]}`],
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

        ["missingSumTwo", chooseRandomFromArray(["What's the Sum?", "Find the Total."])],
        ["missingSumThree", chooseRandomFromArray(["What's the Sum?", "Find the Total."])],
        ["missingAddendTwo", chooseRandomFromArray(["What's missing?", "How many more?"])],
        ["missingAddendThree", chooseRandomFromArray(["What's missing?", "How many more?"])],
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