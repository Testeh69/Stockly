import { View,Text,StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useEffect,useState } from "react";
import { useIsFocused } from "@react-navigation/native";


// This component is used to scan QR codes and parse the data from them



export default function CameraQR  ({dataFromQrCode}:{dataFromQrCode: (data:Record<string,string>|null) => void}) {

    const isFocused = useIsFocused();
    const [permission, requestPermission] = useState<boolean | null>(null);
    const [cameraKey, setCameraKey] = useState<number>(0);
    // Request camera permissions when the component mounts
    useEffect(()=>{
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            requestPermission(status === "granted");
        })()
    },[]);

    useEffect(()=> {
        if (isFocused){
            setCameraKey(prev => prev + 1);
        }
    }, [isFocused])

    // Function to parse the data from the QR code
    const parsingDataFromQrCode = ({data}:{data:string}):Record<string,string> => {
        const resultDataFromParsing: string[] = data.split(",");
        const lengthDataFromParsing: number = resultDataFromParsing.length;
        let parsingData: Record<string,string>= {};
        for (let i = 0; i<lengthDataFromParsing; i++){
            const keyWords: string = resultDataFromParsing[i].split(":")[0].trim().replace("\"","");
            const value : string = resultDataFromParsing[i].split(":")[1].trim().replace("\"","");;
            parsingData[keyWords] = value; 
        }
        console.log("parsing - data", parsingData)
        return parsingData;
    }
    // Function to handle the data from the QR code
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
            {permission ? (
            <CameraView
            key = {cameraKey}
            style = {styles.cameraView}
            facing = {'back'}
            barcodeScannerSettings={{ barcodeTypes:["qr"]}}
            onBarcodeScanned={getDataFromQrCode}
            >
            </CameraView>  ) : (
                <View style={styles.cameraView}>
                    <Text>Permission to access camera was denied</Text>
                </View>
            )}   
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:300,
        alignItems: 'center',
    },
    cameraView: {
        flex: 1, 
        width: '90%', 
        maxWidth: 400, 
        aspectRatio: 1, 
        borderRadius: 10, 
        overflow: 'hidden', 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5, 
        elevation: 6, 
    },
});
