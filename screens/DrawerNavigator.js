/* eslint-disable react/self-closing-comp */
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';
import Home from './BottomTabs/Home';
import BottomNavigator from './BottomNagvigator';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  useEffect(() => {
    messaging()
      .subscribeToTopic('Sell')
      .then(() => {
        console.log('Subscribed');
        // console.log(e);
      });
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{drawerPosition: 'right'}}
      //   drawerContent={() => {
      //     return (
      //       <View>
      //         <Text>Vikas</Text>
      //       </View>
      //     );
      //   }}
    >
      <Drawer.Screen
        name="Bottom"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
