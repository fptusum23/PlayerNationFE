
const checkSamePath = (pathA: string, pathB: string) => {
    return pathA.startsWith(pathB) || pathB.startsWith(pathA)
}
const objectMap = (object: any, otherObject: any) => {
    for (var key in object) {
        if (otherObject.hasOwnProperty(key)) {
            object[key] = otherObject[key]
        }
    }
}

export default {
    objectMap,
    checkSamePath
}