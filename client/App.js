import React from 'react';
import { LogBox, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import JoinScreen from './screens/JoinScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Person from './screens/Person';
import { Ionicons } from '@expo/vector-icons';


LogBox.ignoreLogs(['Warning: ...']);

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{
        title: 'Welcome', headerStyle: {
          backgroundColor: '#418a8e',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{
        title: 'Sign Up', headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false
      }} />

      <Stack.Screen name="JoinScreen" component={JoinScreen} options={({ navigation, route }) => (
        {
          title: 'Welcome', headerStyle: {
            backgroundColor: '#ff3b3a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Person", route.params)
              }}
            >
              <Ionicons style={{ marginRight: 15, marginTop: 7 }} name="person-circle-outline" size={28} color="white" />
            </TouchableOpacity>
          )

        }
      )} />

      <Stack.Screen name="Home" component={Home} options={(navigation, route) => (
        {
          title: "", headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }
      )} />
      <Stack.Screen name="Person" component={Person} options={{
        title: 'Information', headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }} />


    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}


