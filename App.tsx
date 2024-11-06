import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TextInput, Image, View, ScrollView, SafeAreaView } from 'react-native';
import { useRef } from 'react';
import { Animated } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="ViewDetails" component={ViewDetails} />
        <Stack.Screen name="ListSkills" component={ListSkills} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }: { navigation: any }) {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error, setError] = useState('');

  console.log("App starting up");
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.mainPicture}>
            <Image style={styles.ImageSize} source={require('./img/mast5112.png')} />
          </View>
          <Text style={styles.welcomeText}>Welcome your React App!</Text>
          <FadeInView>
            <Text style={styles.red}>{Error}</Text>
            <View style={styles.InputFlex}>
              <Text style={styles.HeadingText}>Enter Name</Text>
              <TextInput style={styles.InputBoxs} placeholder="First Name" onChangeText={setName} />
            </View>
            <View style={styles.InputFlex}>
              <Text style={styles.HeadingText}>Enter Surname</Text>
              <TextInput style={styles.InputBoxs} placeholder="Surname" onChangeText={setSurname} />
            </View>
            <Button
              title="Add User"
              onPress={() => {
                if (!isEmpty(Name) && !isEmpty(Surname)) {
                  navigation.navigate('ViewDetails', { NameSend: Name, SurnameSend: Surname });
                  console.log("Name: " + Name + " Surname: " + Surname);
                  setError("");
                } else {
                  setError("Please add all the fields");
                }
              }}
            />
          </FadeInView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function isEmpty(value: string | null) {
  return !value || value.length === 0;
}

function ViewDetails({ route }: { route: any }) {
  const { NameSend, SurnameSend } = route.params;
  const [selectedValue, setSelectedValue] = useState('');
  const [txtSkills, setSkill] = useState('');
  const [Skills, setSkills] = useState<string[]>([]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Welcome {NameSend} {SurnameSend}</Text>
        <Text>Please select your favorite Programming language:</Text>
      </View>
      <View style={styles.RadioContainer}>
        <View style={styles.radioGroup}>
          <RadioButtonOption value="1" label="React Native" selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          <RadioButtonOption value="2" label="Kotlin" selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          <RadioButtonOption value="3" label="HTML and CSS" selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", paddingTop: 40, textAlign: 'center' }}>Add a skill:</Text>
        <TextInput style={styles.textInput} placeholder='Your skill' value={txtSkills} onChangeText={setSkill} />
        <Button
          title="Add Skill"
          onPress={() => {
            if (txtSkills) {
              setSkills([...Skills, txtSkills]);
              setSkill("");
            }
          }}
        />
        <View style={styles.skillContainer}>{renderSkills(Skills)}</View>
      </View>
    </View>
  );
}

function ListSkills() {
  const [Skills, setSkills] = useState<string[]>([]);
  const [txtSkills, setSkill] = useState('');

  return (
    <View style={styles.appContainer}>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.welcomeText}>List your skills!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Your skills'
              value={txtSkills}
              onChangeText={setSkill}
            />
            <Button
              title="Add Skill"
              onPress={() => {
                if (txtSkills) {
                  setSkills([...Skills, txtSkills]);
                  setSkill("");
                }
              }}
            />
          </View>
          <View style={styles.skillContainer}>{renderSkills(Skills)}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function renderSkills(Skills: string[]) {
  return Skills.map((skill, i) => (
    <Text key={i} style={styles.skillText}>{skill}</Text>
  ));
}

type RadioButtonOptionProps = {
  value: string;
  label: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

const RadioButtonOption = ({ value, label, selectedValue, setSelectedValue }: RadioButtonOptionProps) => (
  <View style={styles.radioButton}>
    <RadioButton.Android
      value={value}
      status={selectedValue === value ? 'checked' : 'unchecked'}
      onPress={() => setSelectedValue(value)}
      color="#007BFF"
    />
    <Text style={styles.radioLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  welcomeText: { paddingTop: 40, color: 'purple', fontWeight: 'bold', fontSize: 28, textAlign: 'center' },
  mainPicture: { paddingTop: 40, justifyContent: 'center', alignItems: 'center' },
  ImageSize: { width: 350, height: 350 },
  InputFlex: { flexDirection: "row", marginTop: 30, justifyContent: "space-evenly" },
  InputBoxs: { color: "orange" },
  HeadingText: { color: "orange", fontWeight: "bold" },
  red: { color: 'red', fontWeight: 'bold', fontSize: 26, textAlign: 'center' },
  RadioContainer: { flex: 0, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  radioGroup: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20, borderRadius: 8, backgroundColor: 'white', padding: 16, elevation: 4, shadowColor: '#000' },
  radioButton: { flexDirection: 'row', alignItems: 'center' },
  radioLabel: { marginLeft: 8, fontSize: 16, color: '#333' },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#cccccc' },
  textInput: { borderWidth: 1, borderColor: '#cccccc', width: '70%', margin: 8, padding: 8 },
  appContainer: { flex: 1, padding: 50, paddingHorizontal: 16 },
  skillContainer: { flex: 5 },
  skillText: { fontSize: 15, marginVertical: 5, borderBottomColor: '#000000', borderBottomWidth: 0.5 },
});

type FadeInViewProps = { children: ReactNode; style?: ViewStyle; };
const FadeInView = ({ children, style }: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 3000, useNativeDriver: false }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>
  );
};