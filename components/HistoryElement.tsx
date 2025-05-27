import { Text,  View, StyleSheet } from "react-native";




export default function HistoryElement ({data, selected}:{data:any, selected:boolean}) {


    return (
        <View style = {selected? styles.selected : styles.container__input}>
            <View>
                <Text>Designation: {data.Designation}</Text>
                <Text>Reference: {data.Reference}</Text>
                <Text>Lot:{data.Lot}</Text>
            </View>
            <View>
                <Text>Quantite:{data.QuantiteTotal}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    selected:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        padding: 15,
        width: "95%",
        backgroundColor: "#E67E22",
        borderRadius: 10,
        minHeight: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    container__input: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        padding: 15,
        width: "95%",
        backgroundColor: "#FDFDFD",
        borderRadius: 10,
        minHeight: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
})