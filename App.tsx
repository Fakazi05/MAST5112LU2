import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TextInput, Image ,  View, ScrollView , SafeAreaView } from 'react-native';
import { useRef} from 'react';
import { Animated } from 'react-native';
import { RadioButton } from 'react-native-paper'; 



const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

function MainScreen({ navigation  }: {navigation: any}) 
{
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error,setError] = useState('');
  

  console.log("App starting up");
  return (
    //<NavigationContainer>

    <View >
      <SafeAreaView>
      <ScrollView>
      <View style={styles.mainPicture}>
      <Image style={styles.ImageSize}
      source={require('./img/mast5112.png')}/>
      </View>
      
     
      <Text style={styles.welcomeText} >Welcome your React App!</Text>
      <FadeInView>
        <Text style = {styles.red}>
           {Error}
        </Text>
      <View style={styles.InputFlex}>
      <Text style={styles.HeadingText} >Enter Name</Text>
      <TextInput style={styles.InputBoxs}  
                  placeholder="First Name"
                  onChangeText={newText => setName(newText)}/>
      </View>
      <View style={styles.InputFlex}>
      <Text style={styles.HeadingText} >Enter Surname</Text>
      <TextInput style={styles.InputBoxs}  
                  placeholder="Surname"
                  onChangeText={newText => setSurname(newText)}
      />
      </View>
      <Button title="Add User"
           onPress={() => {

            if ((isEmpty(Name)==false) && (isEmpty(Surname)==false))
            {
              navigation.navigate('ViewDetails', {
              NameSend : Name,
              SurnameSend : Surname});
            console.log(" Name: " + Name + 
                       " Surname: " + Surname + " " );
              setError("");
            }
            else
            {
              setError("Please add all the fields");
            }
           }}/> 
           </FadeInView>
           </ScrollView>
           </SafeAreaView>    
      
    </View>
   //</NavigationContainer>
  );
}
function isEmpty (value: string | null){
  return(
    //null or undefined
    (value == null)||

    //has length and it's zero
    (value.hasOwnProperty('length') && value.length === 0) ||

    //is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

function ViewDetails({ route }: { route: any }) {
  const NameGet = route.params.NameSend;
  const SurnameGet = route.params.SurnameSend;
  const [selectedValue, setSelectedValue] = useState('0'); 
  const [ImageBlock, setImage] = useState(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Welcome {NameGet} {SurnameGet}</Text>
        <Text> Please select what is your favorite Programming language: </Text>
      </View>

      <View style={styles.RadioContainer}> 
        <View style={styles.radioGroup}> 
          <View style={styles.radioButton}> 
            <RadioButton.Android 
              value="1"
              status={selectedValue == '1' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('1')} 
              color="#007BFF"
            /> 
            <Text style={styles.radioLabel}>React Native</Text> 
          </View> 

          <View style={styles.radioButton}> 
            <RadioButton.Android 
              value="2"
              status={selectedValue == '2' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('2')} 
              color="#007BFF"
            /> 
            <Text style={styles.radioLabel}>Kotlin</Text> 
          </View> 

          <View style={styles.radioButton}> 
            <RadioButton.Android 
              value="3"
              status={selectedValue == '3' ? 'checked' : 'unchecked'} 
              onPress={() => setSelectedValue('3')} 
              color="#007BFF"
            /> 
            <Text style={styles.radioLabel}>HTML and CSS</Text> 
          </View> 
        </View> 
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 40, textAlign: 'center' }}>
          View what your favorite programming language says about you:
        </Text>
        <Button 
          title="Process"
          onPress={() => {
            switch (selectedValue) {
              case "1":
                setImage(require('./img/react.png'));
                break;
              case "2":
                setImage(require('./img/kotlin.jpg'));
                break;
              case "3":
                setImage(require('./img/html.png'));
                break;
              default:
                setImage(null);
            }
          }}
        />
        <View style={styles.container}>
          {ImageBlock ? <Image source={ImageBlock} style={styles.ViewImage} /> : null}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  
  welcomeText: {
    paddingTop: 40,
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewImage: {
    width: 350,
    height: 350,
  },
  RadioContainer: { 
    flex: 0, 
    backgroundColor: '#F5F5F5', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  radioGroup: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginTop: 20, 
    borderRadius: 8, 
    backgroundColor: 'white', 
    padding: 16, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { 
        width: 0, 
        height: 2, 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
  }, 
  radioButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  radioLabel: { 
    marginLeft: 8, 
    fontSize: 16, 
    color: '#333', 
},
  mainPicture:{
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
ImageSize:{
    width: 350,
    height: 350
  },
  InputFlex:{
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-evenly",
  },
  InputBoxs:{
    //Your style properties here
    color:"orange",
  },
  HeadingText:{
    //your style properties here
    color:"orange",
    fontWeight:"bold"
  },
  red:{
    color: 'red',
    fontWeight: 'bold',
    fontSize:26,
    textAlign:'center'
  } 
});
//From http://reactnative.dev/docs/animation
type FadeInViewProps = {
  children: ReactNode;
  style?: ViewStyle;
};
const FadeInView = ({ children, style }: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}