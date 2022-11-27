 export function dateToSeconds(date) {
    const dDate = new Date(date);
    const hours = dDate.getHours();
    const minutes = dDate.getMinutes();
    const seconds = dDate.getSeconds();
    return hours * 3600 + minutes * 60 + seconds;
 }