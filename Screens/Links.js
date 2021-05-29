import { StatusBar } from 'expo-status-bar';
import React , { useState , useEffect , useRef} from 'react';
import { StyleSheet,  View  , Text , TextInput , Image ,Alert ,Modal , ImageBackground, TouchableOpacity , ScrollView , Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchableFlatList } from "react-native-searchable-list";
import LottieView from 'lottie-react-native';
import DatapalDB from '../config/Db'


export default function App(props) {
  
const {navigation} = props

const { route } = props
const { item } = route.params
const  { Theme } = item
const [isEnabled, setisEnabled] = useState(Theme)
const [ismodalopen, setismodalopen] = useState(false)

const [userid, setuserid] = useState('')


// FOrm Hooks
const [Addimg, setAddimg] = useState("")
const [Addtitle, setAddtitle] = useState("")
const [Adddes, setAdddes] = useState("")

const animation = useRef(null);
const animation1 = useRef(null);
const Addanimation = useRef(null);

const [istext, setistext] = useState(false)

const [notedata, setnotedata] = useState([])
const [searchTerm, setsearchTerm] = useState("")
const [searchAttribute, setsearchAttribute] = useState("Sitename")

function Submit(){



const Link =  {
   Sitename: Addtitle , 
  Link :Adddes  
   }

        const Links = DatapalDB.database().ref(`${userid}/Links`);

        Links.push(Link)
        setAddtitle("")
        setAdddes("")
        setismodalopen(false)

}

        

useEffect(() => {
    // animation.current.play(10, 220);
    animation1.current.play(10, 220);
    Addanimation.current.play(10, 220);

  AsyncStorage.getItem('userId').then(
    (value) =>{
      setuserid(value)

  
        
    const NotesList = DatapalDB.database().ref(`${value}/Links`);
    NotesList.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const notesList = todoList.reverse()
      setnotedata(notesList)
      
    })
    })
}, [])


  
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:isEnabled ? "#215f68" : "white"}}>
    <ImageBackground source={ require("../assets/intro/gradient.jpg")} blurRadius={1}
                  style={{ flex:1  }}>
  <ScrollView style={{backgroundColor: isEnabled ? "#00000000" : "white"}}>






   <Modal
          animationType={"slide"}
          transparent={true}
          visible={ismodalopen}
          >
          <TouchableOpacity onPress={()=> setismodalopen(!ismodalopen)}>
          <View style={{height:100}}>

          </View>
          </TouchableOpacity>

          <ScrollView  showsVerticalScrollIndicator={false}>
     <View style={{
     borderRadius:10 , backgroundColor:isEnabled ? "#161b22" :"#ecf0f3" , padding:20 , height:1000,borderTopLeftRadius:30,borderTopRightRadius:30
         }} >
 <Text style={{backgroundColor:"gray" , width:60 , height:4 , borderRadius:30 , position:"relative" , top:-7 , marginBottom:20 , marginLeft:135}}></Text>
 

<Text></Text>

<Text></Text>
<Text></Text>


<Text style={{color: isEnabled?"gray":"black" , fontSize:18}}>Site Name :</Text>


       
        <TextInput
          style={{borderColor:"white",  backgroundColor:isEnabled?"#21262d":"white", color:isEnabled?"white":"black",paddingLeft:8, height:40 , borderWidth:0 ,  borderRadius:10 , marginTop:10 }} 
          onChangeText={text => setAddtitle(text)}
          placeholder="Enter Sitename  here.."
          
          />

<Text></Text>
        <Text style={{color: isEnabled ? "gray":"black" , fontSize:18}}>Link  :</Text>
         <View style={{height:150 , overflow:"hidden"}}>
        
          <TextInput
           style={{borderColor:"white", color:isEnabled?"white":"black" ,paddingLeft:8, overflow:"scroll" , backgroundColor:isEnabled?"#21262d":"white",  borderWidth:0 , borderRadius:10 , marginTop:10}} 
           multiline
           numberOfLines={8}
          //  value={Adddes}
          onChangeText={text => setAdddes(text) }
           placeholder="Enter Link here.."
           />


        </View>
        
        

           

         <View style={{flexDirection:"row" , marginLeft:20 , marginTop:20}}>
       <TouchableOpacity onPress={()=> setismodalopen(false)}>
         <Text style={{ padding:9 , marginTop:20, borderRadius:10 , width:150  , color:"orange"}}>Cancel</Text>
       </TouchableOpacity>


       <TouchableOpacity onPress={Submit}>
         <Text style={{backgroundColor:"#19afd8" , padding:9 , marginTop:20, borderRadius:10 , elevation:2 , fontSize:17}}>       Save      </Text>
       </TouchableOpacity>
       </View>  
     </View>
     </ScrollView>
   </Modal>









        <View style={styles.home}>
       
             <View style={styles.head}>
            
                <Text></Text>
                <Text></Text>
                <View style={{flexDirection:"row" , height:100 , }}>
                <LottieView
              ref={animation1}
              loop={false}
              style={{width: 170, height: 80, position:"relative" , left:20 , top:2}}
              source={require('../assets/59191-linked.json')}
             />
                <Text style={{...styles.headtitle , color: "blue"}}>All Link's </Text>
                </View>
            
        <View style={styles.searchbox}>
<TouchableOpacity style={{ position:"relative" , left:10 , backgroundColor:"gray" , borderRadius:50 , padding:3}} onPress={()=> setistext(!istext)}>
<Image style={{height:30 , width:30}} source={require('../assets/outline_search_black_24dp.png')} />

             </TouchableOpacity>
             {istext ? (
               <>
              <Text>..............</Text>
              <TextInput
      style={styles.search}
      onChangeText={searchTerm => setsearchTerm(searchTerm)}
      placeholder="Search Link's"

    />
     <TouchableOpacity onPress={()=> setistext(!istext)}>
               <Text style={{...styles.Delete , backgroundColor:"black"}}>❌</Text>
               </TouchableOpacity>  
    </>
              ) : ( 
                <Text></Text>
               )}

  
  <TouchableOpacity style={{ width:100, }} onPress={()=> setismodalopen(true)}>
             <LottieView
              ref={Addanimation}
              style={{width: 100, height: 50, }}
              source={require('../assets/22287-pencil-link-animated.json')}
             />
          </TouchableOpacity>
    {/* <Image
        style={styles.dp}
        source={{
          uri: `https://instagram.fnjf7-2.fna.fbcdn.net/v/t51.2885-19/s150x150/178078051_291289825961471_7654483385924691417_n.jpg?tp=1&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_ohc=iFkodC280mkAX-6_rmq&edm=AP_V10EBAAAA&ccb=7-4&oh=7d617456bc9b6a6d8cd0684a35a80b32&oe=60BDD1C7&_nc_sid=4f375e`,
        }}
          /> */}






</View>

       
</View>
 

<SearchableFlatList
              style={styles.list}
              data={notedata}
              numColumns={2}
              searchTerm={searchTerm}
              searchAttribute={searchAttribute}
        renderItem={({ item }) => (
          <>
   <View style={{    
         backgroundColor: isEnabled ? `#273239` :"#ecf0f3",

       width:"46%",
    margin:8,
    padding:10,
    borderRadius:10,
    height:"auto",
    // overflow:"hidden",
    marginTop:30,
    // elevation:5
       
       }}>


<TouchableOpacity onPress={ () => Linking.openURL(`${item.Link}`)}>
        <View style={{flexDirection:"row"}}>



          

   


<View style={styles.cardinfo}>
<View style={{flexDirection:"row" , justifyContent:"space-between"}}>
<Text style={styles.notetitle}>{item.Sitename}</Text>
<TouchableOpacity onPress={()=>{

Alert.alert(
      `Delete ${item.Sitename} Link`,
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
                const todoref = DatapalDB.database().ref(`${userid}/Links`).child(item.id);
                      todoref.remove()
            } 
          }
      ]
    );  


    
}}>
<Text style={{fontSize:10 , color:"red" ,backgroundColor:"gray" , width:30 , height:30  , paddingLeft:8, padding:6 , borderRadius:80}}>❌</Text>
</TouchableOpacity>

</View>

         <Text style={{...styles.note , color: isEnabled ? "lightgray" :"black"}}>{item.Link}</Text>
        
    </View>
</View>
    </TouchableOpacity> 
</View>
        </>




        )} />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>


      </View>
    </ScrollView>
    </ImageBackground>
    
      </ScrollView>
        
  
    </>
  );
}

const styles = StyleSheet.create({
  search:{ 
    height: 40,
    //  borderColor: 'gray',
    //   borderWidth: 2,
    borderRadius:20 ,
    width:200,
    padding:10,
          backgroundColor:"white",

  },
  searchbox:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"flex-end",
  // backgroundColor:"gray",
  // marginLeft:20,
  // marginRight:20,
  borderRadius:20,
  // marginTop:20
  // margin:20,
  // elevation:10,
  alignItems:"center"
  },
  dp:{
    height:40,
    width:40,
    borderRadius:600
  },
  head:{
    backgroundColor:"orange",
    paddingBottom:20 , 
    borderBottomRightRadius:10,
    borderBottomLeftRadius:130,
    borderColor:"gray",
  //  borderBottomWidth:2
   
},
headtitle:{
    // color:"white",
    fontSize:23,
  //   padding:20 ,s
    borderColor:"orange",
    // borderBottomWidth:2,
    width:110,
    marginLeft:20,
    marginTop:30,
    // paddingBottom:8
},
notetitle:{
    color:"orange",
    marginBottom:10,
    width:"70%"
},
Delete:{
  borderRadius:60,
  // borderWidth:2,
  borderColor:"red",
  padding:5,
  color:"white",
  // marginRight:10,
  backgroundColor:"gray",
  height:30,
  width:30,
 fontSize:12 ,
 marginLeft:20,
 paddingLeft:6
},
note:{
  color:"lightgray"
}

});
