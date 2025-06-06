



export function isString(value:any) {
  return typeof value === 'string';
}



export function getTimeStamp(){
    const ms = Date.now();
    const iso = new Date(ms).toISOString();
    console.log(iso);
    return iso;
}