// this file is part of the Stockly project
// It contains interface definitions for the Stock data structure

export interface Stock {
    id?: number; 
    Designation?: string; 
    Lot?: number; 
    Quantite?: number | null;
  }