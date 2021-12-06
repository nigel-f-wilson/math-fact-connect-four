

export function chooseRandomFromArray(array) {
    let randomIndex = randomInt(0, array.length)
    let choice = array[randomIndex]
    // console.log(`CHOICE: ${choice}`);
    return choice
}

export function randomInt(min, max) { //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

// ADD a method to pick "randomly" from weighted distributions/
// based on an array of tuples.