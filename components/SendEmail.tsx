import { getCurrentDate } from "@/utilitaire/Ops";
import { Stock } from "@/utilitaire/struct/interface";
import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getStockData } from "@/utilitaire/dataLayer/stockQueries";
import { generateExcel } from "@/utilitaire/export.ts/excel";
import { exportExcel } from "@/utilitaire/export.ts/export";

// This component is used to send stock data via email
// It creates an Excel file from the stock data and shares it via email

export default function SendEmail() {
  // Function to send the stock data via email
  // It creates an Excel file from the stock data and shares it via email
  const sendData = async () => {
    const stockData: Stock[] | null = await getStockData();
    if (stockData !== null && stockData.length > 0) {
      const excelFile64 = generateExcel(stockData);
      if (excelFile64 !== null) {
         await exportExcel(excelFile64);
      }
    }
  };

  // Function to confirm sending the stock data via email
  // It shows an alert to confirm the action before proceeding with sending the data
  const confirmSendData = () => {
    Alert.alert(
      `Confirmation d'envoie de données le: ${getCurrentDate()}`,
      `Vous voulez envoyez le fichier xslx ? `,
      [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", onPress: sendData },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.wrapper__email}>
      <TouchableOpacity style={styles.button} onPress={confirmSendData}>
        <Ionicons name="mail-outline" size={30} color="#111111" />
        <Text style={styles.text__btn}>Envoyer par Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper__email: {
    marginTop: "-40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
  text__btn: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 12,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 350,
  },
});
