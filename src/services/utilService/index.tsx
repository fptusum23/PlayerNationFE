
const checkSamePath = (pathA: string, pathB: string) => {
    return pathA.startsWith(pathB) || pathB.startsWith(pathA)
}


export default {
    checkSamePath
}