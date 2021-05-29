import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useRef , useState} from 'react';
import { StyleSheet,  View  , Text , TextInput , Image ,Alert ,
     TouchableOpacity , ScrollView , Linking  , ImageBackground , Modal , Clipboard} from 'react-native';
import { SearchableFlatList } from "react-native-searchable-list";
import LottieView from 'lottie-react-native';
import DatapalDB from '../config/Db'
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App(props) {
  
const {navigation} = props

const { route } = props
const { item } = route.params
const  { Theme } = item
const [isEnabled, setisEnabled] = useState(Theme)
const [ismodalopen, setismodalopen] = useState(false)


const [userid, setuserid] = useState('')


// FOrm Hooks
const [Addpass, setAddpass] = useState("")
const [Addtitle, setAddtitle] = useState("")
const [Adduser, setAdduser] = useState("")

// States for Password Feild
const [usern, setusern] = useState('')
const [siten, setsiten] = useState('')
const [passn, setpassn] = useState('')
const [isPassmodal, setisPassmodal] = useState(false)


const animation = useRef(null);
const animation1 = useRef(null);
const Addanimation = useRef(null)
const [notedata, setnotedata] = useState([])
const [searchTerm, setsearchTerm] = useState("")
const [searchAttribute, setsearchAttribute] = useState("Sitename")

let Accesslock = async () => {
  try {
    let results = await LocalAuthentication.authenticateAsync();
    if(results.success) {
      alert("success")
      console.log("success")
    } else {
      Alert.alert('alert',  JSON.stringify(results))
    }
    // LocalAuthentication.cancelAuthenticate();
  }catch(err) {
    Alert.alert('alert', 'login fail: ' + err)
    console.log(err);
  }
}
        

useEffect(() => {
    animation.current.play(10, 220);
    animation1.current.play(10, 220);
    Addanimation.current.play(10, 220);


    AsyncStorage.getItem('userId').then(
      (value) =>{
        setuserid(value)
       
        
    const NotesList = DatapalDB.database().ref(`${value}/Passwords`)
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


function Submit(){


        const Passwords = DatapalDB.database().ref(`${userid}/Passwords`);
const doc =  {
   Sitename: Addtitle, 
   User :Adduser ,
   Password  : Addpass 
   }

console.log(doc)
Passwords.push(doc)


          setAddtitle("")
          setAddpass("")
          setAdduser("")
          setismodalopen(false)
  
  }
  
  return (
    <>
     
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"#161b22"}}>
   
    
    <Modal
          animationType={"slide"}
          transparent={true}
          visible={isPassmodal}
          >
          <TouchableOpacity onPress={()=> {setisPassmodal(false)}}>
          <View style={{height:430}}>
              <Text>.</Text>
          </View>
          </TouchableOpacity>
          <View style={{height:350 , backgroundColor:"gray" , borderRadius:40 ,  }}>
<Text style={{backgroundColor:"black" , width:60 , height:4 ,borderRadius:50 ,marginTop:10 , marginLeft:150}}>.</Text>
         <Text style={{fontSize:22 , color:"orange", paddingLeft:14,paddingRight:24, marginTop:10  , padding:8 , borderRadius:20}}>{siten}</Text>
         <View style={{padding:20 , paddingTop:0}}>
<Text style={{color:"black" , fontSize:16}}>Username : </Text>
<Text></Text>


<TouchableOpacity onPress={()=> { 
     Clipboard.setString(usern)
    alert("Copied to clipboard")
}}>
<Text style={{color:"lightgray" , fontSize:20 , backgroundColor:"#50525386" , padding:4 , borderRadius:10}}>{usern}</Text>
</TouchableOpacity>


<Text></Text>
<Text style={{color:"black" , fontSize:16}}>Password : </Text>
<Text></Text>


<TouchableOpacity onPress={()=> { 
     Clipboard.setString(passn)
    alert("Copied to clipboard")
}}>
<Text style={{color:"lightgray" , fontSize:20 , backgroundColor:"#50525386" , padding:4 , borderRadius:10}}>{passn}</Text>
</TouchableOpacity>

          </View>
          </View>
          
          {/* , backgroundColor:"#50525386" */}
          </Modal>








   
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
        <Text style={{color: isEnabled ? "gray":"black" , fontSize:18}}>User name  :</Text>
        
          <TextInput
           style={{borderColor:"white", color:isEnabled?"white":"black" ,paddingLeft:8, overflow:"scroll" , backgroundColor:isEnabled?"#21262d":"white", height:40,  borderWidth:0 , borderRadius:10 , marginTop:10}} 
     
          onChangeText={text => setAdduser(text)}
           placeholder="Enter Link here.."
           />
<Text></Text>

        
<Text style={{color: isEnabled?"gray":"black" , fontSize:18}}>Password🗝 :</Text>


       
<TextInput
  style={{borderColor:"white",  backgroundColor:isEnabled?"#21262d":"white", color:isEnabled?"white":"black",paddingLeft:8, height:40 , borderWidth:0 ,  borderRadius:10 , marginTop:10 }} 
  onChangeText={text => setAddpass(text) }
  placeholder="Enter Sitename  here.."
  
  />
        
        

           

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








   
    <ImageBackground source={ {uri : "https://cdn.dribbble.com/users/1207383/screenshots/13554718/media/7bb1671a54017d27e010643c226c10c3.png?compress=1&resize=400x300"}} blurRadius={0.5}
                  style={{ }}>
       
        <View style={styles.home}>
       
             <View style={styles.head}>
            
                <Text></Text>
                <Text></Text>
                <View style={{flexDirection:"row" , height:140 , }}>
                <LottieView
              ref={animation1}
              style={{width: 140, height: 140, position:"relative" ,}}
              source={require('../assets/61026-password.json')}
             />
                <Text style={styles.headtitle}>@ll Pa$$ward's 🔐</Text>
                </View>
            
        <View style={styles.searchbox}>

          <LottieView
              ref={animation}
              style={{width: 50, height: 50, position:"relative",  top:-4, left:-10  }}
              source={require('../assets/53963-search-animation.json')}
             />

   <TextInput
      style={styles.search}
      onChangeText={searchTerm => setsearchTerm(searchTerm)}
      placeholder="Search Password's"

    />

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
            //   numColumns={2}
              searchTerm={searchTerm}
              searchAttribute={searchAttribute}
        renderItem={({ item }) => (
            <>
            <TouchableOpacity style={{borderRadius:50}} onPress={  async () => {
              try {
                let results = await LocalAuthentication.authenticateAsync();
                if(results.success) {
                 
                  setsiten(item.Sitename)
                  setpassn(item.Password)
                  setusern(item.User)
                  setisPassmodal(true)
                } else {
                  Alert.alert('alert',  JSON.stringify(results))
                }
                // LocalAuthentication.cancelAuthenticate();
              }catch(err) {
                Alert.alert('alert', 'login fail: ' + err)
                console.log(err);
              }
            }}>
                                         <View style={{width:300 ,  backgroundColor: 'rgba(12,10,1,0.5)',height:100 , margin:20 , borderRadius:10 , marginTop:10}}>
                             <Text style={{ color:"white" , fontSize:20 , paddingTop:30 , paddingLeft:20 } }>{item.Sitename} 🗝</Text>
                         </View>
          </TouchableOpacity>
              </>
      
      
      



        )} />
      </View>
    
      </ImageBackground>
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
    width:250,
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
  elevation:10
  },
  dp:{
    height:40,
    width:40,
    borderRadius:600
  },
  head:{
    backgroundColor:"rgba(12,10,1,0.5)",
    paddingBottom:40 , 
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20
   
},
headtitle:{
    color:"white",
    fontSize:20,
  //   padding:20 ,s
    borderColor:"orange",
    // borderBottomWidth:2,
    // width:110,
    marginLeft:20,
    marginTop:30,
    // paddingBottom:8
},
notetitle:{
    color:"orange",
    marginBottom:10
}

});
