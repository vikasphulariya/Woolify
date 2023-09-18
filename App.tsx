// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
// import signup from './screens/signup';
import SignUp from './screens/signup';
import BottomNavigator from './screens/BottomNagvigator';
const Stack = createNativeStackNavigator();
import Splash from './screens/splash';
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashBoard"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
