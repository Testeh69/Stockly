import { affectDataSQL, selectDataSQL } from '@/utils/sqlOps';
import { Text,TextInput, View, Modal, Pressable, StyleSheet } from 'react-native';
import React,{ useState, useEffect } from 'react';
import { PopUpProps } from '@/utils/type';




const PopUp = ({ setIsModalVisible, isModalVisible, id }: PopUpProps) => {

    const [quantiteInitial, setQuantiteInitial] = useState<any>()
    const [newQuantite,setNewQuantite] = useState<string>()
    const [designation, setDesignation] = useState<any>()
    

    
    const quitPopUp = () => {
        setIsModalVisible(false);
    };



    useEffect(()=> {
        const fetchQuantiteByID = async () => {
            try{
                const requestSQL = `SELECT Designation, Quantite FROM historique WHERE id = ${id}`
                const quantiteAndDesignationSQL = await selectDataSQL(requestSQL);
                const quantiteAndDesignation = quantiteAndDesignationSQL[0];
                setQuantiteInitial(quantiteAndDesignation.Quantite);
                setDesignation(quantiteAndDesignation.Designation);
        
            }
            catch(error){
                console.error("Eroor fetching data", error)
            }
        }
        if (isModalVisible) {
            fetchQuantiteByID();
        }
    })


    const submitQuantite = async () => {

    
        try {
            const quantiteUpdated = parseInt(newQuantite);
            if (isNaN(quantiteUpdated)){
                alert("Veuillez entrer une valeur valide")
            }
    
            const updateSQL = `UPDATE historique SET Quantite = ${quantiteUpdated} WHERE id = ${id}`;
            await affectDataSQL(updateSQL); 
            alert("Quantité mise à jour !");
            setQuantiteInitial(quantiteUpdated); 
            setIsModalVisible(false);
            setNewQuantite('');
        }

        catch(error){
            console.error(error);
            alert("Échec de la mise à jour.");
        }
    }

    
   

    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={quitPopUp}
        >
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text>Modifier la Quantité(s) de {designation} --"{quantiteInitial}"?</Text>
                    <TextInput
                        placeholder='Entrez la quantité'
                        keyboardType='numeric'
                        value = {newQuantite}
                        onChangeText={setNewQuantite}
                    />
                    <View style = {styles.btn__menu}>
                        <Pressable style={styles.cancelButton} onPress={quitPopUp}>
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </Pressable>
                        <Pressable style={styles.validateButton} onPress={() => {submitQuantite()}}>
                            <Text style={styles.validateButtonText}>Valider</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PopUp;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    },
    modalView: {
        width: '80%', // Largeur du modal
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5, // Ombre sur Android
        shadowColor: '#000', // Ombre sur iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    window: {
        height: 300,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: '50%',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
    },


    btn__menu:{
      flexDirection: "row",
      width: "100%",
      justifyContent:"space-around"  
    },

    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },

    validateButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    validateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});