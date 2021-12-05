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

// Mult
const easyFactor = () => chooseRandomFromArray([2,3,4,5,6,7,8,9,10,15,20,25,30,40,50,60])
export function getProductOfTwoFact(difficulty) {
    if (difficulty === "easy") {
        let a = easyFactor()
        let b = randomInt(2, 11)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "medium") {
        let a = randomInt(5, 25)
        let b = randomInt(5, 25)
        let c = a * b
        return [a, b, c]
    }
    else if (difficulty === "hard") {
        let a = randomInt(11, 100)
        let b = randomInt(11, 100)
        let c = a * b
        return [a, b, c]
    }
    else { console.error(`getProductOfTwoFact called with Invalid difficulty: "${difficulty}".`) }
}

const primeFactor = () => chooseRandomFromArray([2, 3, 5, 7, 11, 13])

export function getProductOfThreeFact(difficulty) {
    
    if (difficulty === "easy") {
        let a = randomInt(2, 11)
        let b = randomInt(2, 11)
        let c = randomInt(2, 11)
        let d = a * b * c
        return [a, b, c, d]
    }
    else if (difficulty === "medium") {
        let a = randomInt(12, 99)
        let b = randomInt(2, 11)
        let c = randomInt(2, 11)
        let d = a * b * c
        return [a, b, c, d]
    }
    else if (difficulty === "hard") {
        let a = randomInt(12, 100)
        let b = easyFactor()
        let c = randomInt(2, 100)
        let d = a * b * c
        return [a, b, c, d]
    }
    else { console.error(`getSumOfThreeFact called with Invalid difficulty: "${difficulty}".`) }
}