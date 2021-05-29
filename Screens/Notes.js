import { StatusBar } from 'expo-status-bar';
import React , { useState , useEffect , useRef} from 'react';
import { StyleSheet,  View  , Text , TextInput , Image , TouchableOpacity , ScrollView , Modal } from 'react-native';
import { SearchableFlatList } from "react-native-searchable-list";
import LottieView from 'lottie-react-native';
import DatapalDB from '../config/Db'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App(props) {
   
  const { route } = props
  const { item } = route.params
  const  { Theme } = item
  const [isEnabled, setisEnabled] = useState(Theme)

const {navigation} = props
const animation = useRef(null);
const Addanimation = useRef(null);
const [ismodalopen, setismodalopen] = useState(false)

// FOrm Hooks
    const [Addimg, setAddimg] = useState("")
    const [Addtitle, setAddtitle] = useState("")
    const [Adddes, setAdddes] = useState("")
    const [backcolor, setbackcolor] = useState('')
    const [userid, setuserid] = useState('')


// date and Time 

      var d = new Date();
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var mon = months[d.getMonth()]
      var dateno = new Date().getDate();
      const Todaysdate =dateno + " "+ mon

      const nowmin = new Date().getMinutes()
      var hour = new Date().getHours();

      var nowtime = ""

      if(hour < "12"){
      const nowhour = hour;
      nowtime = nowhour + ":" + nowmin + " am" 
      }
      else if(hour == "24"){
      nowtime = "12" + ":" + nowmin + " am" 
      }
      else if(hour == "12"){
      nowtime = "12" + ":" + nowmin + " pm" 
      }
      else {
      const nowhour = hour-12
      nowtime = nowhour + ":" + nowmin + " pm" 

      }



const [notedata, setnotedata] = useState([])
const [searchTerm, setsearchTerm] = useState("")
const [searchAttribute, setsearchAttribute] = useState("title")


  useEffect(() => {
 



  


    AsyncStorage.getItem('userId').then(
      (value) =>{
        setuserid(value)
        const NotesList = DatapalDB.database().ref(`${value}/Notes`)
        NotesList.on('value' , (snapshot)=>{
          const todoList = []
          const todos =snapshot.val()
          for(let id in todos){
            todoList.push({id, ...todos[id]})
          }
          const notesList = todoList.reverse()
          setnotedata(notesList)
       
          
        })
      }
        )


    // animation.current.play(10, 220);
    Addanimation.current.play(10, 220);
        
   
  }, [])


  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setAddimg(`${pickerResult.uri}`)
  };


  
function Submit(){


  

  const note =  {
    title: Addtitle, 
    note: Adddes, 
    img:Addimg,
    time: nowtime, 
    date: Todaysdate,
    color:backcolor
    
    }
    console.log(note)

          const notes = DatapalDB.database().ref(`${userid}/Notes`);
          notes.push(note)

          // Set all Field Blanck
          setAdddes("")
          setAddtitle("")
          setAddimg("")

        //  Modal is Closed after the SUbmit
          setismodalopen(false)

}

  
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: isEnabled ? "#161b22" :"white"}}>
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
 <Text style={{color: isEnabled?"gray":"black" , fontSize:12  , borderRadius:20 ,padding:5 }}>background Color :</Text>
 

<Text></Text>
<View style={{flexDirection:"row" , height:30 , }}>
<TouchableOpacity  onPress={()=> setbackcolor("#8fc2192f")} >
  <View style={{backgroundColor:"#8fc2192f" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#c22d192f")}>
  <View style={{backgroundColor:"#c22d192f" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#19a9c22f")}>
  <View style={{backgroundColor:"#19a9c22f" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#3e19c22f")}>
  <View style={{backgroundColor:"#3e19c22f" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#c219b42f")}>
  <View style={{backgroundColor:"#c219b42f" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#c219193a")}>
  <View style={{backgroundColor:"#c219193a" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("#aba9b650")}>
  <View style={{backgroundColor:"#aba9b650" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setbackcolor("gray")}>
  <View style={{backgroundColor:"gray" , height:30 , width:30 , marginRight:10 , borderRadius:50 }}>
  </View>
</TouchableOpacity>




</View>
<Text style={{backgroundColor:backcolor , height:6 , marginTop:10 , borderRadius:20}}>.</Text>

{/* // </ScrollView> */}


<Text></Text>
<Text></Text>


<Text style={{color: isEnabled?"gray":"black" , fontSize:18}}>Title :</Text>


       
        <TextInput
          style={{borderColor:"white",  backgroundColor:isEnabled?"#21262d":"white", color:isEnabled?"white":"black",paddingLeft:8, height:40 , borderWidth:0 ,  borderRadius:10 , marginTop:10 }} 
          onChangeText={text => setAddtitle(text)}
          placeholder="Enter Title here.."
          
          />

<Text></Text>
        <Text style={{color: isEnabled ? "gray":"black" , fontSize:18}}>Note  :</Text>
         <View style={{height:150 , overflow:"hidden"}}>
        
          <TextInput
           style={{borderColor:"white", color:isEnabled?"white":"black" ,paddingLeft:8, overflow:"scroll" , backgroundColor:isEnabled?"#21262d":"white",  borderWidth:0 , borderRadius:10 , marginTop:10}} 
           multiline
           numberOfLines={8}
          //  value={Adddes}
           onChangeText={text => setAdddes(text) }
           placeholder="Enter Note here 📜.."
           />


        </View>
        
          { Addimg == "" ?  (
          <Text style={{color: isEnabled?"white":"black" , fontSize:18}}> </Text>
          ): ( 
            <Image style={{height:"30%" , width:"50%" , margin:7  , borderRadius:10}} source={{ uri : `${Addimg}`}} />

          ) }


              <TouchableOpacity onPress={openImagePickerAsync}>
              <View style={{ justifyContent:"center" , marginTop:20  , alignItems:"center" , padding:10 , borderRadius:10 , justifyContent:"center" , borderWidth:1}}>
              <Image style={{height:30 , width:30 , position:"relative" , left:0}} source={require('../assets/outline_add_photo_alternate_black_24dp.png')} />
              <Text style={{fontSize:10 , color:isEnabled ?"white":"black"}}>Add image</Text>
              </View>
            </TouchableOpacity>

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
       
       <Image source={{uri : 'https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png'}} style={{height:160 , width:160}}/>

          <Text style={styles.headtitle}>All Note's 📜:- </Text>
          <View style={styles.searchbox}>

    <LottieView
        ref={animation}
        style={{width: 50, height: 50, position:"relative",  top:-4, left:-10  }}
        source={require('../assets/53963-search-animation.json')}
       />

<TextInput
style={styles.search}
onChangeText={searchTerm => setsearchTerm(searchTerm)}
placeholder="Search Note's"

/>




</View>

      </View>
  



   <SearchableFlatList
        style={styles.list}
        data={notedata}
        searchTerm={searchTerm}
        searchAttribute={searchAttribute}
        numColumns={2}
        renderItem={({ item }) => (
    <>


  <View style={{    
    backgroundColor:item.color,
    width:"47%",
    margin:4,
    padding:5,
    borderRadius:10,
    height:"auto",
    marginTop:10,
  
   }}>


 <TouchableOpacity onPress={()=> navigation.navigate('Detail' , { item :
  { 
    Title : `${item.title}`,
    Img :`${item.img}`,
    Note:`${item.note}`,
    Date :`${item.date}`,
    Time :`${item.time}`,   
    Theme: `${isEnabled}`,
    Id : `${item.id}`
 }}
 
 )}
 
  style={{}}> 
  <View style={{}}>


{ item.img == "" ? ( 
  <Text style={{height:0}}></Text>
  
  ): ( 
    
     <Image
        style={styles.poster}
        source={{
          uri: `${item.img}`,
        }}
     />
    ) }



    




<View style={styles.cardinfo}>
              <Text style={{...styles.notetitle , color : isEnabled ? "yellow" :"blue"}}>{item.title}</Text>

   <Text style={{...styles.note , color:isEnabled ? "white" : "black"}}>{item.note}</Text>
   <View style={styles.dt}>

    <Text style={styles.time}>{item.time}</Text>
    <Text style={styles.date}>{item.date}</Text>
    </View>
</View>
</View>
</TouchableOpacity> 
</View>
  </>




  )} />
</View>


</ScrollView>


   
<TouchableOpacity style={{ width:100, position:"absolute", bottom:20 , right:0}} onPress={()=> setismodalopen(true)}>
<LottieView
 ref={Addanimation}
 style={{width: 100, height: 70, }}
 source={require('../assets/11859-add.json')}
/>
</TouchableOpacity>
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
    padding:10
  },
  searchbox:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-around",
  backgroundColor:"white",
  // marginLeft:20,
  // marginRight:20,
  borderRadius:20,
  // marginTop:20
  margin:20,
  elevation:4,
  width:230,
  marginBottom:0
  },
  dp:{
    height:40,
    width:40,
    borderRadius:600
  },
  poster :{
    height:150,
    width:"100%",
    backgroundColor:"#21262d",
    marginRight:10,
    borderRadius:10,
    elevation:40,
    // position:"relative",
    // top:-40
    

},
note:{
  color:"black",
  height:90,
  overflow:"hidden",
//   width:200
padding:10,
fontSize:13,

},
text:{
  // backgroundColor:"black",
  
},
date:{
  color:"rgba(16, 151, 156, 0.733)",
  fontSize:10
},
time:{
  color:"rgba(16, 151, 156, 0.733)",
  fontSize:10,

},
dt:{
    display:"flex",
    flexDirection:"row",
    marginBottom:8,
    justifyContent:"space-around",
   
    marginTop:10,
    marginRight:8,
    marginLeft:8
  },
  notetitle:{
      color:"white",
      marginLeft:10,
      fontSize:18,
     
  },
  cardinfo:{
      // backgroundColor:"red",
      overflow:"hidden",
      // width:200,
      
  },
  head:{
      backgroundColor:"#7671de",
      paddingBottom:40 , 
      borderBottomRightRadius:150
  },
  headtitle:{
      color:"white",
      fontSize:23,
    //   padding:20 ,s
      borderColor:"orange",
      borderBottomWidth:2,
      width:210,
      marginLeft:20,
      marginTop:30,
      paddingBottom:8
  }
  
});
