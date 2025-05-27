import { View,StyleSheet } from "react-native";
import { CameraView } from "expo-camera";







export default function Camera  ({dataFromQrCode}:{dataFromQrCode: (data:Record<string,string>|null) => void}) {



    const parsingDataFromQrCode = ({data}:{data:string}):Record<string,string> => {
        const resultDataFromParsing: string[] = data.split(",");
        const lengthDataFromParsing: number = resultDataFromParsing.length;
        let parsingData: Record<string,string>= {};
        for (let i = 0; i<lengthDataFromParsing; i++){
            const keyWords: string = resultDataFromParsing[i].split(":")[0].trim().replace("\"","");
            const value : string = resultDataFromParsing[i].split(":")[1].trim().replace("\"","");;
            parsingData[keyWords] = value; 
        }
        return parsingData;
    }
    
    const getDataFromQrCode = ({type,data}: {type:string, data:string}) => {
        if (typeof data === 'string'){
            dataFromQrCode(parsingDataFromQrCode({data}));
        }
        else{
            console.error("error data type must be string");
        }
  
    }



    return (
        <View style = {styles.container}>
            <CameraView
            style = {styles.cameraView}
            facing = {'back'}
            barcodeScannerSettings={{ barcodeTypes:["qr"]}}
            onBarcodeScanned={getDataFromQrCode}
            >
            </CameraView>     
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:300, // Makes the container take up available space
        alignItems: 'center', // Centers the camera view horizontally
    },
    cameraView: {
        flex: 1, // Takes up available space within the container
        width: '90%', // Ensures the camera view adapts to different screen sizes
        maxWidth: 400, // Adds a max width so it doesn't stretch too far on large screens
        aspectRatio: 1, // Ensures the camera view stays square
        borderRadius: 10, // Softens the edges of the camera view
        overflow: 'hidden', // Prevents the camera from overflowing its container
        shadowColor: "#000", // Adds a shadow effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5, // Gives a soft shadow around the camera view
        elevation: 6, // Adds elevation to Android for the shadow effect
    },
});
