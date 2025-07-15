import { Stock } from "@/utilitaire/interface";
import { getCurrentDate } from "@/utilitaire/Ops";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {utils} from "xlsx";
import * as XLSX from "xlsx";
import { databaseName } from "@/utilitaire/sqlConst";


export default function SendEmail() {
  const sendData = async () => {
    try {
      const currentDate: string = getCurrentDate();
      const db = await SQLite.openDatabaseAsync(databaseName);
      const getDataSql: Stock[] = await db.getAllAsync(
        "SELECT Designation, Lot, Quantite FROM historique"
      );
      console.log(getDataSql);

      const enhancedData = getDataSql.map((row) => ({
        Référence: "",
        Designation: row.Designation,
        Etablissement: "AXYLLUS TECHNOLOGIES SARL",
        "Zone de stock": "",
        Emplacement: "",
        Lot: row.Lot,
        Série: "",
        Tiers: "",
        Affaire: "",
        "Statut Qualité": "",
        Unité: "",
        Qté: "",
        Coefficient: "",
        "Qté comptée": row.Quantite,
        Validité: "",
        Ecart: "",
        "Unité référence": "",
        "Qté référence": "",
        "Qté réservée": "",
        "Unité stock": "",
        "Qté stock": "",
        "Coefficient stock": "",
        "Cout unitaire": "",
        "Cout total": "",
        "Cout compté": "",
        "Ecart montant": "",
        "Devise cout": "EUR",
        "Barre Longueur": "",
      }));

      const worksheet = utils.json_to_sheet(enhancedData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const base64xl = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
      });
   
      const fileUri: string =
        FileSystem.cacheDirectory + currentDate + `_stock.xlsx`;
      await FileSystem.writeAsStringAsync(fileUri, base64xl, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri);
      Alert.alert("Succès", `Fichier créé et partagé avec succès : ${fileUri}`);
    } catch (error) {
      console.error(
        "Erreur lors de la création ou du partage du fichier :",
        error
      );
      Alert.alert("Erreur", "Impossible de créer ou partager le fichier.");
    }
  };

  const confirmSendData = () => {
    Alert.alert(
      `Confirmation d'envoie de données le: ${getCurrentDate()}`,
      `Vous voulez envoyez le fichier xslx ? `,
      [
        { text: "Annuler", style: "cancel" },
        { text: "Confirmer", onPress: sendData },
      ],
      { cancelable: false }
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
