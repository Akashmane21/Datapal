import { StatusBar } from 'expo-status-bar';
import React , { useState , useEffect} from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { NavigationContainer   } from '@react-navigation/native';

import MyStack from './Nav/Stack'
export default function App() {

  return (
    
    <>
       <StatusBar style="light" />
   <NavigationContainer >
    <MyStack />
   </NavigationContainer> 
   </>
  
  );
}

