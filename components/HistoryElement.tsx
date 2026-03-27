import { Text,  View, StyleSheet } from "react-native";

// This component is used to display a history element in the stock screen
// It shows the designation, reference, lot, and total quantity of the stock item


export default function HistoryElement ({data, selected}:{data:any, selected:boolean}) {

    return (
        <View style={selected ? styles.selected : styles.container}>
            
            <View style={styles.left}>
                <Text style={styles.text}> {data.Designation}</Text>
                <Text style={styles.text}> {data.Reference}</Text>
                <Text style={styles.text}> {data.Lot}</Text>
            </View>

            <View style={styles.right}>
                <Text style={styles.text}>Quantite: {data.QuantiteTotal}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 20,
        marginBottom: 10,
        padding: 20,
        width: "85%",
        backgroundColor: "#FDFDFD",
        borderRadius: 10,
        minHeight: 100,

        // ❌ supprimé
        maxHeight: 300,
        minWidth: 350,
        maxWidth: 350,
        // minWidth / maxWidth fixes

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    selected: {
        backgroundColor: "#E67E22",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 20,
        padding: 20,
        width: "85%",
        borderRadius: 10,
        minHeight: 100,
        maxHeight: 300,
        minWidth: 350,
        maxWidth: 350,
    },

    left: {
        flex: 1,
        marginRight: 10,
        flexShrink: 1,
    },

    right: {
        width: 90,
        flexShrink: 0,
        alignItems: "flex-end",
    },

    text: {
        fontSize: 14,
        marginBottom: 4,
        flexWrap: "wrap",
    }
});