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