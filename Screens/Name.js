import { StatusBar } from 'expo-status-bar';
import React , {useEffect , useRef , useState} from 'react';
import { StyleSheet,  View , Text , TextInput , TouchableOpacity , SafeAreaView,
   
    Image,
    Button,ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';
import AppIntroSlider from 'react-native-app-intro-slider';
import DatapalDB from '../config/Db'


export default function Setting(props) {

    const animation = useRef(null);
    useEffect(() => {
        // animation.current.play();

     }, [])

    const [showRealApp, setShowRealApp] = useState(false);

    const onDone = () => {
      setShowRealApp(true);
    };
  
    const onSkip = () => {
      setShowRealApp(true);
    };

    const RenderItem = ({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 100,
            }}>
            <Text style={styles.introTitleStyle}>{item.title}</Text>
            <Image style={styles.introImageStyle} source={item.image} />
            <Text style={styles.introTextStyle}>{item.text}</Text>
          </View>
        );
      };

      






const {navigation} = props
const [username, setusername] = useState('')
const [color, setcolor] = useState('#00000000')


function submit(){

    if( username.length == 0){
            // console.warn("Type your Name")
            setcolor("red")
    }
    else{
         // AsyncStorage.setItem('userauthcheck', "true")
    AsyncStorage.setItem('realAuthuser', "true"); 

    AsyncStorage.setItem('username', username)
    const randomstring = Math.random().toString(36).slice(2)
    const userId = username+randomstring
    AsyncStorage.setItem('userId', userId)

    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var mon = months[d.getMonth()]
    var dateno = new Date().getDate();
    var yes = dateno-1
    const yesdate =yes + " "+mon
    const todaysdate=dateno +" "+mon


    const note1 =  {
        title: "Note", 
         note: "This is Dummy Note You Can Delete this  , Thank you ✨", 
         img:"",
         time: "Time", 
         date: todaysdate,
         color:"#19a9c22f"
         
         }
     
               const notes2 = DatapalDB.database().ref(`${userId}/Notes`);
               notes2.push(note1)
         

    const note =  {
        title: "First Note", 
        note: "This is Dummy Note You Can Delete this  , Thank you ✨", 
        img:"https://cdn.dribbble.com/users/79571/screenshots/10753505/media/115e61882c77c6b2e2dcd5d3d8a519cb.png?compress=1&resize=400x300",
        time: "Time", 
        date: yesdate,
        color:"#19a9c22f"
        
        }
    
              const notes1 = DatapalDB.database().ref(`${userId}/Notes`);
              notes1.push(note)


              const todoref = DatapalDB.database().ref(`${userId}/Task`);
              const todo = {
                  Task : "Not Completed Task looks Like this..",
                  Time :"Time",
                  Date:todaysdate,
                  complete:false
              };
              todoref.push(todo)

              const todoref2 = DatapalDB.database().ref(`${userId}/Task`);
              const todo1 = {
                  Task : "Completed Task looks Like this.. ",
                  Time :"Time",
                  Date:yesdate,
                  complete:true
              };
              todoref2.push(todo1)



              
        const Link1 =  {
            Sitename: "Covid19 Tracker" , 
        Link :"https://covid19-live-updates.netlify.app/" 
            }
 
         const Links1 = DatapalDB.database().ref(`${userId}/Links`);
 
         Links1.push(Link1)




         
        const Link2 =  {
            Sitename: "News Wave's ✨" , 
        Link :"https://news-waves.netlify.app/"  
            }
         const Links2 = DatapalDB.database().ref(`${userId}/Links`);
 
         Links2.push(Link2)




         
        const Passwords1 = DatapalDB.database().ref(`${userId}/Passwords`);
        const doc1 =  {
           Sitename: "Github", 
           User :"Github@123" ,
           Password  : "1234321" 
           }
        
        Passwords1.push(doc1)



        
        const Passwords2 = DatapalDB.database().ref(`${userId}/Passwords`);
const doc2 =  {
   Sitename: "Facebook", 
   User :"Facebook@123" ,
   Password  : "1234321" 
   }

Passwords2.push(doc2)


    navigation.navigate("Home")
    }





   
}
   



  return (
    <>
    {showRealApp ? (
        <>
        <ImageBackground blurRadius={0.4} style={{height:790 }} 
        source={{uri : "https://images.unsplash.com/photo-1607250468616-f96f0b46ca6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80"}}
        >

    <View style={{flex:1 }}>
    
     <View style={styles.head}>
     <Text style={{fontSize:40}}></Text>
        <View style={{alignItems:"center" , padding:20, borderRadius:20 , paddingTop:30 , paddingLeft:50}}>
                        <Image style={{height:150 , width:200}} source={require("../assets/icon.png")} />
                        <Text style={{fontSize:20 , color:"orange" , paddingTop:10 }}>DataPal ✨</Text>
        </View>
     </View>

         


    </View>
   
</ImageBackground>




 <View style={{...styles.textboxview }}>
   
   
   <View style={{ }}>
        <TextInput
        onChangeText={(text)=> {
                     setusername(text)
                     console.log(username)
                     }} 
        style={{...styles.textbox  ,backgroundColor:"gray" ,margin:20,marginBottom:0,
         color:"black" , borderColor:color , borderWidth:2 , height:60}} 
        placeholder="Enter Your Name Here 📝.."  />


                <TouchableOpacity onPress={submit} style={{backgroundColor:"orange", margin:20 , borderRadius:50 , padding:5 }}>
                    <View style={{flexDirection:"row" , alignItems:"center" , justifyContent:"space-around" , height:50}}>
                            <Text style={{fontSize:15 , color:"black" , paddingLeft:0  }}>Get Started</Text>
                    </View>
              </TouchableOpacity>

       
     
     </View>
 </View> 



</>


    ):(

        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
        />
    )}

    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
      },
      titleStyle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
      paragraphStyle: {
        padding: 20,
        textAlign: 'center',
        fontSize: 16,
      },
      introImageStyle: {
        width: 200,
        height: 200,
      },
      introTextStyle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 30,
      },
      introTitleStyle: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
      },
      footer:{
          flexDirection:"row",
          margin:20,
          alignItems:"center",
          justifyContent:"center",
          position:"absolute",
        //   bottom:0,
        //   paddingBottom:60
      },
      head:{
        //   backgroundColor:"gray"
        justifyContent:"center",
        alignItems:"center"
      },
      textbox:{
        // backgroundColor:"#273239",
      fontSize:14,
      color:"rgba(5, 255, 213, 0.39)",
      padding:6,
    //   margin:10,
      borderRadius:70,
      height:40,
      paddingLeft:96
    //   paddingBottom:70
      // width:100
  },
  textboxview:{
    // backgroundColor:"#161b22",
   
    // padding:6,
    // margin:10,
    borderRadius:10,
    // paddingBottom:10,
    // height:150,
    borderRadius:10,
    position:"absolute",
    bottom:0,
    width:360,
    paddingTop:30,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  handlebar:{
      backgroundColor:"gray",
      width:50 ,
      borderRadius:30,
      height:5,
      marginLeft:150,
      position:"relative",
      top:-20
  }
});




const slides = [
    {
      key: 's1',
      text: "Store your Important Note's With Favouurite Background Color .          Your Note is also Availabe in Audio 🎶 Format Means no Need to Read📜 ",
      title: 'Add Notes 📝',
      image: {
        uri:
          'https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png',
      },
      backgroundColor: '#7671de',
    },
    {
      key: 's2',
      title: "Add Task's",
      text: "Always Complete Your Task Within Time , Don't Forget to Complete the Task  ✏",
      image: {
        uri:
          'https://img.freepik.com/free-vector/survey-exam-form-long-paper-sheet-with-answered-quiz-checklist-success-result-assessment-flat-cartoon_101884-751.jpg?size=338&ext=jpg',
      },
      backgroundColor: '#13d5d4',
    },
    {
      key: 's3',
      title: "Store the Link's  🔗",
      text: "Create a Collection Of Your all Important Link's 🔗. Like Your Meeting link And Much More..",
      image: {
        uri:
          'https://www.hostgator.com/blog/wp-content/uploads/2019/07/URL-vs-Domain.png',
      },
      backgroundColor: '#007fa4',
    },
    {
      key: 's4',
      title: "Store Password's 🔐",
      text: ' Store your All Passwords Here with Highest Security 💪 . no one Can see The Passwords Without any Authentication ',
      image: {
        uri:
          'https://i.pcmag.com/imagery/articles/06ISuYPg8y57RzpRaiTe4E2-2.1617290462.fit_lim.jpg',
      },
      backgroundColor: '#766de7',
    },
   
  ];
  