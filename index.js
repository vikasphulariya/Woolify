/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
  if (remoteMessage.data.by !== auth().currentUser.email) {
    onDisplayNotification(remoteMessage);
  } else {
    console.log('User Not Valid');
    onDisplayNotification(remoteMessage);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
});

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
AppRegistry.registerComponent(appName, () => App);
