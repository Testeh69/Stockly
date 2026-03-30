import { Text,  View, StyleSheet } from "react-native";




export default function HistoryElement ({data, selected}:{data:any, selected:boolean}) {


    return (
        <View style = {selected? styles.selected : styles.container__input}>
            <View style = {styles.left}>
                <Text>Des: {data.Designation.length > 16 ? data.Designation.substring(0, 16) + "..." : data.Designation}</Text>
                <Text>Ref: {data.Reference.length > 18 ? data.Reference.substring(0, 16) + "..." : data.Reference}</Text>
                <Text>Lot:{data.Lot.length > 16 ? data.Lot.substring(0, 16) + "..." : data.Lot}</Text>
            </View>
            <View style = {styles.right}>
                <Text>Quantite:</Text>
                <Text>{data.QuantiteTotal}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    left : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    right : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderLeftWidth: 1,
        borderLeftColor: "#E67E22",
        paddingLeft: 10,
    },

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