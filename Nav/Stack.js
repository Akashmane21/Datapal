// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator , TransitionPresets , CardStyleInterpolators } from '@react-navigation/stack'

const Stack = createStackNavigator();
import React , {useEffect} from 'react';

import Home from '../Screens/Home'
import Links from '../Screens/Links'
import Passwords from '../Screens/Passwords'
import Tasks from '../Screens/Tasks'
import Notes from '../Screens/Notes'
import Detail from '../Screens/Detail'
import Intro from '../Screens/Intro'
import Name from '../Screens/Name'
import CheckCon from '../Screens/CheckConn'


const HomeStack=()=> {

  
  return (


    <Stack.Navigator  
    
   
    screenOptions={{ 
      headerShown: false,
     gestureEnabled: true , 
     gestureDirection:"vertical",
      
     
     }}   >
<Stack.Screen name="Intro" component={Intro}  />

<Stack.Screen name="Home" component={Home}  />

<Stack.Screen name="Links" component={Links} />
<Stack.Screen name="Passwords" component={Passwords} />
<Stack.Screen name="Tasks" component={Tasks} />
<Stack.Screen name="Notes" component={Notes} />
<Stack.Screen name="Detail" component={Detail} />
<Stack.Screen name="Name" component={Name} />
<Stack.Screen name="CheckCon" component={CheckCon} />



    </Stack.Navigator>
  );
}



export default HomeStack ;
