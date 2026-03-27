import {
  databaseMap,
  databaseName,
  tableName,
} from "@/utilitaire/dataLayer/sql/sqlConst";
import { createTable } from "@/utilitaire/dataLayer/sql/sqlOps";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

// This component initializes the database and creates the necessary table if it doesn't exist

export default function InitDB({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await createTable({ databaseName, tableName, dataFormat: databaseMap });
        setIsReady(true);
      } catch (e) {
        console.error("Erreur d'init DB", e);
      }
    };
    initDB();
  }, []);

  return (
    <>
      {!isReady && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.popup}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.text}>
                Vérification de l&apos existence de la base de données...
              </Text>
            </View>
          </View>
        </Modal>
      )}
      {isReady && children}
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
});
