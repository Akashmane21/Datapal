import { StatusBar } from 'expo-status-bar';
import React , { useState , useEffect , useRef} from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,
     ScrollView , ImageBackground  , Modal,Keyboard,Image,TextInput,Clipboard,Linking,
    Alert , Switch , FlatList } from 'react-native';
 import * as LocalAuthentication from 'expo-local-authentication';
 import { WebView } from "react-native-webview";     
import DatapalDB from '../config/Db'
import LottieView from 'lottie-react-native';
// import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import Yesterday from './Components/Yesterday'
import NetInfo from '@react-native-community/netinfo';



export default function App(props) {

    const {navigation} = props

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
      
    }


// States for Password Feild
const [usern, setusern] = useState('')
const [siten, setsiten] = useState('')
const [passn, setpassn] = useState('')
const [isPassmodal, setisPassmodal] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);

    
  const [isnetmoadal, setisnetmoadal] = useState(false)

            
    const [nav, setnav] = useState(true)
    const [isimg, setisimg] = useState()
    const [Links, setLinks] = useState()
    const [notedata, setnotedata] = useState([])
    const [searchTerm, setsearchTerm] = useState("")
    const [searchAttribute, setsearchAttribute] = useState("title")
    const [Taskslist, setTaskslist] = useState([])
    const [value, setValue] = useState(true);
    const [passdata, setpassdata] = useState()
    const [fromYesterday, setfromYesterday] = useState([])
    const [isEmpty, setisEmpty] = useState(true)
    const [yesday, setyesday] = useState('')


    const [fromYesterdaynote, setfromYesterdaynote] = useState([])
    const [isEmptynote, setisEmptynote] = useState(true)
    

    const [ismodalopen, setismodalopen] = useState(false)

        const [username, setusername] = useState('')
        const [userid, setuserid] = useState('')

// Lottie Animations States
    const animation = useRef(null);
    const header = useRef(null);
    const Go = useRef(null);
    const Go1 = useRef(null);
    const Go2 = useRef(null);

const [Site, setSite] = useState("")


// Date And Time VAr
    const date  = new Date().toDateString()
    const time = new Date().toLocaleTimeString()
    const [tdate, setdate] = useState(date)
    const [ttime, settime] = useState(time)
    let currDate = new Date()
    currDate = currDate.getHours(); 
    const [Greeting, setGreeting] = useState("")
   


    useEffect(() => {



        const getid = async () => {
            try {
             await   AsyncStorage.getItem('userId').then(
                    (value) =>{


                        setuserid(value)

                        const NotesList = DatapalDB.database().ref(`${value}/Notes`);
                        NotesList.on('value' , (snapshot)=>{
                          const todoList = []
                          const todos =snapshot.val()
                          for(let id in todos){
                            todoList.push({id, ...todos[id]})
                          }
                          const notesList = todoList.reverse()
                          setnotedata(notesList)


                        //   AsyncStorage.setItem('Notes', JSON.stringify(notesList))
                        //   .then(() => {
                        //     console.log('data saved');
                        //   })
                        //   .catch((error) => {
                        //     console.log(error);
                        //   });



                        //   AsyncStorage.getItem('Notes')
                        //   .then((value) => {
                        //     const user = JSON.parse(value);
                        //     console.log(user);
                            
                        //   })
                        //   .catch((error) => {
                        //     console.log(error);
                        //   });


                          
                          var d = new Date();
                            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            var mon = months[d.getMonth()]
                            var dateno = new Date().getDate();
                            var yes = dateno-1
                            const Todaysdate =yes + " "+mon
                            
                            const Yesterdaynotes = notesList.filter(yesternotes => yesternotes.date == Todaysdate)
                        
                           setfromYesterdaynote(Yesterdaynotes)


                            if(Yesterdaynotes.length == 0){
                                setisEmptynote(true)
                            }
                            else{
                                setisEmptynote(false)
                            }
                          
                        })

                      
                        


                        const tasklist = DatapalDB.database().ref(`${value}/Task`);
                        tasklist.on('value' , (snapshot)=>{
                          const todoList = []
                          const todos =snapshot.val()
                          for(let id in todos){
                            todoList.push({id, ...todos[id]})
                          }
                          const Tasklist = todoList.reverse()
                          setTaskslist(Tasklist)


                          var d = new Date();
                            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            var mon = months[d.getMonth()]
                            var dateno = new Date().getDate();
                            var yes = dateno-1
                            const Todaysdate =yes + " "+mon
                            setyesday(Todaysdate)
                            
                            const Yesterdaytask = Tasklist.filter(yestertask => yestertask.Date == Todaysdate)
                            setfromYesterday(Yesterdaytask)
                            if(Yesterdaytask.length == 0){
                                setisEmpty(true)
                            }
                            else{
                                setisEmpty(false)
                            }
                        
                        })


                    
                    
                    
                        const linklist = DatapalDB.database().ref(`${value}/Links`);
                        linklist.on('value' , (snapshot)=>{
                          const todoList = []
                          const todos =snapshot.val()
                          for(let id in todos){
                            todoList.push({id, ...todos[id]})
                          }
                          const Tasklist = todoList.reverse()
                          setLinks(Tasklist)
                        })
                    
                    
                        const Passlists = DatapalDB.database().ref(`${value}/Passwords`);
                        Passlists.on('value' , (snapshot)=>{
                          const todoList = []
                          const todos =snapshot.val()
                          for(let id in todos){
                            todoList.push({id, ...todos[id]})
                          }
                          const Tasklist = todoList.reverse()
                          setpassdata(Tasklist)
                        })
                    
                    }
                      )
            }
            catch (exception) {
                console.log(exception)
            }
    
        }

        getid()



        // AsyncStorage.removeItem('alreadyLaunched')
        AsyncStorage.getItem('username').then(
            (value) =>
              setusername(value))

              AsyncStorage.getItem('userId').then(
                (value) =>
                  setuserid(value))
                 



    
        animation.current.play(10, 220);
        header.current.play(10, 220);
     
        
    


   



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



















        
        
        if(currDate > 1 && currDate < 12){
           setGreeting("Good Morning🌄")
            
        }
        else if(currDate >= 12 && currDate < 17){
          setGreeting("Good Afternoon 🌞")
           
        }
        else if(currDate >= 17 && currDate < 19){
          setGreeting("Good Evening 🌅")
           
        }
        else if(currDate >= 19 && currDate < 24){
          setGreeting("Good Night🌚")
           
        }

  
   
  }, [])

  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height:1000}}>
     <ImageBackground blurRadius={3} style={{}} source={ require("../assets/intro/gradient.jpg")}>

<ScrollView style={{backgroundColor: isEnabled ? "#00000000" : "white"}}>


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
          <TouchableOpacity onPress={()=> setismodalopen(false)}>
            <Text style={{ height:130}}>.</Text>
          </TouchableOpacity>
     <View style={{
height:625, marginTop:0  , justifyContent:"center" ,      }} >
<TouchableOpacity onPress={()=> setismodalopen(false)}>
         <View style={{fontSize:14,height:30, backgroundColor:"black" ,alignItems:"center", borderTopLeftRadius:50, borderTopRightRadius:50 ,justifyContent:"center" ,color:"red"}}>
         <Text style={{height:3 , width:70 , backgroundColor:"gray" , borderRadius:30 , position:"relative" ,
top:0 , alignItems:"center"}}>hh</Text>

         </View>

</TouchableOpacity>
          <WebView  
                source = {{ uri:`${Site}` }}  
            /> 
         
     </View>
   </Modal>


     <View style={{...styles.upper , backgroundColor:isEnabled ? "rgba(14, 177, 206, 0.692)" :"#926a19" , paddingLeft:10}}>
      <Text style={styles.text}></Text>
         <View style={styles.animationContainer}>
              <View style={styles.title}>
                  
                 
                  <Text style={{color:"red"}}></Text>
                  <TouchableOpacity onPress={() => {
                    setismodalopen(true)
                    }}>
                  <Text style={{...styles.logo ,  color :"black" , width:250 }}>👋Hello , {username}</Text>
                 
                 </TouchableOpacity>
                  <Text style={{...styles.logo ,  color :"black"}}>{Greeting}</Text>
                  <Text></Text>
                  <Text style={{...styles.date ,  color : isEnabled ? "lightblue" : "black"}}>{tdate}</Text>
              <Text></Text>
              <TouchableOpacity onPress={()=> {
                setSite("https://covid19-live-updates.netlify.app/")
                setismodalopen(true)
                 }}>
                      <View style={{ flexDirection:"row", elevation:10, backgroundColor:isEnabled ? "#2061756c" : "#754e206c", alignItems:"center" , borderWidth:0 , marginRight:130 , marginTop:8 , borderRadius:20  , padding:3, paddingRight:8}}>
                      <LottieView
                        ref={animation}
                        style={{ width: 30,height: 40,   position:"relative" , top:-1 , left:-3}}
                        source={require('../assets/38198-corona-mask.json')}
                      />
                        <Text style={{color:"white" , fontSize:12}}> Covid19</Text>
                              
                      </View>
                      </TouchableOpacity> 
                      <TouchableOpacity onPress={()=> {
                        setSite("https://news-waves.netlify.app/")
                setismodalopen(true)
                      }}>

                      <View style={{ flexDirection:"row",  elevation:10, backgroundColor:isEnabled ? "#2061756c" : "#754e206c", alignItems:"center" , borderWidth:0 , marginRight:130 , marginTop:8 , borderRadius:20  , padding:7}}>
                      <Image  style={{height:20 , width:30 ,position:"relative" , top:3}} source={{ uri: `https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FNews.png?alt=media&token=606a3d3c-0216-4141-b085-e7edd20198d8`, }}    />
                        <Text  style={{color:"white" , fontSize:12 , position:"relative" }}>News </Text>
                        

                      </View>
                      </TouchableOpacity>
               </View>
            
            <LottieView
              ref={header}
              style={{ width: 120,height: 250,   position:"relative",left:-70, top:30   }}
              source={require('../assets/39019-completing-tasks.json')}
             />
    
          </View>
   </View>

<View style={styles.theme}>

             <View style={styles.themeopt}>
                 { isEnabled ? (  <Text style={styles.color}>🌚</Text>) : ( <Text style={styles.color}>🌞</Text>)  }

                  <Switch
                  trackColor={{ false: 'gray', true: 'gray' }}
                  thumbColor={isEnabled ? 'orange' : 'yellow'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
             </View>
          </View>
          
<Text style={{color: isEnabled? "white" :"black" , fontSize:17 , marginLeft:10}}>Keep it All in one ✨</Text>
         
          <ScrollView horizontal={true}>
              <View style={{flexDirection:"row" , margin:7 , padding:6}}>
                      <TouchableOpacity  >
                  <Text style={{...styles.scrollbtn , backgroundColor:isEnabled? "white" : "#198dc269" , color:isEnabled?"black":"white"}}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> navigation.navigate("Notes" , {item:{Theme : isEnabled}})}>
                  <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>Note's</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> navigation.navigate("Tasks" , {item:{Theme: `${isEnabled}`}})}>
                  <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>Task's</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> navigation.navigate("Links" , {item:{Theme : isEnabled}})}>
                  <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>Links</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> navigation.navigate("Passwords" , {item:{Theme : isEnabled}})}>
                  <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>Password's</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                setSite("https://covid19-live-updates.netlify.app/")
                setismodalopen(true)
                 }}>
                   <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>Covid19</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> {
                        setSite("https://news-waves.netlify.app/")
                setismodalopen(true)
                      }}>
                                        <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>News Wave</Text>
</TouchableOpacity>


                  <TouchableOpacity onPress={()=> {
                        setSite("https://akashmane21.github.io/Akash/")
                setismodalopen(true)
                      }}>
                                        <Text style={{...styles.scrollbtn , backgroundColor:isEnabled ? "gray" : "#ecf0f3" ,  color:isEnabled?"black":"black"}}>About Developer</Text>
</TouchableOpacity>

              </View>
          </ScrollView>


<View style={styles.Strip}>
    <Text style={{...styles.Strip_title , color:isEnabled ? "white" : "#673ab7"}}>Note's</Text>
    <TouchableOpacity onPress={()=> navigation.navigate("Notes",   { item :   { Theme: isEnabled }})}>
    <Text style={styles.Strip_all}>see all</Text>
    </TouchableOpacity>
</View>



<ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} >    
       
        <FlatList
         horizontal
        pagingEnabled={true}
        // numColumns={2}
        contentContainerStyle={{
       
        // width:800
    }}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}              
        style={{marginTop:10 , marginLeft:10}}   
        data={notedata}
        renderItem={({ item }) => (
          <>
        <View style={{...styles.notecard ,  backgroundColor: isEnabled ? `#161b22` : "#ecf0f3" }}>


       <TouchableOpacity onPress={()=> navigation.navigate('Detail' , { item :
        { 
          Title : `${item.title}`,
          Img :`${item.img}`,
          Note:`${item.note}`,
          Date :`${item.date}`,
          Time :`${item.time}`,   
          Theme: `${isEnabled }`,
          Id : `${item.id}`
       }}
       
       )}>     

        { item.img == "" ? (   <Text style={{...styles.note , color: isEnabled? "lightgray":"black"}}>{item.note}</Text>   ) 
        : (  <Image  style={styles.poster} source={{ uri: `${item.img}`, }}    /> ) }

          <View style={styles.cardinfo}>
                  <Text style={{...styles.notetitle , color: isEnabled ? "white" : "green"}}>{item.title}</Text>
            <View style={styles.dt}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.date}>{item.date}</Text>
              </View>
          </View>

     </TouchableOpacity> 
 </View>
        </>
 )} />
 </ScrollView>


 <View style={styles.Strip}>
    <Text style={{...styles.Strip_title , color:isEnabled ? "white" : "#673ab7"}}>Task's</Text>
    <TouchableOpacity onPress={()=> navigation.navigate("Tasks"  , { item :   { Theme: `${isEnabled}` }})}>
    <Text style={styles.Strip_all}>see all</Text>
    </TouchableOpacity>
</View>

<ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} >
      <FlatList
         horizontal
          pagingEnabled={true}
          legacyImplementation={false}
          style={{marginTop:30 , marginLeft:10}}
          data={Taskslist}
          renderItem={({ item }) => (
          <>
           <TouchableOpacity onPress={()=>{
                      const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                    todoref.update({
                      complete:!item.complete,
                    })
                    }}>
    <View style={{...styles.notecard , borderWidth:1, borderColor : item.complete ? "green" :"red",   backgroundColor:isEnabled ? `#06121e` : "#ecf0f3"  }}>


        <View style={styles.block}>

            <TouchableOpacity onPress={()=>{
              const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
              todoref.remove()
            }}>   
            <Text style={styles.Delete}>❌</Text>



              </TouchableOpacity> 
                  { item.complete ? ( 

                    <TouchableOpacity onPress={()=>{
                      const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                    todoref.update({
                      complete:!item.complete,
                    })
                    }}>
                  <Text style={styles.Complete}>✔</Text>



                      </TouchableOpacity>
                          ) : ( 
                            <TouchableOpacity onPress={()=>{
                        const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                        console.log("clicked")
                      todoref.update({
                        complete:!item.complete,
                      })
                      }}>
                      <Text style={styles.Complete}></Text>
              </TouchableOpacity>      
              )  } 

      </View>

      <Text style={{...styles.taskview , color: isEnabled ?  "lightgray" : "black" , textDecorationLine:item.complete ? "line-through" : "none"}  }>{item.Task}</Text>



    <View style={styles.cardinfo}>
        <View style={styles.dt}>
            <Text style={styles.time}>{item.Time}</Text>
            <Text style={styles.date}>{item.Date}</Text>
        </View>
    </View>

</View>
</TouchableOpacity>
        </>




        )} />
        </ScrollView>





        <View style={styles.Strip}>
    <Text style={{...styles.Strip_title , color:isEnabled ? "white" : "#673ab7"}}>Link's</Text>
    <TouchableOpacity onPress={()=> navigation.navigate("Links", { item :   { Theme: isEnabled }})}>
    <Text style={styles.Strip_all}>see all</Text>
    </TouchableOpacity>
</View>


<ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} >
      <FlatList
          horizontal
          pagingEnabled={true}
        style={{marginTop:30 , marginLeft:10}}
        data={Links}
        renderItem={({ item }) => (
          <>
                    <TouchableOpacity onPress={ () => Linking.openURL(`${item.Link}`)} style={{}}>

   <View style={{...styles.linkcard ,  backgroundColor:isEnabled ? `#161b22` : "#ecf0f3" , height:140}}>


      <Text style={{ color:isEnabled ? "white" :"orange"  } }>{item.Sitename}</Text>
  <Text style={{color:isEnabled ? "gray" : "black" , marginTop:6}}>{item.Link}</Text>
       
      </View>
      </TouchableOpacity>
        </>




        )} />
</ScrollView>








<View style={styles.Strip}>
    <Text style={{...styles.Strip_title , color:isEnabled ? "white" : "#673ab7"}}>Password's 🔐</Text>
    <TouchableOpacity onPress={()=> navigation.navigate("Passwords" , { item :   { Theme: isEnabled }})}>
    <Text style={styles.Strip_all}>see all</Text>
    </TouchableOpacity>
</View>
<View style={{flexDirection:"row"}}>
        <Image  style={{height:170 , width:"95%" ,margin:10 , borderRadius:10 }} source={{ uri: `https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2VjdXJpdHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`, }}    />
<Text style={{position:"relative",top:10,paddingLeft:30 , left:-353 , fontSize:25 , backgroundColor:"rgba(12,10,1,0.5)" , alignItems:"center" , paddingTop:70 , width:346 , height:170 , color:"green" , borderRadius:10}}></Text>
</View>
 

 <View style={{position:"relative" , top:-70}}>
 <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} >
      <FlatList
          horizontal
          pagingEnabled={true}
          
        style={{marginTop:0 , marginLeft:10 , }}
        data={passdata}
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
         <View style={styles.Password_area}>
             <Text style={styles.Sitename}>{item.Sitename} 🗝</Text>
         </View>
    </TouchableOpacity>
        </>




        )} />
        </ScrollView>
</View>










<View style={styles.Strip}>
    <Text style={{...styles.Strip_title , color:isEnabled ? "white" : "#673ab7"}}>All About Yesterday ✨</Text>
</View>


<View style={{...styles.Yesbox ,  backgroundColor:isEnabled ? "#161b22" : "#ecf0f3"}}>
<Text style={{fontSize:18 , color:"gray"}}>{yesday} (Task's)</Text>
{isEmpty ? (


    
    <Text style={{...styles.no , color:isEnabled ? "gray" :"black"}}>look's Like There is no Task from Yesterday</Text>


 ) : (


















      <FlatList
        //  horizontal
        // numColumns={2}
          pagingEnabled={true}
          legacyImplementation={false}

          style={{marginTop:30 , margin:10 }}
          data={fromYesterday}
          renderItem={({ item }) => (
          <>
           <TouchableOpacity onPress={()=>{
                      const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                    todoref.update({
                      complete:!item.complete,
                    })
                    }}>
    <View style={{...styles.yestask , borderWidth:0, borderColor : item.complete ? "green" :"red",   backgroundColor:isEnabled ? `#06121e` : "white"  }}>


        <View style={styles.block}>

            <TouchableOpacity onPress={()=>{
              const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
              todoref.remove()
            }}>   
            <Text style={styles.Delete}>❌</Text>



              </TouchableOpacity> 
                  { item.complete ? ( 

                    <TouchableOpacity onPress={()=>{
                      const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                    todoref.update({
                      complete:!item.complete,
                    })
                    }}>
                  <Text style={styles.Complete}>✔</Text>



                      </TouchableOpacity>
                          ) : ( 
                            <TouchableOpacity onPress={()=>{
                        const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                        console.log("clicked")
                      todoref.update({
                        complete:!item.complete,
                      })
                      }}>
                      <Text style={styles.Complete}></Text>
              </TouchableOpacity>      
              )  } 

      </View>

      <Text style={{...styles.taskview , color: item.complete ? "green" : isEnabled ?  "lightgray" : "black" , textDecorationLine:item.complete ? "line-through" : "none"}  }>{item.Task}</Text>



    <View style={styles.cardinfo}>
        <View style={styles.dt}>
            <Text style={styles.time}>{item.Time}</Text>
            <Text style={styles.date}>{item.Date}</Text>
        </View>
    </View>

</View>
</TouchableOpacity>
        </>




        )} />
       
        )}
        </View>






        <View style={{...styles.Yesbox ,  backgroundColor:isEnabled ? "#161b22" : "#ecf0f3"}}>
<Text style={{fontSize:18 , color:"gray"}}>{yesday} (Note's)</Text>
{isEmptynote ? (


    
    <Text style={{...styles.no , color:isEnabled ? "gray" :"black"}}>look's Like There is no Note's from Yesterday</Text>


 ) : (

    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} >    
       
        <FlatList
         horizontal
        pagingEnabled={true}
        // numColumns={2}
        contentContainerStyle={{
       
        // width:800
    }}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}              
        style={{marginTop:10 , marginLeft:10}}   
        data={fromYesterdaynote}
        renderItem={({ item }) => (
          <>
        <View style={{...styles.notecard ,  backgroundColor:isEnabled ? `#06121e` : "white"}}>


       <TouchableOpacity onPress={()=> navigation.navigate('Detail' , { item :
        { 
          Title : `${item.title}`,
          Img :`${item.img}`,
          Note:`${item.note}`,
          Date :`${item.date}`,
          Time :`${item.time}`,   
          Theme: `${isEnabled }`,
          Id : `${item.id}`
       }}
       
       )}>     

        { item.img == "" ? (   <Text style={{...styles.note , color: isEnabled? "lightgray":"black"}}>{item.note}</Text>   ) 
        : (  <Image  style={styles.poster} source={{ uri: `${item.img}`, }}    /> ) }

          <View style={styles.cardinfo}>
                  <Text style={{...styles.notetitle , color: isEnabled ? "white" : "green"}}>{item.title}</Text>
           
          </View>

     </TouchableOpacity> 
 </View>
        </>
 )} />
 </ScrollView>

 )}

</View>


<TouchableOpacity onPress={()=> {
                        setSite("https://akashmane21.github.io/Akash/")
                setismodalopen(true)
                      }}>
<View style={{...styles.About ,backgroundColor:isEnabled ? `rgba(12,10,1,0.5)` : "#ecf0f3" }}>
    <Image source={{uri : "https://images.weserv.nl/?url=https%3A%2F%2Fscontent-sea1-1.cdninstagram.com%2Fv%2Ft51.2885-15%2Fe35%2Fs240x240%2F81556175_1405305682962714_3867499241564728922_n.jpg%3Ftp%3D1%26_nc_ht%3Dscontent-sea1-1.cdninstagram.com%26_nc_cat%3D106%26_nc_ohc%3D6Fb2Ra-wz3sAX-2oCj4%26edm%3DAPU89FABAAAA%26ccb%3D7-4%26oh%3D5c4974056a2c3c94e0462568ba1bd820%26oe%3D60B4A0A8%26_nc_sid%3D86f79a"}}
    style={{width:30 , height:30 , borderRadius:50}} />
    <Text style={{...styles.aboutme , color:isEnabled ? "lightgray" : "black"}}>About Developer</Text>
</View>
</TouchableOpacity>
</ScrollView>




    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    About:{
        padding:5,
        flexDirection:"row" , alignItems:"center", justifyContent:"space-around",
        margin:20,
        borderRadius:50
    },
    aboutme:{
        fontSize:16
    },
    Yesbox:{
        // height:500,
        borderWidth:0,
        borderRadius:5,
        margin:10,
        padding:10,
        borderTopWidth:2,
        borderTopColor:"red",
        // overflow:"scroll"

    },
    no:{
        color:"yellow",
        fontSize:18,
        paddingTop:50
    },
    Strip:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:10,
        alignItems:"flex-end"
    },
    Strip_title:{
        fontSize:20,
        color:"white",
        
    },
    Strip_all:{
        fontSize:13,
        color:"gray"
    },
    Password_area:{
        marginRight:20,
        padding:5,
        borderWidth:1,
        marginBottom:10,
        padding:9,
        borderRadius:10,
        marginLeft:10,
        borderColor:"gray",
        borderBottomWidth:2,
        borderBottomColor:"green"
        
    },
    Sitename:{
        fontSize:20,
        color:"white"
    },
    name:{
        color:"black"
      },
      container:{
        // backgroundColor:"black"
        position:"relative",
        top:-40
      },
      card:{
        width:"47%",
        margin:5,
        padding:0,
        borderRadius:10,
        // elevation:8
      },
      cardinfo:{
        paddingStart:10,
        // backgroundColor:`#161b22`,
        elevation:30
      },
     
      animationContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        // borderBottomWidth:3,
        borderRadius:20,
        // borderColor:"red"
    
      },
      upper:{
        backgroundColor:"gray",
        paddingBottom:30,
        borderBottomRightRadius:130
    
      },
      logo:{
      fontSize:23,
      color:"lightblue"
     
      },
      dt:{
        display:"flex",
        flexDirection:"row",
        marginBottom:8,
        justifyContent:"space-between",
       
        marginTop:10,
        marginRight:8
      },
      title:{
    // backgroundColor:"lightblue",
    padding:8,
    borderRadius:10,
      },
      notetitle:{
        color:"white",
        fontSize:18,
        // paddingTop:10
        
      },
      poster :{
        height:150,
        width:"100%",
        backgroundColor:"#21262d",
        // margin:4,
        borderRadius:10,
        // elevation:4
        
    
    },
    note:{
      color:"lightgray",
      height:153,
      overflow:"hidden",padding:10
    },
    
    taskview:{
      color:"gray",
    //   height:80,
      overflow:"hidden",
      marginTop:8
    },
    text:{
      // backgroundColor:"black",
      
    },
    date:{
      color:"gray",
      fontSize:10
    },
    time:{
      color:"gray",
      fontSize:10,
    
    },
    dummy:{
      height:0
    },
    heading:{
      color:"white",
      fontSize:20,
      paddingLeft:10,
    
      marginLeft:4,
      borderRadius:7,
      borderLeftWidth:1,
      borderColor:"yellow",
      width:100,
      position:"relative",
      top:40,
      marginLeft:20
    },
    search:{ 
      height: 40,
      borderRadius:20 ,
      width:250,
      padding:10
    },
    searchbox:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    backgroundColor:"rgba(16, 151, 156, 0.733)",
    borderRadius:20,
    margin:20
    },
    dp:{
      height:40,
      width:40,
      borderRadius:600
    },
    
    theme:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    },
    color:{
      color:"gray",
    
    },
    themeopt:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      borderColor:"#161b22",
      borderRadius:20,
      paddingLeft:5,
      paddingRight:6,
      marginRight:10,
      position:"relative",
      top:-230,
      elevation:30,
      left:270
    
    },
    block:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-end"
    }, 
    Complete:{
      borderRadius:5,
      borderWidth:2,
      borderColor:"green",
      padding:3,
      color:"black",
      backgroundColor:"gray",
      height:25,
      width:25,
     fontSize:13,
     paddingLeft:5,
     
    },
    Delete:{
      borderRadius:60,
      borderColor:"red",
      padding:5,
      color:"white",
      marginRight:10,
      backgroundColor:"gray",
      height:25,
      width:25,
     fontSize:10
    },
    
    notecard:{
      width:220,
      margin:10,
      padding:7,
      borderRadius:10,
      marginTop:0
    },
    yestask:{
        width:"90%",
      margin:10,
      padding:7,
      borderRadius:10,
      marginTop:0

    },
    
    linkcard:{
      width:280,
      margin:10,
      padding:10,
      borderRadius:10,
      elevation:4,
      marginTop:0
    },
    scrollbtn:{
        fontSize:16,
        color:"white",
        padding:6,
        marginRight:10,
        backgroundColor:"#198dc269",
        borderRadius:15,
        paddingRight:19
    }
    
    
    
});
