export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function genID() {
    return Math.round(Math.random()*1000000000)
}