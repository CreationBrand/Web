
//@ts-ignore
// console.log = console.group = console.time = Boolean(process.env.REACT_APP_MODE !== 'development');
// if (DEBUG) console.log = function() {}

let types: any = {
    SYSTEM: "font-weight:900; color: #1ffa02",
    SESSION: "font-weight:900; color: #a702fa",
    COGNITO: "font-weight:900; color: #faa702",
    REST: "font-weight:900; color: #02fab0;",
    STATE:  "font-weight:900; color: #fa0202",
}

export const timeStart = (type: string, label: string) => {
    console.groupCollapsed(`%c[ ${type} ] `, types[type], label)
    console.time(label)
}
export const timeEnd = (type: string, label: string) => {
    console.timeEnd(label);
    console.groupEnd();
}
export const log = (type: string, label: string) => {
    console.log(`%c[ ${type} ]`, ` ${types[type]}`, label)
}

export const logStatus = (type: string, label: string, status: boolean) => {
    console.log(`%c[ ${type} ]`, ` ${types[type]} ${status ? 'background:#285735;' : 'background:#572828'}`, label)
}
