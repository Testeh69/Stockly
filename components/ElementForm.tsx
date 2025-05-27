import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function ElementForm({ data, modifierQuantites, quantites }: { data: Record<string, string | number> | null, modifierQuantites: (data: number | null) => void, quantites: number|null }) {
    const [quantite, setQuantite] = useState<string | null>(null);

    const handleQuantiteChange = (text: string) => {
        setQuantite((prev) => {
            const numericValue = text ? parseInt(text, 10) : null;
            modifierQuantites(numericValue);
            return text;
        });
    };

    useEffect(
        ()=>setQuantite(quantites === null ? null: quantite)
        ,[quantites]);

        
    return (
        <View style={styles.container__input}>
            <View style={styles.left__block}>
                {data === null ? (
                    <Text style={styles.noDataText}>Aucune Information</Text>
                ) : (Object.entries(data).map(([key, value]) => (
                    <Text key={key} style={styles.dataText}>{`${key} : ${value}`}</Text>
                ))
        
                )}
            </View>
            <View style={styles.right__block}>
                {data !== null && (
                    <>
                        <Text style={styles.label}>Quantité(s):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez la quantité"
                            keyboardType="numeric"
                            value={quantite || ""}
                            onChangeText={handleQuantiteChange}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container__input: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        padding: 15,
        width: "100%",
        backgroundColor: "#2C2C2E",
        borderRadius: 10,
        minHeight: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    left__block: {
        display: "flex",
        flexDirection: "column",
    },
    right__block: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 8,
        padding: 10,
        width: 160,
        backgroundColor: "#3A3A3C",
        color: "#FFFFFF",
    },
    noDataText: {
        color: "#FFFFFF",
        fontStyle: "italic",
    },
    dataText: {
        marginTop:6,
        color: "#FFFFFF",
        fontSize:12,
    },
});
