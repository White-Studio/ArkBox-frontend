export const sleep = ms => new Promise(r => setTimeout(r, ms));


export function genID() {
    let num = "";
    for (let x in [...Array(5)]) {
        num += (Math.floor(Math.random()*10)).toString()
    }
    return num
}
