import { DateTime } from "luxon";


// This file contains utility functions for the application


export function isString(value:any) {
  return typeof value === 'string';
}



export function getTimeStamp() {
  const parisTime = DateTime.now().setZone('Europe/Paris');
  const horaire = parisTime.toFormat('yyyy-LL-dd HH:mm:ss') 
  return horaire;
}



export const getUniteReference = (lot: any) => {
  const val = (lot || "").toLowerCase();

  const contientCC = val.includes("cc");
  const seulementChiffresEtCC = /^cc[0-9\s]*$/.test(val);


  return seulementChiffresEtCC && contientCC ? "Kilogramme" : "Unité";
};