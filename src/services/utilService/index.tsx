
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
const serialize = (obj: any) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            let name = encodeURIComponent(p);
            let value = encodeURIComponent(obj[p])
            if (typeof obj[p] == 'object') {
                value = encodeURIComponent(JSON.stringify(obj[p]))
            }
            str.push(name + "=" + value);
        }
    return str.join("&");
}

export default {
    serialize,
    objectMap,
    checkSamePath
}