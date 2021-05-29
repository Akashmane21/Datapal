
import React, { useState, useEffect , useRef } from 'react';

import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';





const App = (props) => {

    const {navigation} = props

  const [netInfo, setNetInfo] = useState('');
  const animation = useRef(null);
  const animation1 = useRef(null);
  const animation2 = useRef(null);



  useEffect(() => {
    animation.current.play();
    animation1.current.play();
    // animation2.current.play();

    const unsubscribe = NetInfo.addEventListener((state) => {
     




if(state.isConnected == true){
        console.log(` connection ${state.isConnected} `)



        
       
                navigation.navigate("Name")
           




}
else{
        console.log(`Not connection ${state.isConnected} `)

   }
    });



    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:"gray" , alignItems:"center" , justifyContent:"center" }}>
     <LottieView
                        ref={animation}
                        loop={false}
                        style={{   height:300, position:"relative" , top:0 , left:0}}
                        source={require('../assets/12955-no-internet-connection-empty-state.json')}
                      />
      <LottieView
                        ref={animation1}
                        loop={false}
                        style={{   height:350, position:"relative" , top:0 , left:0}}
                        source={require('../assets/12701-no-internet-connection.json')}
                      />
                      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
});

export default App;
