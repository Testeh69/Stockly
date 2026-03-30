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
import React, { useState, useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View, Animated, Easing } from "react-native";

// This screen is used to scan QR codes and parse the data from them

export default function QrScreen() {
  // State to hold the parsed data from the QR code
  const [parsingData, setParsingData] = useState<Record<
    string,
    string | number
  > | null>(null);
  // State to hold the quantity of stock
  const [quantiteStock, setQuantiteStock] = useState<number | null>(null);
  // --- LOGIQUE D'ANIMATION ---
  // Valeur de 0 (pas de scan) à 1 (scan détecté)
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: parsingData ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.back(1.5)), // Effet de rebond léger
      useNativeDriver: true, // Crucial pour la fluidité
    }).start();
  }, [parsingData]);

  // Interpolations pour les mouvements
  const translateYSheet = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [150, 0], // Le panneau monte de 150px
  });

  const translateYHistory = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150], // L'historique sort par le haut
  });

  const opacityHistory = animationValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0], // L'historique disparaît progressivement
  });
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
            insertData({
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
      {/* 1. CAMERA */}
      <View style={StyleSheet.absoluteFill}>
        <CameraQR dataFromQrCode={setParsingData} />
      </View>

      {/* 2. HISTORIQUE ANIMÉ (Haut) */}
      <Animated.View 
        style={[
          styles.topOverlay, 
          { transform: [{ translateY: translateYHistory }], opacity: opacityHistory }
        ]}
      >
        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Historique récent</Text>
          <CarouselHistorique />
        </View>
      </Animated.View>

      {/* 3. PANNEAU ANIMÉ (Bas) */}
      <Animated.View 
        style={[
          styles.bottomSheet, 
          { transform: [{ translateY: translateYSheet }] }
        ]}
      >
        <View style={styles.dragHandle} />
        
        <Text style={styles.sheetTitle}>
          {parsingData ? "Détails du Scan" : "Scannez un article"}
        </Text>

        {/* On n'affiche le formulaire que si on a de la donnée pour éviter les sauts d'UI */}
        <View style={{ opacity: parsingData ? 1 : 0, height: parsingData ? 'auto' : 0 }}>
          <ElementForm
            data={parsingData}
            modifierQuantites={setQuantiteStock}
            quantites={quantiteStock}
          />
        </View>

        <View style={styles.btnMenu}>
          <Pressable style={[styles.button, styles.deleteButton]} onPress={deleteData}>
            <Text style={styles.buttonText}>Annuler</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.saveButton, !parsingData && styles.disabledBtn]}
            onPress={savedData}
            disabled={!parsingData}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Enregistrer</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir pour éviter le flash blanc au chargement caméra
  },
  topOverlay: {
    position: "absolute",
    top: 50, // Ajuste selon la barre de statut (SafeView)
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  glassCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Effet translucide
    borderRadius: 20,
    padding: 10,
    backdropFilter: "blur(10px)", // Optionnel (web/certains moteurs)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    marginBottom: 5,
    marginLeft: 10,
    textTransform: "uppercase",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  btnMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    height: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#F5F5F5",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  disabledBtn: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333", // Noir pour Annuler
  },
  // Surcouche pour le texte de sauvegarde
  saveText: {
     color: "white"
  }
});