import { randomInt, chooseRandomFromArray } from "./lowLevelHelpers";


export function getSumOfTwoFact(difficulty) {
    if (difficulty === "easy") {
        let a = randomInt(2, 60)
        let b = randomInt(2, 25)
        let c = a + b
        return [a, b, c]
    }
    else if (difficulty === "medium") {
        let a = randomInt(60, 300)
        let b = randomInt(6, 120)
        let c = a + b
        return [a, b, c]
    }
    else if (difficulty === "hard") {
        let a = randomInt(50, 900)
        let b = randomInt(50, 300)
        let c = a + b
        return [a, b, c]
    }
    else { console.error(`getSumOfTwoFact called with Invalid difficulty: "${difficulty}".`) }
}
export function getSumOfThreeFact(difficulty) {
    if (difficulty === "easy") {
        let a = randomInt(2, 33)
        let b = randomInt(2, 33)
        let c = randomInt(2, 33)
        let d = a + b + c
        return [a, b, c, d]
    }
    else if (difficulty === "medium") {
        let a = randomInt(12, 99)
        let b = randomInt(12, 33)
        let c = randomInt(12, 66)
        let d = a + b + c
        return [a, b, c, d]
    }
    else if (difficulty === "hard") {
        let a = randomInt(60, 600)
        let b = randomInt(21, 60)
        let c = randomInt(21, 100)
        let d = a + b + c
        return [a, b, c, d]
    }
    else { console.error(`getSumOfThreeFact called with Invalid difficulty: "${difficulty}".`) }
}