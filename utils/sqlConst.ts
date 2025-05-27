


export const databaseName: string = "stock";


export const tableName: string = "historique"

export const databaseMap: Record<string,string> = {
    "Designation": "TEXT NOT NULL",//Type de pièce
    "Reference" : "TEXT NOT NULL",//Code Article
    "Lot" : "TEXT NOT NULL",//Numéro d'ordre de fabrication
    "Quantite": "INTEGER NOT NULL"
}