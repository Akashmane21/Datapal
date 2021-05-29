import { StatusBar } from 'expo-status-bar';
import React , { useState , useEffect ,useRef} from 'react';
import { StyleSheet, Dimensions, View , Text , FlatList , ScrollView , TouchableOpacity , TextInput  , Modal} from 'react-native';
import LottieView from 'lottie-react-native';
import DatapalDB from '../config/Db'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';


export default function App(props) {

  const {navigation} = props
  const { route } = props
  const { item } = route.params
  const  { Theme } = item

  const [isEnabled, setisEnabled] = useState(Theme)
  const data = []


  const animation = useRef(null);
  const animation1 = useRef(null);
  const animation2 = useRef(null);

  const [userid, setuserid] = useState('')


const [isModalopen, setisModalopen] = useState(false)
const [isAdd, setisAdd] = useState(false)


const [Alltodo, setAlltodo] = useState('12')
const [Completedtask, setCompletedtask] = useState('')
const [notCompleted, setnotCompleted] = useState('')
const [statcomp, setstatcomp] = useState(0.4)
const [statnot, setstatnot] = useState(0.6)


  const [tasktext, settasktext] = useState("")
  const [taskadd, settaskadd] = useState(false)
  const [Data, setData] = useState(data)
  const [theme, settheme] = useState("")
  const [cardback, setcardback] = useState('')
  const [textxolor, settextxolor] = useState('')







  function Add(){

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

  settasktext("")

  const todoref = DatapalDB.database().ref(`${userid}/Task`);
  const todo = {
      Task : `${tasktext}`,
      Time :`${nowtime}`,
      Date:`${Todaysdate}`,
      complete:false
  };
  todoref.push(todo)
setisAdd(!isAdd)
}



  useEffect(() => {
    

    



    AsyncStorage.getItem('userId').then(
      (value) =>{
        setuserid(value)

    const tasklist = DatapalDB.database().ref(`${value}/Task`);
    tasklist.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const Tasklist = todoList.reverse()
      setData(Tasklist)
     const all =Tasklist.length 
     setAlltodo(all)

    })

    DatapalDB.database().ref(`${value}/Task`).orderByChild("complete").equalTo(true).once("value", snapshot => {
      const dc = []
      const todos =snapshot.val()
      for(let id in todos){ dc.push({id, ...todos[id]}) }
      const reverseddc = dc.reverse();

     const completed  = reverseddc.length
     setCompletedtask(completed)
     const compt = Completedtask/Alltodo
     setstatcomp(compt)

    
    })

    
    DatapalDB.database().ref(`${value}/Task`).orderByChild("complete").equalTo(false).once("value", snapshot => {
      const dc = []
      const todos =snapshot.val()
      for(let id in todos){ dc.push({id, ...todos[id]}) }
      const reverseddc = dc.reverse();

     const completed  = reverseddc.length

    
    setnotCompleted(completed)
    const notcompt = notCompleted/Alltodo
 
    setstatnot(notcompt)
    })
  })


    animation.current.play(10, 220);
    animation1.current.play(10, 220);
    animation2.current.play(10, 220);


    if(Theme=="true"){ 
       settheme("#0d1117")
       setcardback("#0a2833")
       settextxolor('white')
    }
    else{
      settheme("white")
      setcardback("#ecf0f3")
      settextxolor("black")

    
    }


  //  navigation.navigate('Tasks')
  // backgroundColor:isEnabled ? `#06121e` : "white"
 
 
    
  
   
  }, [])



  
  return (
   <>
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme}}>
   



        <View style={styles.header}>

                  <Text></Text>
                  <Text></Text>
                  <View style={{flexDirection:"row" , height:150}}>
                      <LottieView
                      ref={animation}
                      style={{ width: 200, height: 150,    }}
                      source={require('../assets/61548-add-task.json')}
                      />  


          <View style={styles.taskstitle}>
                  <LottieView
                  ref={animation2}
                  style={{  height: 200,  position:"relative", top:-20, left:-60  }}
                  source={require('../assets/1353-task-done.json')}
                  />
                  </View>
            </View>


        </View>
      

    <View style={{padding:10 , flexDirection:"row",flexWrap:"wrap"}}>
    <View>

    
        </View>

    <View style={{flexDirection:"row"}}>
        <Text style={{ ...styles.count , backgroundColor:"rgba(32, 88, 173, 0.274)" ,color:textxolor , width:130       }}>All Task's   :    {Alltodo}</Text>
        <View style={{borderWidth:1 , padding:5 , marginLeft:6, borderRadius:10, width:200}}>
        <Text style={{...styles.count,backgroundColor:"rgba(86, 158, 72, 0.267)",color:textxolor }}>Completed          :    {Completedtask}</Text>
        <Text style={{...styles.count , backgroundColor:"rgba(173, 32, 32, 0.274)",color:textxolor}}>Not Completed   :    {notCompleted}</Text>
       </View>
      </View>

    </View>


       
    <FlatList
style={{position:"relative",
top:0, marginBottom:100}}
        pagingEnabled={true}
        legacyImplementation={false}
        data={Data}
        renderItem={({ item }) => (
          <>
          <TouchableOpacity onPress={()=>{
            
  const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
todoref.update({
  complete:!item.complete,
})
}}>
          <View style={{...styles.taskcard , 
          //  backgroundColor:item.complete ? "rgba(36, 114, 20, 0.267)" :"#161b22",
          //  borderWidth:item.complete ? 2 : 0,
          //  backgroundColor:item.complete ? "rgba(86, 158, 72, 0.267)" : cardback,
          // backgroundColor:cardback
          backgroundColor:cardback,
          marginLeft:10,
          marginRight:10
            }}>


            <View style={styles.block}>

            <TouchableOpacity onPress={()=>{
             
                const todoref = DatapalDB.database().ref(`${userid}/Task`).child(item.id);
                todoref.remove()
              }}>   
              <Text style={styles.Delete}>❌</Text>
            </TouchableOpacity> 
                  
       
       


      
       </View>
     <View style={{flexDirection:"row" , alignItems:"center"}}>

       
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
  
todoref.update({
  complete:!item.complete,
})
}}>
<Text style={{...styles.Complete , borderColor:"orange"}}></Text>
</TouchableOpacity>      
)  } 


<Text style={{...styles.Task , color: item.complete ? "green" : "rgba(196, 25, 25, 0.877)" , textDecorationLine:  item.complete ?'line-through' : "none",}}>{item.Task}</Text>

     </View>

                <View style={styles.dt}>
                       <Text style={styles.Time}>{item.Time}</Text>
                      <Text style={styles.Date}>{item.Date}</Text>
                </View>


          </View>

          </TouchableOpacity>



          </>
        )} />







</ScrollView>
            <View style={{...styles.textboxview , flexDirection:"row" , backgroundColor:cardback}}>
        <TextInput style={{...styles.textbox , width:"80%" ,backgroundColor:"white" , color:"black"}} placeholder="Enter Task Here 📝.." onChangeText={text=>  settasktext(text)} value={tasktext}></TextInput>
           <TouchableOpacity onPress={Add}>

                <View style={styles.addtaskbtn}>
                    <LottieView
                    ref={animation1}
                    loop={false}
                    style={{ height: 55 ,position:"relative" , top:37  ,       elevation:0, left:-5 }}
                    source={require('../assets/9788-add-new.json')}
                    />
                    {/* <Text style={styles.addTask}>Add Task</Text> */}
                </View>
            </TouchableOpacity>
        </View> 
 
    </>

   
  );
}

const styles = StyleSheet.create({
  container:{
  },
  Task:{
    // color:"white",
    fontSize:20,
    paddingLeft:7
  },
  addTask:{
    color:"lightblue",
    fontSize:16
  },
  box:{
    padding:8,
    margin:10,
    borderColor:"black",
    borderRadius:10,
    // borderWidth:1,
    backgroundColor:"rgba(169, 173, 177, 0.596)"
  },
  block:{
    display:"flex",
    flexDirection:"row",
   
    // marginTop:20,
    alignItems:"center",
    justifyContent:"flex-end"
  },
  Time:{
    color:"gray",
    fontSize:10
  },
  Date:{
    color:"gray",
    marginLeft:10,
    fontSize:10

  },
  Complete:{
    borderRadius:50,
    // borderWidth:2,
    borderColor:"green",
    padding:3,
    // backgroundColor:"lightgreen",
    color:"black",
    backgroundColor:"gray",
    height:25,
    width:25,
   fontSize:13,
   paddingLeft:5,
   
  },
  Delete:{
    borderRadius:60,
    // borderWidth:2,
    borderColor:"red",
    padding:5,
    color:"white",
    marginRight:10,
    // backgroundColor:"gray",
    height:25,
    width:25,
   fontSize:10
  },
  header:{
    backgroundColor:"rgba(5, 255, 213, 0.39)",
    padding:10,
    borderBottomRightRadius:100

  },
  alltasks:{
    fontSize:25,
    color:"rgb(255, 84, 5)"
  },
  dt:{
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  taskstitle:{
    width:100,
    height:100,
  },
  add:{
    position:"absolute",
    bottom:0,
    display:"flex",
    flexDirection:"row",
   
    justifyContent:"flex-end",

    },
    addtask:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      // borderWidth:1,
      borderColor:"gray",
      margin:10,
      borderRadius:10,
      height:100,
      // backgroundColor:"rgba(92, 91, 90, 0.548)",
      elevation:20
      
    },
    addtaskbtn:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      borderRadius:100,
      // backgroundColor:"red",
      // elevation:20,
      paddingRight:10,
      // marginLeft:190,
      width:140,
      marginTop:0,
      marginBottom:20,
      position:"relative",
      top:-70
      
      // justifyContent:"flex-end",

    },
    textbox:{
          // backgroundColor:"#273239",
        fontSize:14,
        color:"rgba(5, 255, 213, 0.39)",
        padding:6,
        margin:10,
        borderRadius:10,
        height:45,
        // width:100
    },
    textboxview:{
      backgroundColor:"#161b22",
     
      // padding:6,
      // margin:10,
      borderRadius:10,
      paddingBottom:20,
      height:70,
      borderRadius:10,
      position:"absolute",
      bottom:0,
      width:360
    },
    taskcard:{
      padding:8,
      // margin:10,
      borderColor:"green",
      borderRadius:10,
      marginTop:9
    },
    count:{
      padding:10 ,
      borderRadius:10,
      color:"black",
      marginBottom:4,
      width:"100%"
    }
});
