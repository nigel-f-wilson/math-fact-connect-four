import { randomInt, chooseRandomFromArray } from "./lowLevelHelpers";
import { 
    missingSumInstructions,
    missingAddendInstructions,
    missingDifferenceInstructions,
    missingMinuendInstructions,
    howFarApart,
    missingProductInstructions,
    missingFactorInstructions 
} from "./instructionsAndFeedbackStrings";
    missingSumTwo,
    missingSumThree,
    missingAddendTwo,
    missingAddendThree
} from "./questionTypes";

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
function determineDifficulty(score) {
    console.log(`determineDifficulty called with ${score} `);
    if (score < 6) {
        return "easy"
    }
    else if (score < 12) {
        return "medium"
    }
    else if (score >= 12) {
        return "hard"
    }
    else {
        console.error(`Invalid number of question right so far: ${score}`);
        return "error"
    }
}


export function generateQuestion(mathTopics, score) {
    // 1) pick topic from array of options
    // 2) determine difficulty based on score
    // 3) call topic specific question generator
    return new Promise((resolve, reject) => {
        const topic = chooseRandomFromArray(mathTopics)
        const difficulty = determineDifficulty(score)
        let question
        if (topic === "combining") {
            question = getCombiningQuestion(difficulty)
        }
        else if (topic === "multiplying") {
            question = getMultiplyingQuestion(difficulty)
        }
        // else if (topic === "fractions") {
        //     question = getFractionsQuestion(difficulty)
        // }
        // else if (topic === "exponents") {
        //     question = getExponentsQuestion(difficulty)
        // }
        // else if (topic === "algebra") {
        //     question = getAlgebraQuestion(difficulty)
        // }
        else {
            reject(`generateQuestion FAILED with topic "${mathTopics}" and score ${score}!`)
            // console.error(`generateQuestion FAILED with topic "${mathTopics}" and score ${score}!`)
        }
        console.log(`Generated an "${difficulty}" ${topic} Question --> ${JSON.stringify(question, null, 4)}`);

        resolve(question)
    });
    
}

function getCombiningQuestion(difficulty) {
    let types = [
        "missingSumTwo",
        "missingSumThree",
        "missingAddendTwo",
        "missingAddendThree",
        // "combineAndCompare",   // a + b _ c - d
        // "missingDifference",  // a - b = _
        // "missingMinuend",     // a - _ = c
        // "howFarApart",        // a and b
    ]
    let type = chooseRandomFromArray(types)
   
    const getEasyAddend = () => { return randomInt(1, 20) }
    const getMediumAddend = () => { return randomInt(20, 99) }
    const getHardAddend = () => { return randomInt(99, 999) }
    
    
    let question
    if (type === "missingSumTwo") {
        question = missingSumTwo(difficulty)
    }
    else if (type === "missingAddendTwo") {
        question = missingAddendTwo(difficulty)
    }
    else if (type === "missingSumThree") {
        question = missingSumThree(difficulty)
    } 
    else if (type === "missingAddendThree") {
        question = missingAddendThree(difficulty)
    }
    return question
    
    function getSumOfTwoFact(difficulty) {
        let a = (difficulty === "hard") ? getHardAddend() : getMediumAddend()
        let b = (difficulty === "easy") ? getEasyAddend() : getMediumAddend()
        let c = a + b
        // console.log(`Combining Vars of difficulty "${difficultyLevel}": ${[a, b, c]}`);
        return [a, b, c]
    }
    function getSumOfThreeFact(difficulty) {
        let a = (difficulty === "hard") ? getHardAddend() : getMediumAddend()
        let b = (difficulty === "easy") ? getEasyAddend() : getMediumAddend()
        let c = (difficulty === "hard") ? getEasyAddend() : getMediumAddend()
        let d = a + b + c
        return [a, b, c, d]
    }
    
}


// Returns a 3 or 4 element array where the last element is the sum of the others
function getCombiningFact(type, difficultyLevel) {
    const getEasyAddend = () => { return randomInt(1, 20)  }
    const getMediumAddend = () => { return randomInt(20, 99) }
    const getHardAddend = () => { return randomInt(99, 999) }
    
    // A + B = C
    if (["missingSumThree", "missingAddendThree"].includes(type)) {
        let a = (difficultyLevel === "hard") ? getHardAddend() : getEasyAddend()
        let b = (difficultyLevel === "easy") ? getEasyAddend() : getMediumAddend()
        let c = (difficultyLevel === "easy") ? getEasyAddend() : getMediumAddend()
        let d = a + b + c
        console.log(`Combining Vars of difficulty "${difficultyLevel}": ${[a, b, c, d]}`);
        return [a, b, c, d]
    }
    else {
        console.error(`Failed to get combining fact of type: "${type}" difficulty Level "${difficultyLevel}"`);
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

function getEquationString(type, vars) {
    let questionTypeToEquationStringMap = new Map([
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