

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



export function weightedChoice(choicePercents, arrayToChooseFrom) {
    let randomIndex = randomInt(0, arrayToChooseFrom.length)
    let choice = arrayToChooseFrom[randomIndex]
    // console.log(`CHOICE: ${choice}`);
    return choice
}

// This function could be made more efficient through using sorted arrays and pointers that 
// enabled us to not re-scan the leading portion of setTwo when we know we are looking for a 
// higher number it only makes sense to look in higher indices. Besides that, early returns 
// could be added in case the lowest or highest numbers in setOne fall outside the range of 
// setTwo. This intersect is being made with setOne.length === 4 (cells in line) and a 
// potentially much longer setTwo (player's numbers)
export function intersect(setOne, setTwo) {
    return setOne.filter(item => setTwo.includes(item))
}