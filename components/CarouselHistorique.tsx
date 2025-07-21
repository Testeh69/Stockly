import { selectDataSQL } from "@/utilitaire/sqlOps";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type HistoriqueItem = {
  id: number;
  Lot: string;
  Reference: string;
  Designation: string;
  Quantite: number;
  timestamp: string;
};

// This component displays a carousel of historical data from the database

export default function CarouselHistorique() {
  const [carouselData, setCarouselData] = useState<HistoriqueItem[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        try {
          const sqlRequest = `SELECT * FROM historique ORDER BY timestamp DESC LIMIT 3`;
          const result = await selectDataSQL(sqlRequest);
          if (Array.isArray(result)) {
            setCarouselData(result as HistoriqueItem[]);
          } else {
            console.error("selectDataSQL returned unexpected value", result);
          }
        } catch (e) {
          console.error("Erreur fetching carouselData", e);
        }
      };
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {carouselData.length === 0 ? (
        <Text style={styles.noData}>Aucun historique</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
        >
          {carouselData.map((item) => (
            <View key={item.timestamp} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.Designation}</Text>
                <Text style={styles.ref}>Reference : {item.Reference}</Text>
                <Text style={styles.ref}>Lot : {item.Lot}</Text>
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.quantity}>Quantité(s) : <Text style={styles.quantityValue}>{item.Quantite}</Text></Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.timestamp}>📅 {item.timestamp}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginVertical: 2,
    paddingHorizontal: 10,
  },
  noData: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    width: 200,
    height: 150,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
   cardHeader: {
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  ref: {
    fontSize: 10,
    color: "#666",
  },
  cardBody: {
    marginVertical: 4,
  },
  quantity: {
    fontSize: 12,
    color: "#444",
  },
  quantityValue: {
    fontWeight: "600",
    color: "#222",
  },
  cardFooter: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});
