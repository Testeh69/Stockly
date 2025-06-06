import HistoryElement from "@/components/HistoryElement";
import { View,Pressable, Text, FlatList, StyleSheet, TouchableHighlight} from "react-native";
import { useEffect, useState } from "react";
import {  affectDataSQL, selectDataSQL} from "@/utils/sqlOps";
import PopUp from "@/components/PopUp";



const StockScreen = () => {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [mapElement, setMapElement] = useState<any>(null);
    const [itemStack, setItemStack] = useState<any[]>([]);

    
    useEffect(()=> {
    
        const fetchData = async () => {
            try {
                    const requestSQL = "SELECT Designation, Reference,Lot, SUM(Quantite) As QuantiteTotal, SUM(id) as id FROM historique GROUP BY Reference, Lot, Designation;";
                    const dataSQL = await selectDataSQL(requestSQL);
                    setMapElement(dataSQL);  
                }
               catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
          const intervalId = setInterval(fetchData, 800);
          return () => clearInterval(intervalId);
    },[])


    const pushInStackItem = (element:number) => {
            if (itemStack?.includes(element)){
                setItemStack((prev)=> (prev ? prev.filter((item)=> item !== element):[]))
            }
            else {
                setItemStack([...itemStack, element])
            }
    
    }


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



    const handleModal = () => {
        isModalVisible ? setIsModalVisible(false) : setIsModalVisible(true)
    }



    return (
        <View style = {styles.container_stock}>
                <>
                 <FlatList
                    data ={mapElement || []}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#111111"
                            onPress={() => pushInStackItem(item.id)}            
                        >   
                            <HistoryElement data = {item} selected = {itemStack?.includes(item.id)? true : false}/>
                        </TouchableHighlight>
                    )}
                    />
                </>
                <>
                 <PopUp setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} id = {itemStack[0]}/>
                </>
                <View style = {styles.panel__btn}>
                {
                    itemStack?.length === 0 ?(
                        <Pressable style={[styles.button, styles.deleteButton]} onPress={()=> deleteData()}>
                            <Text style={styles.buttonText}>Delete ALL</Text>
                        </Pressable>) : itemStack?.length === 1 ? (
                        <>
                            <Pressable style={[styles.button, styles.deleteButton]} onPress={()=> deleteData()}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.modifierButton]} onPress={() => handleModal()}>
                                <Text style={styles.buttonText}>Modifier</Text>
                            </Pressable>
                        </>
                        ):(
                        <Pressable style={[styles.button, styles.deleteButton]} onPress={()=> deleteData()}>
                            <Text style={styles.buttonText}>Delete {itemStack?.length}</Text>
                        </Pressable>
                        )
                } 
                </View>
        </View>
    )
} 
export default  StockScreen;


const styles = StyleSheet.create({
    container_stock:{
        flex:1,
        backgroundColor: "#FFFFFF",
        alignItems:"center",
    },

    panel__btn:{
        width:"90%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:20,
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


})