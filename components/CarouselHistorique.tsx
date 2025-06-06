import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { selectDataSQL } from '@/utils/sqlOps';

type HistoriqueItem = {
  id: number;
  Lot: string;
  Reference: string;
  Designation: string;
  Quantite: number;
  timestamp: string;
};

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
            console.error('selectDataSQL returned unexpected value', result);
          }
        } catch (e) {
          console.error('Erreur fetching carouselData', e);
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
              <Text style={styles.title}>{item.Designation}</Text>
              <Text style={styles.quantity}>Quantité: {item.Quantite}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  noData: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginTop: 8,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 12,
    color: '#666',
  },
});
