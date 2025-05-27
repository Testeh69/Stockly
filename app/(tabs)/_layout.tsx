import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <>
    <View style = {styles.header}>
      <Image source={require('@/assets/images/stockly_logo.png')} style={styles.logo}/>
      <Text style = {styles.headerTitle}>Stockly</Text>  
    </View>  
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#11111f',
          marginBottom:0,
          borderTopWidth: 0,
          height: 70, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 12, 
        },
        tabBarActiveTintColor: '#FF6F61', 
        tabBarInactiveTintColor: '#B0B0B0', 
        tabBarLabelStyle: {
          marginBottom:-30,
          fontSize: 16, 
          fontWeight: 'bold', 
          textShadowColor: 'rgba(255, 111, 97, 0.5)', 
          textShadowOffset: { width: 0, height: 0 }, 
          textShadowRadius: 12, 
        },
        tabBarIconStyle: {
          marginBottom: 10, 
          textShadowColor: 'rgba(255, 111, 97, 0.5)', 
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'HOME',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name = "stockScreen"
        options = {{
          headerShown: false,
          title:'STOCKS',
          tabBarIcon : ({color,size}) => (
            <Ionicons name= "cube-outline" size ={size} color = {color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrScreen"
        options={{
          headerShown: false,
          title: 'QR',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  </>
  );
}


const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom:20,
    marginRight:10,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
  },
});