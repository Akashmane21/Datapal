import { StatusBar } from 'expo-status-bar';
import React , {useEffect} from 'react';
import { StyleSheet,  View  , Text} from 'react-native';


export default function Setting(props) {

// const {navigation} = props
console.log(props)
const {isEnabled} = props

if(isEnabled == true){
    console.log("black")

}
else{
    console.log("white");
}

  return (
    <>
    <View style={styles.container}>
     
    <Text style={{...styles.title , color:isEnabled ? "white" : "#673ab7"}}>All About Yesterday</Text>
    
         
      <StatusBar style="auto" />
      
      
    </View>

    </>
  );
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        color:"black"
    },
    container:{
        padding:10
    }
});
