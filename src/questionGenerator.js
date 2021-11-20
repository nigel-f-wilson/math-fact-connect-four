export function getQuestion(mathTopics, columnIndex) {
    const mathTopicsArray = Object.keys(mathTopics).filter(key => mathTopics[key] === true)
    const topic = chooseRandomFromArray(mathTopicsArray)
    const difficultyLevel = getDifficultyLevel(columnIndex)
    console.log(`Topic: ${topic}`);
    console.log(`difficultyLevel: ${difficultyLevel}`);


    let question = {
        'inputFormat': 'text-field',  // 'text-field' or 'button'
        'answer': null,
        'a': null,
        'b': null,
        'c': null,
        'd': null,
    }
    if (topic === "combining") {
        question = getCombiningQuestion(difficultyLevel)
    }
    else if (topic === "multiplying") {
        question = getMultiplyingQuestion(difficultyLevel)
    }
    else if (topic === "fractions") {
        question = getFractionsQuestion(difficultyLevel)
    }
    else if (topic === "exponents") {
        question = getExponentsQuestion(difficultyLevel)
    }
    else if (topic === "algebra") {
        question = getAlgebraQuestion(difficultyLevel)
    }
    else {
        console.error(`FAILED TO GET QUESTION!!!`)
    }
    console.log(`QUESTION: ${JSON.stringify(question)}`)
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
function getDifficultyLevel(columnIndex) {
    if (columnIndex < 4) {
        return columnIndex
    }
    else if (columnIndex === 4) {
        return 2
    }
    else if (columnIndex === 5) {
        return 1
    } 
    else if (columnIndex === 6) {
        return 0
    } else {
        return "error"
    }
}

function getCombiningQuestion(difficultyLevel) {
    let question = {
        'inputFormat': 'text-field',
        'answer': null,
        'a': null,
        'b': null,
        'c': null,
        'd': null,
    }
    if (difficultyLevel === 0) {
        question.a = randomInt(1, 100)
        question.b = randomInt(1, 100)
        question.c = question.a + question.b
        question.blank = 'c'
        question.answer = question.c 
    }
    else if (difficultyLevel === 1) {
        question.a = randomInt(1, 100)
        question.b = randomInt(1, 100)
        question.c = question.a + question.b
        question.blank = 'c'
        question.answer = question.c
    }
    else if (difficultyLevel === 2) {
        question.a = randomInt(1, 100)
        question.b = randomInt(1, 100)
        question.c = question.a + question.b
        question.blank = 'c'
        question.answer = question.c
    } else if (difficultyLevel === 3) {
        return 0
    } else {
        return "error"
    }
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