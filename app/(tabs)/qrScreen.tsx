import Camera from "@/components/CameraElement";
import { Text, Pressable, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ElementForm from "@/components/ElementForm";
import { databaseMap, databaseName, tableName } from "@/utils/sqlConst";
import { affectDataSQL, createTable, insertData, selectDataSQL } from "@/utils/sqlOps";


export default function QrScreen() {
    const [parsingData, setParsingData] = useState<Record<string, string | number> | null>(null);
    const [quantiteStock, setQuantiteStock] = useState<number | null>(null);
    const [getData, setGetData] = useState<any>(null);

    const addToParsingData = (newKey: string, newValue: number | string) => {
        setParsingData((prevData) => ({
            ...(prevData || {}),
            [newKey]: newValue,
        }));
    };

    const savedData = async () => {
        try {
            
            const answer = await createTable({
                databaseName,
                tableName,
                dataFormat: databaseMap
            });
            console.log(answer);
            if (parsingData !== null){
                const requestSQL = `SELECT COALESCE(Quantite, 0) AS Quantite
                FROM historique 
                WHERE LOT = '${parsingData.Lot}' 
                AND Designation = '${parsingData.Designation}' 
                AND Reference = '${parsingData.Reference}' ;`
                const answer = await selectDataSQL (requestSQL);
                if (Array.isArray(answer) && quantiteStock){
                    if (answer.length === 0){
                        const dataToInsert = {...parsingData, Quantite : quantiteStock}
                        const answerSqlDb = insertData({databaseName,tableName, dataToInsert:dataToInsert});
                        console.log(answerSqlDb);

                    }else{
                        const cumulQuantite = +(answer[0] as { Quantite: number }).Quantite + quantiteStock;                        
                        const requestSQL = 
                        `UPDATE historique 
                        SET Quantite = '${cumulQuantite}' 
                        WHERE LOT = '${parsingData.Lot}' 
                        AND Designation = '${parsingData.Designation}' 
                        AND Reference = '${parsingData.Reference}' ;`

                        const answerSQL = await affectDataSQL(requestSQL);
                        console.log(answerSQL);
                    }

                } 
            }
          
        
            
        } catch (error) {
            console.error("Error in savedData:", error);
        }
        setParsingData(null);
        setQuantiteStock(null);
    };

    const deleteData = () => {
        setParsingData(null);
        setQuantiteStock(null);
    };

 

    return (
        <View style={styles.container}>
            <Camera dataFromQrCode={setParsingData} />

            <ElementForm data={parsingData} modifierQuantites={setQuantiteStock} quantites={quantiteStock} />
            <View style={styles.btnMenu}>
                <Pressable style={[styles.button, styles.deleteButton]} onPress={deleteData}>
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.saveButton]} onPress={savedData}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    btnMenu: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        elevation: 3,
    },
    deleteButton: {
        backgroundColor: "#FF4D4D", // Couleur rouge
        shadowColor: "#FF4D4D", // Ombre lumineuse en rouge
    },
    saveButton: {
        backgroundColor: "#4CAF50", // Couleur verte
        shadowColor: "#4CAF50", // Ombre lumineuse en vert
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
