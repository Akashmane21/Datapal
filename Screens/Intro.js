import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useRef , useState} from 'react';
import { StyleSheet,  View , Text } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Setting(props) {

const {navigation} = props
const animation = useRef(null);

        useEffect(() => {
           animation.current.play();

        }, [])

      function check(){

        AsyncStorage.getItem("realAuthuser").then(value => {
            if(value == null){
                 navigation.navigate("CheckCon")
            }
            else{
                 console.warn(`${value} not a first launch`);
                 navigation.navigate("Home")
             }})
   
         }
    

  return (
    <>
    <View style={{flex:1}}>
                   <LottieView
                        ref={animation}
                        loop={false}
                        style={{   height:780, position:"relative" , top:0 , left:0}}
                        onAnimationFinish={check}
                        source={require('../assets/22686-introloading-screen-animation.json')}
                      />
    </View>
 

    </>
  );
}

const styles = StyleSheet.create({
 
});