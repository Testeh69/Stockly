import * as SQLite from "expo-sqlite";
import { databaseName, tableName } from "./sqlConst";
import { Stock } from "@/utilitaire/struct/interface";
import { HistoriqueItem } from "@/utilitaire/struct/type";
//Object => Hashmap

//file utilitaire that holds SQL operations
// This file contains functions to interact with the SQLite database

// This function checks if the database exists
export async function checkDatabaseExists(databaseName: string) {
  try {
    await SQLite.openDatabaseAsync(databaseName);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ouverture de la base de données :", error);
    return false;
  }
}

// This function creates a table in the SQLite database

export const createTable = async ({
  databaseName,
  tableName,
  dataFormat,
}: {
  databaseName: string;
  tableName: string;
  dataFormat: Record<string, string>;
}) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const columns = Object.entries(dataFormat)
      .map(([key, value]) => `${key} ${value}`)
      .join(", ");
    const query = `PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS "${tableName}" (id INTEGER PRIMARY KEY AUTOINCREMENT, ${columns});`;
    await db.execAsync(query);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      alert(`Error: ${error.message}`);
    }
    return false;
  }
};

// This function inserts data into the SQLite database
export const insertData = async ({
  databaseName,
  tableName,
  dataToInsert,
}: {
  databaseName: string;
  tableName: string;
  dataToInsert: Record<string, string | number>;
}) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName,{useNewConnection:true});
    const columns = Object.keys(dataToInsert)
      .map((col) => `"${col}"`)
      .join(", ");

    const placeHolders = Object.keys(dataToInsert)
      .map((col) => "?")
      .join(", ");

    const values = Object.values(dataToInsert);

    const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${placeHolders});`;
    await db.runAsync(query, values);
    await verifyInsertion();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      alert(`Error: ${error.message}`);
    }
    return false;
  }
};

// This function selects data from the SQLite database
export const selectDataSQL = async <T extends (Stock | HistoriqueItem)> (requestSQL: string) : Promise<T[]|null> => {
  try {

    const db = await SQLite.openDatabaseAsync(databaseName, { useNewConnection: true });
    const result = await db.getAllAsync <T>(requestSQL);
    return result;
  } catch (error: any) {
    console.error("Error message:", error.message);
    alert(`Error: ${error.message}`);
    return null;
  }
};

// This function affects data in the SQLite database (insert, update, delete)
// It executes a SQL command and returns the result
export const affectDataSQL = async (requestSQL: string) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName, { useNewConnection: true });
    const result = await db.runAsync(requestSQL);
    return result;
  } catch (error: any) {
    console.error("Error message:", error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
};

// This function selects distinct data from the SQLite database
export const selectDistinctData = async ({
  databaseName,
  tableName,
  dataToSelect,
}: {
  databaseName: string;
  tableName: string;
  dataToSelect: string;
}) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const query = `SELECT DISTINCT ${dataToSelect} FROM ${tableName};`;
    const result = await db.getAllAsync(query);
    return result[0];
  } catch (error: any) {
    console.error("Error message:", error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
};

// This function selects data with a condition from the SQLite database
export const selectWithCondition = async ({
  databaseName,
  tableName,
  dataToSelect,
}: {
  databaseName: string;
  tableName: string;
  dataToSelect: string;
}) => {
  try {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const query = `SELECT ${dataToSelect} FROM ${tableName} WHERE "Designation" = "AZZRZDE" AND "Reference" = "AZADCZEF" AND "Lot" = "AZ22342";`;
    const result = await db.getAllAsync(query);
    const jsonResult = JSON.stringify(result);
    return jsonResult;
  } catch (error: any) {
    console.error("Error message:", error.message);
    alert(`Error: ${error.message}`);
    return false;
  }
};

// This function deletes a table from the SQLite database
export const deleteTable = async (nameTable: string) => {
  try {
    const requestSQL = `DROP TABLE IF EXISTS '${nameTable}';`;
    await affectDataSQL(requestSQL); // Exécute la commande DROP
  } catch (error) {
    console.error("Erreur lors de la suppression de la table :", error);
  }
};

// This function adds a timestamp column to the historique table
export const addTimestampColumn = async () => {
  const alterSQL = `ALTER TABLE historique ADD COLUMN timestamp DATETIME DEFAULT CURRENT_TIMESTAMP;`;
  await affectDataSQL(alterSQL);
};

//Testing Insertion
const verifyInsertion = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  const results = await db.getAllAsync(`SELECT * FROM "${tableName}";`);
  console.log("Contenu de la table :", results);
};



