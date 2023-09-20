import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ScrollViewBase,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EmailValidator from 'aj-email-validator';
import Snackbar from 'react-native-snackbar';
import {TextInput} from 'react-native';
import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';

import messaging from '@react-native-firebase/messaging';
const Login = ({navigation}) => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ValidEmail, setValidEmail] = useState('');
  const [ValidPassword, setValidPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log('Auth running');
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
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

  useEffect(() => {
    console.log('useEffect running');
    if (auth().currentUser !== null) {
      if (auth().currentUser.emailVerified) {
        // firestore().collection('Users').doc(auth().currentUser.email).update({

        navigation.replace('DashBoard');
      }
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const valditor = () => {
    let validC = true;
    if (EmailValidator(Email) === true) {
      setValidEmail('');
    } else {
      setValidEmail('Enter a valid email');
      validC = false;
    }
    if (Password.length === 0) {
      validC = false;
    }
    if (validC) {
      loginAccount();
    } else {
      Snackbar.show({
        text: 'Invalid Input',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
    }
  };

  const loginAccount = () => {
    Snackbar.show({
      text: 'Loging In',
      duration: 700,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => {
          // navigation.replace('Login');
        },
      },
    });

    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(result => {
        console.log(result);
        if (auth().currentUser.emailVerified) {
          navigation.replace('DashBoard');
          // Snackbar.show({
          //   text: 'Login Success',
          //   duration: Snackbar.LENGTH_SHORT,
          //   action: {
          //     text: 'ok',
          //     textColor: 'green',
          //     onPress: () => {
          //       // setPassword('');
          //     },
          //   },
          // });
        } else {
          Snackbar.show({
            text: 'Email Verification Pending',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Resend',
              textColor: 'green',
              onPress: () => {
                auth()
                  .currentUser.sendEmailVerification()
                  .then(() => {
                    auth().signOut();
                  });
              },
            },
          });
        }
      })
      .catch(err => {
        if (
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/invalid-login'
        ) {
          Snackbar.show({
            text: 'Wrong password',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                setPassword('');
              },
            },
          });
        } else if (err.code === 'auth/user-not-found') {
          Snackbar.show({
            text: 'No Account Found',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Sign Up',
              textColor: 'green',
              onPress: () => {
                navigation.replace('SignUp');
              },
            },
          });
        } else if (err.code === 'auth/network-request-failed') {
          Snackbar.show({
            text: 'Network Problem',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                valditor();
              },
            },
          });
        } else {
          Snackbar.show({
            text: 'Something Went Wrong ',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'Retry',
              textColor: 'green',
              onPress: () => {
                valditor();
              },
            },
          });
        }
        console.log(err.code);
      });
  };
  return (
    <View className="bg-white flex-1 h-full w-full">
      <StatusBar barStyle={'light-content'} />

      <Image
        className="absolute h-full "
        style={{width: '100%', height: undefined, aspectRatio: 1080 / 1920}}
        source={require('./img/background.png')}
      />

      <View className="flex-row justify-around h-full w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[225] w-[90]"
          source={require('./img/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[168] w-[65]"
          source={require('./img/light.png')}
        />
      </View>

      {/* title and form */}
      <View
        // contentContainerStyle={{marginTop: 100}}
        className="h-full w-full flex  pt-40">
        {/* title */}
        <View className="flex items-center" style={{marginTop: 69}}>
          <Animated.Text
            onPress={() => {
              console.log("Ea")
              // requestUserPermission();
              requestNotificationPermission()
            }}
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl">
            Login
          </Animated.Text>
        </View>
        {/* form */}
        <ScrollView className="flex  mx-5 space-y-4 mt-24">
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="bg-black/5 p-1 pl-3 rounded-2xl w-full">
            <TextInput
              className="text-black text-xl"
              placeholder="Email"
              inputMode="email"
              textContentType="emailAddress"
              placeholderTextColor={'gray'}
              value={Email}
              onChangeText={e => {
                setEmail(e);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="bg-black/5 p-1 pl-3 rounded-2xl w-full">
            <TextInput
              className="text-black text-xl"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
              placeholderTextColor={'gray'}
              value={Password}
              onChangeText={e => {
                setPassword(e);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="w-full">
            <TouchableOpacity
              onPress={e => {
                valditor();
              }}
              className="bg-sky-400  w-full rounded-2xl mb-3">
              <Text className="font-bold text-white text-center p-[5] text-3xl">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center">
            <Text className="text-black text-xl">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Signup')}>
              <Text className="text-sky-600 text-xl mb-3">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;
