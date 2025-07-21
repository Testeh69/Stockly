import {  View, StyleSheet} from "react-native";
import SendEmail from "@/components/SendEmail";
import CarouselHistorique from "@/components/CarouselHistorique";
import InitDB from "@/components/InitDB";

// This is the main index file for the app, which serves as the entry point for the application
// It initializes the database and renders the main components of the app


export default function Index() {

  
  
  return (
    <View style={styles.container}>
      
      <InitDB>
        <View style = {{display: "flex", alignItems: "center", justifyContent:"flex-end"}}>
          <CarouselHistorique />
          <SendEmail />
        </View>
      </InitDB>
    </View>
  );
}

const styles = StyleSheet.create({

  logo:{
    height:158,
    width:158,
    borderRadius:10,
    marginTop:50,
  },

  container:{
    flex:1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color:"#fff",
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
})