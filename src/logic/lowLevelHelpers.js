export function chooseRandomFromArray(array) {
    let randomIndex = Math.floor((Math.random() * array.length))
    return array[randomIndex]
}
export function randomInt(min, max) { //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}