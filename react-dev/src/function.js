export const sleep = ms => new Promise(r => setTimeout(r, ms));


export function genID() {
    let num = "";
    [...Array(5)].forEach(() => {
        num += (Math.floor(Math.random()*10)).toString()
    });
    return num
}
