import { randomInt, chooseRandomFromArray } from "./lowLevelHelpers";

export function generateQuestion(topic, difficulty) {
    let question
    if (topic === "combining") {
        question = getCombiningQuestion(difficulty)
        console.log(`QUESTION: ${JSON.stringify(question)}`)

    }
    else if (topic === "multiplying") {
        question = getMultiplyingQuestion(difficulty)
        console.log(`QUESTION: ${JSON.stringify(question)}`)

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
    
    let fact = getCombiningFact(difficultyLevel)  // This is where the difficukty level influences the number of terms and their range
    
    let type = "missingSum"
    let missingSumInstructions = "What's the Sum?" // total

    
    // let types = ["missingSumTwo", "missingAddendTwo", "missingSumThree", "missingAddendThree"]
    // let type = types[difficultyLevel]
    console.log(`getCombiningQuestion chose TYPE: ${type}`);

    // let instructions = chooseRandomFromArray()
    
    let question = {
        type: type,
        // answerInputType: 'textField',
        // instructions: missingSumInstructions,
        fact: fact,
        // formatString: 'a + b = c',  // Change this to use Latex
        // vars: [1, 2, 3],
        // missingVar: 2,
    }
    
    console.log(`COMBINING QUESTION: ${JSON.stringify(question)}`);
    return question
}

// Returns a 3 or 4 element array where the last element is the sum of the others
function getCombiningFact(difficultyLevel) {
    let a = randomInt(1, 99)
    let b = randomInt(1, 99)
    let c = a + b
    return [a,b,c]
}


function getMultiplyingQuestion(difficultyLevel) {

}
function getFractionsQuestion(difficultyLevel) {

}
function getExponentsQuestion(difficultyLevel) {

}
function getAlgebraQuestion(difficultyLevel) {

}

export function getInstructions(questionType) {
    if (questionType === "missingSum") {
        return chooseRandomFromArray([
            "What's the Sum?",
            "Find the Total"
        ])
    }
}


export function getEquationString(question) {
    const { type, fact } = question
    if (type === "missingSum") {
        return (`${fact[0]} + ${fact[1]} = __`)
    }
    else {
        console.error(`Failed to getEquationString with question: ${JSON.stringify(question)}`);
    }
}

export function getInputType(question) {
    const { type, fact } = question
    // There's a neater way to do this using a Map instead of all these if elses
    if (type === "missingSum") {
        return "textField"
    }
    else if (type === "missingAddend") {
        return "textField"
    }
    else if (type === "compareFractions") {
        return "compareButtons"
    }
    else {
        console.error(`Failed to getEquationString with question: ${JSON.stringify(question)}`);
    }
}

export function getCorrectAnswer(question) {
    const { type, fact } = question
    // There's a neater way to do this using a Map instead of all these if elses
    if (type === "missingSum") {
        return fact[fact.length - 1]
    }
    else if (type === "missingAddend") {
        return fact[1]
    }
    else if (type === "compareFractions") {
        return (fact[0] > fact[1]) // TODO
    }
    else {
        console.error(`Failed to getEquationString with question: ${JSON.stringify(question)}`);
    }
}