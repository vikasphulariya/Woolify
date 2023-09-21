/* eslint-disable react/no-unstable-nested-components */
// In BottomNavigator.js in a new project
import {PermissionsAndroid} from 'react-native';

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Learn from './BottomTabs/Learn';
import Feather from 'react-native-vector-icons/Feather';
// import Profile from './HomeLogin.js/Profile';
import Testing from './BottomTabs/testing';
import Home from './BottomTabs/Home';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
import Buy from './BottomTabs/Buy';
import Sell from './BottomTabs/Sell';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Price from './BottomTabs/Price';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function BottomNavigator() {
  const [items, setItems] = useState(0);

  //   const setToken = async () => {
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //     );
  //     console.log('Use effect');
  //     await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();
  //     firestore()
  //       .collection('Users')
  //       .doc(auth().currentUser.email)
  //       .update({token: token});
  //   };
  //   function onResult(querySnapshot) {
  //     console.log('Got Users collection result.');
  //     // saveToDevice(querySnapshot);
  //     getItem(querySnapshot);
  //   }

  //   function onError(error) {
  //     console.error('ss', error);
  //   }

  const getItem = querySnapshot => {
    // querySnapshot.forEach;
    let k = querySnapshot._data.cart;
    let v = k.length;
    console.log(v);
    setItems(v);
  };

  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{tabBarLabelStyle: {fontSize: 12}}}
      initialRouteName="Price">
      <Tab.Screen
        name="Price"
        component={Price}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="trending-up" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Buy"
        component={Buy}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="bold" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarIcon: ({focused, color, size}) => (
            <Entypo name="publish" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Home}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="profile" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarIcon: ({focused, color, size}) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
          tabBarBadge: items,
          tabBarBadgeStyle: {backgroundColor: '#FE724C', color: 'white'},
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Paytm"
        component={Paytm}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
          //   tabBarBadge:3,
          //   tabBarBadgeStyle:{backgroundColor:'#FE724C',color:"white"}
        }}
      /> */}
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default BottomNavigator;
