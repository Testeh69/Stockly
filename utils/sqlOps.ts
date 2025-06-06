import * as SQLite from 'expo-sqlite';
import { databaseName, tableName } from './sqlConst';
//Object => Hashmap



export const createTable = async ({databaseName, tableName, dataFormat}:{databaseName:string, tableName:string, dataFormat: Record<string,string>}) => {
    try{
        const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
        const columns = Object.entries(dataFormat)
        .map(([key, value]) => `${key} ${value}`)
        .join(", ");
        const query = `PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS "${tableName}" (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columns});`;
        await db.execAsync(query);
        await db.closeAsync();
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
        return false
    }

}



export const insertData = async({databaseName, tableName, dataToInsert}: { databaseName:string, tableName: string, dataToInsert: Record<string,string|number>}) => {
    try{
        const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
        const columns = Object.keys(dataToInsert).map(col => `"${col}"`).join(", ");
        const values = Object.values(dataToInsert).map(value => 
          typeof value === "string" ? `'${value}'` : value
        ).join(", ");        
        const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${values});`;
        await db.execAsync(query);
        await verifyInsertion();
        await db.closeAsync();
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
        return false
    }

}


export const selectDataSQL = async (requestSQL:string)=>{
  try {
    const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
    const result = await db.getAllAsync(requestSQL);
    return result;
  } catch (error: any) {
    console.error('Error message:', error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
}

export const affectDataSQL = async (requestSQL:string)=>{
  try {
    const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
    const result = await db.runAsync(requestSQL);
    console.log(verifyInsertion());
    return result;
  } catch (error: any) {
    console.error('Error message:', error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
}




export const selectDistinctData = async ({ databaseName, tableName, dataToSelect }:{databaseName:string, tableName:string, dataToSelect:string}) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
    const query = `SELECT DISTINCT ${dataToSelect} FROM ${tableName};`;
    const result = await db.getAllAsync(query);
    return result[0];
  } catch (error: any) {
    console.error('Error message:', error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
};


export const selectWithCondition = async({databaseName,tableName, dataToSelect}:{databaseName:string,tableName:string, dataToSelect:string})=>{
  try{
    const db = await SQLite.openDatabaseAsync(databaseName, {useNewConnection:true});
    const query = `SELECT ${dataToSelect} FROM ${tableName} WHERE "Designation" = "AZZRZDE" AND "Reference" = "AZADCZEF" AND "Lot" = "AZ22342";`;
    const result = await db.getAllAsync(query);
    const jsonResult = JSON.stringify(result);
    return jsonResult;
  }
  catch (error: any) {
    console.error('Error message:', error.message);
    alert(`Error: ${error.message}`);
    return false;
  }

}


export const deleteTable = async (nameTable:string) => {
  try {
      const requestSQL = `DROP TABLE IF EXISTS '${nameTable}';`;
      await affectDataSQL(requestSQL); // Exécute la commande DROP
      console.log("Table supprimée !");
  } catch (error) {
      console.error("Erreur lors de la suppression de la table :", error);
  }
};


export const addTimestampColumn = async () => {
  const alterSQL = `ALTER TABLE historique ADD COLUMN timestamp DATETIME DEFAULT CURRENT_TIMESTAMP;`;
  await affectDataSQL(alterSQL);
  console.log("Colonne timestamp ajoutée");
}

//Testing Insertion
const verifyInsertion = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  const results = await db.getAllAsync(`SELECT * FROM "${tableName}";`);
  console.log('Contenu de la table :', results);
};
