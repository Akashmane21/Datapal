import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useState ,useRef} from 'react';
import { StyleSheet,  View ,Text  , Image,Alert , ScrollView , ImageBackground , TouchableOpacity ,Clipboard , TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
import DatapalDB from '../config/Db' 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Detail(props) {

    const {navigation} = props
    const { route } = props
    const { item } = route.params
    const  { Theme } = item
    const { Note} = item
    const {Id } = item
    const {Title } = item
    
    const Titlecap = Title.toUpperCase()
    
    const [userid, setuserid] = useState('')
const [backcolors, setbackcolors] = useState("")
    const [isenabled, setisenabled] = useState(false)
    const [front, setfront] = useState("")
    const [back, setback] = useState("")
    const [textcolor, settextcolor] = useState("")
    const [sound, setsound] = useState(false)
    const [isimg, setisimg] = useState()
    const animation = useRef(null);
    const animation1 = useRef(null);
    const animation2 = useRef(null);
    
    
    if(sound == true){
        Speech.speak(Note);
        
    
    }
    
    else{
        Speech.stop();
    }
    
    
    
    const speak = () => {
      };
    
      const copyToClipboard = () => {
        Clipboard.setString(Note)
    alert("Copied to clipboard")
      }
    
    
      const Deletenote =() =>{
        console.warn("Delete Note")
        Alert.alert(
          `Delete ${item.Title} Note`,
          `Are you Sure ?`,
          [
            {  
              text: 'Cancel',  
              onPress: () => console.log('Cancel Pressed'),  
              style: 'cancel',  
          }, 
           
            { 
                text: "yes ✔", 
                onPress: () => {
                  const todoref = DatapalDB.database().ref(`${userid}/Notes`).child(Id);
                  todoref.remove()
                  navigation.pop()
                } 
              }
          ]
        );  
       
      }
    
    useEffect(() => {
      AsyncStorage.getItem('userId').then(
        (value) =>{
          setuserid(value)
    
        })    
        animation.current.play(10, 220);
    
        animation1.current.play(10, 220);
        animation2.current.play(10, 220);
    
        if(item.Theme === "true" )
        {
            setisenabled(true)
            setback("#00000000")
            setfront("#161b22")
            settextcolor("white")
            setbackcolors("#215f68")
    
        }
        else{
            setisenabled(false)
            setback("white")
            setfront("#ecf0f3")
            settextcolor("black")
            setbackcolors("white")

        }
        // backgroundColor:isEnabled ? "#215f68" : "white"
        
    }, [])
    
  return (
    <ScrollView  style={{ backgroundColor: backcolors  , height:2000}} showsVerticalScrollIndicator={false}>
     
    <ImageBackground source={ {uri : "https://i.pinimg.com/originals/4a/1f/d0/4a1fd04bcd5797a3c02e18a86d1b4b01.jpg"}} blurRadius={1}
                 style={{ }}>
  <ScrollView style={{backgroundColor: back}}>

   <View style={styles.container}>

<View style={styles.titleview}>
<Text style={styles.noimgtitle}>{Titlecap} :-</Text>
{item.Img == "" ? ( 
 <Text></Text>

) : (

<Image
       style={styles.poster}
       resizeMode='cover'
       source={{
         uri: `${item.Img}`,
       }}
     />


) }
</View>


   <View style={ {...styles.notearea  , backgroundColor:front , elevation:0}}>  
<View style={styles.opt}>

<TouchableOpacity onPress={() => copyToClipboard()}>
<LottieView
             ref={animation}
             style={{
               width: 50,
               height: 50,
             }}
             source={require('../assets/5144-copied.json')}
            />
</TouchableOpacity>


<TouchableOpacity onPress={()=> setsound(!sound)}>

 { sound ? ( 

<LottieView
             ref={animation1.current.play(10, 220)}
             style={{
               width: 50,
               height: 50,
               
             }}
            source={require('../assets/28792-sound-wave.json')}
            />
     
     
     
     ) : (
         
         <LottieView
             ref={animation1}
             style={{
               width: 50,
               height: 50,
               
             }}
             source={require('../assets/3103-sound-on.json')}
            />
          
          
          )  } 


</TouchableOpacity>
<TouchableOpacity onPress={Deletenote} style={{ width:50, height:50}}>
<LottieView
             ref={animation2}
             style={{
               width: 10,
               height: 100,
               position:"relative",
               top:-10,
               left:-20
             }}
             source={require('../assets/58544-delete-item.json')}
            />
</TouchableOpacity>
</View>

<Text style={{...styles.Note , color:textcolor }}>{item.Note}</Text>


</View> 

<View style={styles.dt}>

<Text style={{...styles.Date ,color:textcolor}}>{item.Date}</Text>
<Text style={{...styles.Time , color:textcolor}}>{item.Time}</Text>

</View>      
   </View>
   </ScrollView>
   </ImageBackground>
</ScrollView>
  );
}

const styles = StyleSheet.create({
    Title:{
        color:"black",
        fontSize:24,
        // top:-80,
        // left:32
    },
    
   
    container:{
        // height:1000
    },
    image: {
        // flex: 1,
        // resizeMode: "cover",
        justifyContent: "center",
        height:330,
        width:"100%",
        borderRadius:40,
        borderBottomRightRadius:2000
      },
      child: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height:800,
      
      },
      box:{
          
          position:"relative",
          top:50,
          left:10,
          
          
        //   borderWidth:3,
        //   borderColor:"gray",
          padding:10,
          width:170,
          marginBottom:20,
          borderRadius:20,
          backgroundColor:"rgba(88, 88, 87, 0.705)"

      },
      poster:{
        height:300,
        width:"90%",
        borderRadius:10,
        alignItems:"center",
        margin:20,
       
        marginBottom:0,
        borderWidth:2,
        borderColor:"gray"
      },
      Note:{
        fontSize:20,
        color:"white"
    },
      notearea:{
      
    
            borderRadius:10 , 

          backgroundColor :  "#161b22",
        margin:10,
        padding:13,
        borderTopWidth:2,
        borderColor:"red",
        position:"relative",
        top:-20,
        elevation:10
    

    },
    dt:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        margin:20,
        borderRadius:10,
        borderWidth:2,
        padding:10,
        borderColor:"gray",
        marginTop:20
    },


    opt:{
        flexDirection:'row',
        justifyContent:"flex-end",
    },

    Date:{
        color:"white"
    },
    Time:{
        color:"white"
    },
    noimgtitle:{
      fontSize:25,
      color:"#19afd8",
      padding:5,
      marginTop:50,
      borderLeftWidth:2,
      marginLeft:10,
      paddingLeft:20,
      borderRadius:10, 

marginRight:10,
      

    },
    titleview:{
      display:"flex",
     
      justifyContent:"space-around",
      marginBottom:60
     
    },
    upperbtn:{
     display:"flex",
     justifyContent:"space-between"
    },
    btns:{
      display:"flex",
      justifyContent:"space-around"
    }

});
