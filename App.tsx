// In App.js in a new project

import * as React from 'react';
import {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/login';
// import signup from './screens/signup';
import DrawerNavigator from './screens/DrawerNavigator';
import SignUp from './screens/signup';
import ManageOder from './screens/common/ManageOder';
// import BottomNavigator from './screens/BottomNagvigator';
const Stack = createNativeStackNavigator();
import Splash from './screens/splash';
// import Home from './screens/BottomTabs/Home';
import messaging from '@react-native-firebase/messaging';
import Detailed from './screens/Detailed';
import notifee from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import ManageYourOders from './screens/ManageYourOders';
import EditPost from './screens/EditPost';
import Warehouse from './screens/common/Warehouse';
function App() {
  useEffect(() => {
    requestNotificationPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if (
        remoteMessage.data.by !== auth().currentUser.email &&
        (remoteMessage.data.for === 'all' ||
          remoteMessage.data.for === auth().currentUser.email)
      ) {
        onDisplayNotification(remoteMessage);
      } else {
        console.log('you created the post');
      }
    });

    return unsubscribe;
  }, []);
  async function onDisplayNotification(noti) {
    console.log('BacckGround Notification');
    // Request permissions (required for iOS)
    //   await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: noti.data.title,
      body: noti.data.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  async function requestNotificationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message:
            'This app needs notification permission to send you updates.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  }

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
          name="Detailed"
          component={Detailed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashBoard"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageOrder"
          component={ManageOder}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage"
          component={ManageYourOders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Warehouse"
          component={Warehouse}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={EditPost}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}

export default App;
