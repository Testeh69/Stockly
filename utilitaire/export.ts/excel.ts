import { Stock } from "@/utilitaire/struct/interface";
import {getEnhancedData} from "@/utilitaire/dataLayer/transformedData";
import * as XLSX from "xlsx";
import { utils } from "xlsx";

// This function generates an Excel file from the stock data
export const generateExcel = (data : Stock[]) => {
        const enhancedData = getEnhancedData(data); // Transform the data to match the desired Excel format
        const worksheet = utils.json_to_sheet(enhancedData); // Convert the data to a worksheet
        const workbook = utils.book_new(); // Create a new workbook
        utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append the worksheet to the workbook
        const base64xl = XLSX.write(workbook, {
                  type: "base64",
                  bookType: "xlsx",
                });// Write the workbook to a base64 string
            
        return base64xl;
    

}