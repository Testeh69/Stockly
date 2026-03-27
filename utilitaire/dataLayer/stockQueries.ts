import { selectDataSQL } from "@/utilitaire/dataLayer/sql/sqlOps";
import {tableName} from "@/utilitaire/dataLayer/sql/sqlConst";
import { Alert } from "react-native";
import { Stock } from "@/utilitaire/struct/interface";

export const getStockData = async () : Promise<Stock[]|null> => {
    try {
        const requestSQL:string = `SELECT Designation, Reference, LOT, Quantite FROM ${tableName} WHERE Quantite > 0;`;
        const dataSQL:Stock[]|null = await selectDataSQL(requestSQL);
        if (dataSQL?.length === 0) {
            Alert.alert("No Stock Data", "There are no stock items with quantity greater than 0.");
            return null;
        }
        return dataSQL;
    } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "An error occurred while fetching stock data.");
        return null;
    }
}