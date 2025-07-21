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
    const parsingDataFromQrCode = ({ data }: { data: string }): Record<string, string> | null => {
    try {
        if (!data || typeof data !== "string") {
        throw new Error("QR data is empty or invalid");
        }

        // On tente d'abord une lecture JSON (plus propre)
        const maybeJson = data.trim();
        if (maybeJson.startsWith("{") && maybeJson.endsWith("}")) {
        const parsed = JSON.parse(maybeJson);
        if (typeof parsed === "object" && parsed !== null) {
            // On s'assure que toutes les valeurs sont des strings
            const safeParsed: Record<string, string> = {};
            for (const key in parsed) {
            if (typeof parsed[key] !== "string") continue;
            safeParsed[key] = parsed[key];
            }
            return safeParsed;
        }
        }

    // Sinon fallback : format "key1:val1,key2:val2"
    const result: Record<string, string> = {};
    const pairs = data.split(",");
    for (const item of pairs) {
      const [rawKey, ...rawValue] = item.split(":");
      if (!rawKey || rawValue.length === 0) continue;
      const key = rawKey.trim().replace(/"/g, "");
      const value = rawValue.join(":").trim().replace(/"/g, "");
      if (key && value) result[key] = value;
    }

    if (Object.keys(result).length === 0) throw new Error("Parsing failed: no valid key:value pairs found");

        return result;
    } catch (error) {
        console.error("QR parsing error:", error);
        return null;
        }
    };

    
    // Function to handle the data from the QR code
    const getDataFromQrCode = ({ type, data }: { type: string; data: string }) => {
        const parsed = parsingDataFromQrCode({ data });
        if (parsed) {
            dataFromQrCode(parsed);
        } else {
            // renvoyer null pour dire que le parsing a échoué
            dataFromQrCode(null);
        }
        };


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
        width:330,
        height:220,
        alignItems: 'center',
    },
    cameraView: {
        flex: 1, 
        width: 330,
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
