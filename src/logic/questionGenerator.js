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


function chooseRandomFromArray(array) {
    let randomIndex = Math.floor((Math.random() * array.length))
    return array[randomIndex]
}
function randomInt(min, max) { //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getCombiningQuestion(difficultyLevel) {
    console.log(`getCombiningQuestion called!!!`);

    let question = {
        topic: 'combining',
        answerInputType: 'textField',
        instructions: "What's missing?",
        formatString: 'a + b = c',  // Change this to use Latex
        vars: [1, 2, 3],
        missingVar: 2,
    }
    // if (difficultyLevel === 0) {
    //     question.a = randomInt(1, 100)
    //     question.b = randomInt(1, 100)
    //     question.c = question.a + question.b
    //     question.blank = 'c'
    //     question.answer = question.c 
    // }
    // else if (difficultyLevel === 1) {
    //     question.a = randomInt(1, 100)
    //     question.b = randomInt(1, 100)
    //     question.c = question.a + question.b
    //     question.blank = 'c'
    //     question.answer = question.c
    // }
    // else if (difficultyLevel === 2) {
    //     question.a = randomInt(1, 100)
    //     question.b = randomInt(1, 100)
    //     question.c = question.a + question.b
    //     question.blank = 'c'
    //     question.answer = question.c
    // } else if (difficultyLevel === 3) {
    //     return 0
    // } else {
    //     return "error"
    // }
    console.log(`COMBINING QUESTION: ${JSON.stringify(question)}`);
    return question
}
function getMultiplyingQuestion(difficultyLevel) {

}
function getFractionsQuestion(difficultyLevel) {

}
function getExponentsQuestion(difficultyLevel) {

}
function getAlgebraQuestion(difficultyLevel) {

}