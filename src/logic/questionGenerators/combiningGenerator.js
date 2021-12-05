// Exports helpers for when questionGenerator has selected the "combining" topic

import { randomInt, chooseRandomFromArray } from "../lowLevelHelpers";





const missingMinuendInstructions = [
    "Minus how many?",
    "Take away what?",
    "How far apart?",
]
const howFarApart = [
    "How far apart?"
]


// Takes a difficulty param: easy medium or hard

// some types only occur in hard mode such as 3 part sums and products
export function getCombiningQuestion(difficulty) {
    console.assert((difficulty === "easy" || difficulty === "medium" || difficulty === "hard"), `getCombiningQuestion recieved invalid difficulty ${difficulty}` )
    console.log(`Generating Combining Question of difficulty ${difficulty}`)
    let combiningQuestionTypes = [
        missingSum,
        missingDifference, 
        missingAddend,
        // "combineAndCompare",   // a + b _ c - d
        // "missingMinuend",     // a - _ = c
        // "howFarApart",        // a and b
    ]
    let randomIndex = randomInt(0, combiningQuestionTypes.length)
    return combiningQuestionTypes[randomIndex](difficulty)
}


function missingSum(difficulty) {
    const instructions = [
        "Add",
        "What's the Sum?",
        "Find the Total"
    ]

    if (difficulty === "easy") {
        let a = randomInt(5, 75)
        let b = randomInt(5, 25)
        let c = a + b
        let vars = [a, b, c]
        return {
            type: "missingSumTwo",
            vars: vars,
            correctAnswer: vars[2],
            equationString: `${vars[0]} + ${vars[1]} = __`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
    else if (difficulty === "medium") {
        let a = randomInt(20, 100)
        let b = randomInt(20, 100)
        let c = a + b
        let vars = [a, b, c]
        return {
            type: "missingSumTwo",
            vars: vars,
            correctAnswer: vars[2],
            equationString: `${vars[0]} + ${vars[1]} = __`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
    else if (difficulty === "hard") {
        let a = randomInt(50, 200)
        let b = randomInt(1, 100)
        let c = randomInt(10, 100)
        let d = a + b + c
        let vars = [a, b, c, d]
        return {
            type: "missingSumThree",
            vars: vars,
            correctAnswer: vars[3],
            equationString: `${vars[0]} + ${vars[1]} + ${vars[2]} = __`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
}

function missingDifference(difficulty) {
    const instructions = [
        "Subtract",
        "How far apart?",
        "Find the Difference",
        "How much is left?"
    ]

    let vars = {}
    let equationString = ""
    let correctAnswer 

    if (difficulty === "easy") {
        vars.a = randomInt(20, 80)
        vars.b = randomInt(5, 20)
        vars.c = vars.a - vars.b
        equationString = `${vars.a} - ${vars.b} = __`
        correctAnswer = vars.c
    }
    else if (difficulty === "medium") {
        vars.a = randomInt(100, 300)
        vars.b = randomInt(5, 100)
        vars.c = vars.a - vars.b
        equationString = `${vars.a} - ${vars.b} = __`
        correctAnswer = vars.c
    }
    else if (difficulty === "hard") {
        vars.a = randomInt(200, 1000)
        vars.b = randomInt(20, 200)
        vars.c = vars.a - vars.b
        equationString = `${vars.a} - ${vars.b} = __`
        correctAnswer = vars.c
    }
    return {
        type: "missingDifference",
        vars: vars,
        equationString: equationString,
        correctAnswer: correctAnswer,
        instructions: chooseRandomFromArray(instructions),
        inputType: "textField",
    }
}

function missingAddend(difficulty) {
    const instructions = [
        "What's missing?",
        "How many more?"
    ]
        
    if (difficulty === "easy") {
        let a = randomInt(1, 75)
        let b = randomInt(1, 25)
        let c = a + b
        let vars = [a, b, c]
        return {
            type: "missingAddendTwo",
            vars: vars,
            correctAnswer: vars[1],
            equationString: `${vars[0]} + __ = ${vars[2]}`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
    else if (difficulty === "medium") {
        let a = randomInt(20, 100)
        let b = randomInt(20, 100)
        let c = a + b
        let vars = [a, b, c]
        return {
            type: "missingAddendTwo",
            vars: vars,
            correctAnswer: vars[1],
            equationString: `${vars[0]} + __ = ${vars[2]}`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
    else if (difficulty === "hard") {
        let a = randomInt(50, 100)
        let b = randomInt(1, 100)
        let c = randomInt(1, 50)
        let d = a + b + c
        let vars = [a, b, c, d]
        return {
            type: "missingAddendThree",
            vars: vars,
            correctAnswer: vars[1],
            equationString: `${vars[0]} + __ + ${vars[2]} = ${vars[3]}`,
            instructions: chooseRandomFromArray(instructions),
            inputType: "textField",
        }
    }
}


