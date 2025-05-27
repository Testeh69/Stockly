import {  View, StyleSheet, Image } from "react-native";

import SendEmail from "@/components/SendEmail";

export default function Index() {
  return (
    <View style={ styles.container}>
      <SendEmail/>
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