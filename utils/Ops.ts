


export const sumListDictionnaire = (object:Record<string,number>[]) => {
    let sumResultQuantite:number = 0;
    const lenghtObject = object.length;

    for (let i = 0; i< lenghtObject; i++){
        if (typeof object[i]["Quantite"] === "number"){
            sumResultQuantite += object[i]["Quantite"];
        }
    }
    return sumResultQuantite;
}



export const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };


  
export function isError(error: unknown): error is Error {
    return error instanceof Error;
}