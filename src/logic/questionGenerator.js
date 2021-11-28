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




// const combiningQuestionTypes = [
//     "missingSum",
//     "What's the missing addend?",
//     "What's the difference?",
//     "How far apart?"

// ]
// const combiningQuestionInstructions = [
//     "What's the sum?",
//     "What's the missing addend?",
//     "What's the difference?",
//     "How far apart?"

// ]


function getCombiningQuestion(difficultyLevel) {
    let types = [
        "missingSumTwo",
        "missingAddendTwo",
        // "combineAndCompare"   // a + b _ c - d
        // "missingDifference",  // a - b = _
        // "missingMinuend",     // a - _ = c
        // "howFarApart",        // a and b
        // "missingSumThree",
        // "missingAddendThree",
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
    const typeOnes = ["missingSumTwo", "missingAddendTwo" ] // A + B = C
    if (typeOnes.includes(type)) {
        let a = randomInt(1, 99)
        let b = randomInt(1, 99)
        let c = a + b
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
    if (type === "missingSumTwo") {
        return (`${vars[0]} + ${vars[1]} = __`)
    }
    else if (type === "missingAddendTwo") {
        return (`${vars[0]} + __ = ${vars[2]}`)
    }
    else if (type === "missingSumThree") {
        return (`${vars[0]} + ${vars[1]} + ${vars[2]} = __`)
    }
    else if (type === "missingAddendThree") {
        return (`${vars[0]} + __ + ${vars[2]} = ${vars[3]}`)
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
    if (type === "missingSumTwo") {
        return vars[vars.length - 1]
    }
    else if (type === "missingSumThree") {
        return vars[vars.length - 1]
    }
    else if (type === "missingAddendTwo") {
        return vars[1]
    }
    else if (type === "compareFractions") {
        return (vars[0] > vars[1]) // TODO
    }
    else {
        console.error(`Failed to getCorrectAnswer with type: "${type}" and vars: "${vars}"`)
    }
}

function getInstructions(type) {
    
    
    if (type === "missingSumTwo" || type === "missingSumThree") {
        return chooseRandomFromArray(["What's the Sum?", "Find the Total."])
    }
    else if (type === "missingAddendTwo" || type === "missingAddendThree") {
        return chooseRandomFromArray(["What's missing?", "How many more?"])
    }
    else if (type === "compareSums" || type === "compareFractions") {
        return chooseRandomFromArray(["Compare", "Which is more?"])
    }
    else {
        console.error(`Failed to getCorrectAnswer with type: "${type}"`)
    }
    
    
    let instructionsList = [
        "What's the Sum?",
        "Find the Total.",
    ]

}