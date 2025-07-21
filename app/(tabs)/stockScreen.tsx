import HistoryElement from "@/components/HistoryElement";
import PopUp from "@/components/PopUp";
import { affectDataSQL, selectDataSQL } from "@/utilitaire/sqlOps";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";


// This screen is used to manage stock data, allowing users to view, delete, and modify stock items

const StockScreen = () => {
  // State to hold the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // State to hold the data fetched from the database
  const [mapElement, setMapElement] = useState<any>(null);
  // State to hold the stack of selected items
  const [itemStack, setItemStack] = useState<any[]>([]);

  // Fetch data from the database when the component mounts and set an interval to refresh it
  // This ensures that the data displayed is always up-to-date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestSQL =
          "SELECT Designation, Reference,Lot, SUM(Quantite) As QuantiteTotal, SUM(id) as id FROM historique GROUP BY Reference, Lot, Designation;";
        const dataSQL = await selectDataSQL(requestSQL);
        setMapElement(dataSQL);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 800);
    return () => clearInterval(intervalId);
  }, []);
  // Function to push or remove an item from the stack
  // If the item is already in the stack, it removes it; otherwise, it adds
  const pushInStackItem = (element: number) => {
    if (itemStack?.includes(element)) {
      setItemStack((prev) =>
        prev ? prev.filter((item) => item !== element) : []
      );
    } else {
      setItemStack([...itemStack, element]);
    }
  };
  // Function to delete data from the database based on the selected items in the stack
  // If the stack is empty, it deletes all data; otherwise, it deletes only the selected items
  // It also resets the stack after deletion
  const deleteData = async () => {
    if (!itemStack || itemStack.length === 0) {
      const requestSQL = "DELETE FROM historique";
      await affectDataSQL(requestSQL);
      console.log("Suppression de la table");
    } else {
      for (const item of mapElement) {
        if (itemStack.includes(item.id)) {
          const requestSQL = `DELETE FROM historique WHERE Lot = '${item.Lot}' AND Reference = '${item.Reference}' AND Designation = '${item.Designation}';`;
          await affectDataSQL(requestSQL);
        }
      }
      setItemStack([]);
    }
  };

  // Function to handle the visibility of the modal
  // It toggles the visibility state of the modal
  const handleModal = () => {
   setIsModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container_stock}>
        <FlatList
          contentContainerStyle={{ alignItems: "center", marginBottom:12, marginTop: 12 }}
          data={mapElement || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#ffffffff"
              onPress={() => pushInStackItem(item.id)}
            >
              <HistoryElement
                data={item}
                selected={itemStack?.includes(item.id) ? true : false}
              />
            </TouchableHighlight>
          )}
        />
      <>
        <PopUp
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          id={itemStack[0]}
        />
      </>
      <View style={styles.panel__btn}>
        {itemStack?.length === 0 ? (
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={() => deleteData()}
          >
            <Text style={styles.buttonText}>Tout Effacer</Text>
          </Pressable>
        ) : itemStack?.length === 1 ? (
          <>
            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={() => deleteData()}
            >
              <Text style={styles.buttonText}>Effacer</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.modifierButton]}
              onPress={() => handleModal()}
            >
              <Text style={styles.buttonText}>Modifier</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={() => deleteData()}
          >
            <Text style={styles.buttonText}>Effacer {itemStack?.length}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default StockScreen;

const styles = StyleSheet.create({
  container_stock: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
  },

  panel__btn: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  deleteButton: {
    backgroundColor: "#FF4D4D",
    shadowColor: "#FF4D4D",
  },

  modifierButton: {
    backgroundColor: "#4CAF50",
    shadowColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
