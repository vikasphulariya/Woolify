/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EmailValidator from 'aj-email-validator';
import Snackbar from 'react-native-snackbar';
import {TextInput} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const SignUp = ({navigation}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [Pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [Sheeps, setSheeps] = useState('');
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
    // setValid(true);
    if (name.length <= 2) {
      // setValidName('Enter Full Name');
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
    }
    if (EmailValidator(Email) === false) {
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
    }
    if (validC) {
      // createAccount();
      setmodalVisible(true);
    }
  };

  const ValidateInfo = () => {
    let c = true;
    if (Phone.length < 10) {
      Snackbar.show({
        text: 'Please Enter Valid Phone Number',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      c = false;
      // return;
    } else if (state.length < 3) {
      Snackbar.show({
        text: 'Please Enter Valid State Name',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      c = false;
    } else if (Pincode.length !== 6) {
      Snackbar.show({
        text: 'Please Enter Valid Pincode',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      c = false;
    } else if (address.length < 5) {
      Snackbar.show({
        text: 'Please Enter Valid Address',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      c = false;
    } else if (Sheeps.length === 0) {
      Snackbar.show({
        text: 'Please Enter No of Sheeps',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('Login');
          },
        },
      });
      c = false;
    }
    if (c) {
      console.log('Everything Working');
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
            auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                console.log('mail sent Succes');
                Snackbar.show({
                  text: 'Setting User Profile',
                  duration: Snackbar.LENGTH_SHORT,
                  action: {
                    text: 'OK',
                    textColor: 'green',
                    onPress: () => {
                      navigation.replace('login');
                    },
                  },
                });
                firestore()
                  .collection('Users')
                  .doc(auth().currentUser.email)
                  .set({
                    Phone: Phone,
                    State: state,
                    Pincode: Pincode,
                    Address: address,
                    Sheeps: Sheeps,
                  })
                  .then(() => {
                    Snackbar.show({
                      text: 'Verification Mail Sent',
                      duration: Snackbar.LENGTH_SHORT,
                      action: {
                        text: 'Login',
                        textColor: 'green',
                        onPress: () => {
                          navigation.replace('login');
                        },
                      },
                    });
                  });
              });
          });
        // });
        // console.log('user info added');
      })
      .catch(error => {
        // console.log(auth().currentUser);
        // setmodalVisible(false);
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
              allowFontScaling
              inputMode="email"
              textContentType="emailAddress"
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
              textContentType="password"
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
                // setmodalVisible(true);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setmodalVisible(false)}
          style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View
                style={{
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  alignContent: 'center',
                }}>
                {/* <Text>1</Text> */}
                <Text
                  style={{alignSelf: 'center'}}
                  className="text-black text-2xl font-bold">
                  Fill additional Information
                </Text>
              </View>
              <Animated.View
                entering={FadeInUp.duration(1000).springify()}
                className="bg-black/5 p-1 pl-3  my-2 rounded-2xl w-full">
                <TextInput
                  className="text-black text-xl"
                  placeholder="Phone Number"
                  // secureTextEntry
                  keyboardType="numeric"
                  placeholderTextColor={'gray'}
                  onChangeText={e => {
                    setPhone(e);
                  }}
                  value={Phone}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInUp.delay(100).duration(1000).springify()}
                className="bg-black/5 p-1 pl-3 my-2 rounded-2xl w-full">
                <TextInput
                  className="text-black text-xl"
                  placeholder="State"
                  // secureTextEntry

                  placeholderTextColor={'gray'}
                  onChangeText={e => {
                    setState(e);
                  }}
                  value={state}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInUp.delay(200).duration(1000).springify()}
                className="bg-black/5 p-1 pl-3 my-2 rounded-2xl w-full">
                <TextInput
                  className="text-black text-xl"
                  placeholder="Pincode"
                  keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  onChangeText={e => {
                    setPincode(e);
                  }}
                  value={Pincode}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInUp.delay(300).duration(1000).springify()}
                className="bg-black/5 p-1 pl-3 my-2 rounded-2xl w-full">
                <TextInput
                  className="text-black text-xl"
                  placeholder="Address"
                  // keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  onChangeText={e => {
                    setAddress(e);
                  }}
                  value={address}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInUp.delay(400).duration(1000).springify()}
                className="bg-black/5 p-1 pl-3 my-2 rounded-2xl w-full">
                <TextInput
                  className="text-black text-xl"
                  placeholder="No of Sheeps"
                  keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  onChangeText={e => {
                    setSheeps(e);
                  }}
                  value={Sheeps}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInUp.delay(500).duration(1000).springify()}
                className="w-full"
                style={{elevation: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('d');
                    // setmodalVisible(true);
                    // valditor();
                    ValidateInfo();
                  }}
                  style={{}}
                  className="bg-sky-400  p-2 w-full rounded-2xl my-3">
                  <Text className="font-bold text-white text-center text-3xl">
                    Submit
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    // backgroundColor: 'red',
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
});
export default SignUp;
