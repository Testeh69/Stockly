import * as FileSystem from 'expo-file-system/legacy';
import { getCurrentDate } from '../Ops';
import * as Sharing from 'expo-sharing';
import {Alert} from "react-native";

// This function exports the stock data formated via excel  saves it to the device's file system
export const exportExcel = async (data: string)=> {
    const fileUri: string =
    FileSystem.documentDirectory + `stock_${getCurrentDate()}_stock.xlsx`;
    try {
        await FileSystem.writeAsStringAsync(fileUri, data, {
        encoding: FileSystem.EncodingType.Base64,
    })
    }
    catch (error) {
        console.error("Error writing file:", error);
        Alert.alert("Erreur lors de la création du fichier");
        return;
    }
    try {
    await Sharing.shareAsync(fileUri);
    alert(`Fichier créé et partagé avec succès : ${fileUri}`);
    }
    catch (error) {
        console.error("Error sharing file:", error);
        Alert.alert("Erreur lors du partage du fichier");
    }
}



