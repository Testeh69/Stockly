import CameraQR from "@/components/CameraElement";
import CarouselHistorique from "@/components/CarouselHistorique";
import ElementForm from "@/components/ElementForm";
import { databaseName, tableName } from "@/utilitaire/dataLayer/sql/sqlConst";
import {
  affectDataSQL,
  insertData,
  selectDataSQL,
} from "@/utilitaire/dataLayer/sql/sqlOps";
import { getTimeStamp } from "@/utilitaire/miscellanous";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// This screen is used to scan QR codes and parse the data from them

export default function QrScreen() {
  // State to hold the parsed data from the QR code
  const [parsingData, setParsingData] = useState<Record<
    string,
    string | number
  > | null>(null);
  // State to hold the quantity of stock
  const [quantiteStock, setQuantiteStock] = useState<number | null>(null);

  // Function to save the data to the database
  const savedData = async () => {
    try {
      if (parsingData !== null) {
        const requestSQL = `SELECT COALESCE(Quantite, 0) AS Quantite
                FROM historique 
                WHERE LOT = '${parsingData.Lot}' 
                AND Designation = '${parsingData.Designation}' 
                AND Reference = '${parsingData.Reference}' ;`;
        const answer = await selectDataSQL(requestSQL);
        if (Array.isArray(answer) && quantiteStock) {
          if (answer.length === 0) {
            const dataToInsert = {
              ...parsingData,
              Quantite: quantiteStock,
              timestamp: getTimeStamp(),
            };
            const answerSqlDb = insertData({
              databaseName,
              tableName,
              dataToInsert: dataToInsert,
            });
          } else {
            const cumulQuantite =
              +(answer[0] as { Quantite: number }).Quantite + quantiteStock;
            const requestSQL = `UPDATE historique 
                        SET Quantite = '${cumulQuantite}',
                        timestamp = '${getTimeStamp()}' 
                        WHERE LOT = '${parsingData.Lot}' 
                        AND Designation = '${parsingData.Designation}' 
                        AND Reference = '${parsingData.Reference}' ;`;

            await affectDataSQL(requestSQL);
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
      <CameraQR dataFromQrCode={setParsingData} />
      <View>
        <CarouselHistorique />
      </View>
      <ElementForm
        data={parsingData}
        modifierQuantites={setQuantiteStock}
        quantites={quantiteStock}
      />
      <View style={styles.btnMenu}>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={deleteData}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.saveButton]}
          onPress={savedData}
        >
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
