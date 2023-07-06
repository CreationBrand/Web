
let times: any = {
    second: 's',
    minute: 'm',
    hour: 'h',
    day: 'd',
    week: 'w',
    month: 'M',
    year: 'Y',
}


export const formatTime = (a: any, b: any, c: any, d: any) => {
    return ` • ${a}${times[b]}`
};