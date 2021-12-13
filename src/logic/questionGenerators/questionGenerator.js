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

// function getSequencesQuestion(difficulty) {

// }
// function getFractionsQuestion(difficulty) {

// }
// function getExponentsQuestion(difficulty) {

// }

