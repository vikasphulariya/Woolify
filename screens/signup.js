/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EmailValidator from 'aj-email-validator';
import Snackbar from 'react-native-snackbar';
import {TextInput} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Validname, setValidName] = useState('');
  const [ValidEmail, setValidEmail] = useState('');
  const [ValidPassword, setValidPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log('Auth running');
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    console.log('useEffect running');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const valditor = () => {
    let validC = true;
    setValid(true);
    if (name.length <= 2) {
      setValidName('Enter Full Name');
      Snackbar.show({
        text: 'Please Enter a Valid Name',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      validC = false;
      return;
    } else {
      setValidName('');
    }
    if (EmailValidator(Email) === true) {
      setValidEmail('');
    } else {
      Snackbar.show({
        text: 'Please Enter Valid Mail',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      validC = false;
      return;
    }
    if (Password.length <= 5) {
      setValidPassword('Password must be at least 6 characters');
      Snackbar.show({
        text: 'Password must be at least 6 characters',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      validC = false;
    } else {
      setValidPassword('');
    }
    if (validC) {
      createAccount();
    }
  };

  const createAccount = async () => {
    // setModalVisible(true);
    Snackbar.show({
      text: 'Creating Account',
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'Ok',
        textColor: 'green',
        onPress: () => {
          // navigation.replace('Login');
        },
      },
    });
    await auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then(() => {
        console.log('adding user info');

        // .then(() => {
        auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log('profile updated');
            // console.log("");
            // setModalVisible(false);
            Snackbar.show({
              text: 'Verification Mail Sent',
              duration: Snackbar.LENGTH_SHORT,
              action: {
                text: 'Login',
                textColor: 'green',
                onPress: () => {
                  navigation.replace('Login');
                },
              },
            });
            auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                console.log('mail sent Succes');

                auth()
                  .signOut()
                  .then(() => {
                    console.log('m');
                    firestore()
                      .collection('Users')
                      .doc(Email)
                      .set({
                        cart: [],
                        wishlist: [],
                        tokens: [],
                      })
                      .then(() => console.log('info added'));
                  });
              });
          });
        // });
        // console.log('user info added');
      })
      .catch(error => {
        // console.log(auth().currentUser);
        setModalVisible(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Snackbar.show({
            text: 'Account already in use',
            duration: Snackbar.LENGTH_SHORT,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => {
                setEmail('');
              },
            },
          });
        } else if (error.code === 'auth/network-request-failed') {
          console.error(error);
          Snackbar.show({
            text: 'No Network',
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
          console.error(error);
          Snackbar.show({
            text: 'Something went wrong',
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
          className="h-[220] w-[85]"
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
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl">
            New User
          </Animated.Text>
        </View>
        {/* form */}
        <ScrollView className="flex  mx-5 space-y-4 mt-24">
          <Animated.View
            entering={FadeInUp.duration(1000).springify()}
            className="bg-black/5 p-1 pl-3 rounded-2xl w-full">
            <TextInput
              className="text-black text-xl"
              //  className="text-black text-xl"
              placeholder="Name"
              // secureTextEntry
              placeholderTextColor={'gray'}
              value={name}
              onChangeText={e => {
                setName(e);
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="bg-black/5 p-1 pl-3 rounded-2xl w-full">
            <TextInput
              className="text-black text-xl"
              placeholder="Email"
              placeholderTextColor={'gray'}
              onChangeText={e => {
                setEmail(e);
              }}
              value={Email}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="bg-black/5 p-1 pl-3 rounded-2xl w-full">
            <TextInput
              className="text-black text-xl"
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={'gray'}
              onChangeText={e => {
                setPassword(e);
              }}
              value={Password}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="w-full"
            style={{elevation: 10}}>
            <TouchableOpacity
              onPress={() => {
                console.log('d');
                valditor();
              }}
              style={{elevation: 3}}
              className="bg-sky-400  p-2 w-full rounded-2xl mb-3">
              <Text className="font-bold text-white text-center text-3xl">
                Create Account
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center">
            <Text className="text-black text-xl">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('login')}>
              <Text className="text-sky-600 text-xl mb-3">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;
