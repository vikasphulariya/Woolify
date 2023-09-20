import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInUp,
  BounceInDown,
  FadeInRight,
} from 'react-native-reanimated';
const Sell = () => {
  const focused = useIsFocused();
  const [Type, setType] = useState('');
  const [Number, setNumber] = useState('');
  const [Quntity, setQuntity] = useState(0);
  const [Total, setTotal] = useState(0);
  const [userData, setUserData] = useState();
  useEffect(() => {
    console.log(focused);
    firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .get()
      .then(data => {
        console.log(data._data);
        setUserData(data._data);
        setNumber(data._data.Phone);
      });

    // messaging()
    //   .getToken()
    //   .then(e => {
    //     console.log(e);
    //   });
  }, []);

  const ValidateInfo = () => {
    let c = true;
    if (Number.length < 10) {
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
    } else if (Quntity === 0 || Quntity === '') {
      Snackbar.show({
        text: 'Please Enter Quantity',
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
    } else if (Total === 0 || Total === '') {
      Snackbar.show({
        text: 'Please Enter  Amount',
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
    } else if (Type.length < 3) {
      Snackbar.show({
        text: 'Please Enter Wool Type',
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
      console.log('Everything Working', Total);
      Snackbar.show({
        text: 'Creating Post',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'Ok',
          textColor: 'green',
          onPress: () => {
            // navigation.replace('login');
          },
        },
      });
      createSellPost();
    }
  };
  const sendNotification = () => {
    var data = JSON.stringify({
      data: {
        body: `${auth().currentUser.displayName} add a sell Request`,
        title: 'New sell Added',
        by: auth().currentUser.email,
      },
      // to: 'foBoldX0TR-soxJYTU-J5O:APA91bES9B_Yo-bVWZyBudiAmnudjE-JJNHl35asK_kz_bW1PXHOE6xaneQ1cVIuhEK6Ydn0wLeym2pozL-mXTssdCdURDPIONsFU4wJW21OmN5fR290zWQ0Yra5KevVFgm1RyZ96d9n',
      to: '/topics/Sell',
    });
    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAwxxWldw:APA91bGWWQoBQl3hZJvNRW9TAIAI2ZKKa-OtSYK6AHmWUT2oBfihVj9ZigtKV7869lt8EpUrmElsLS5S-VS8ga7_ug7ZzdzHlocTyFHn043Q7670-ZN6DRwZ7y6xGVtbCurou3nioBJJ',
        'Content-Type': 'application/json',
      },
      data: data,
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createSellPost = () => {
    console.log('nnn');
    firestore()
      .collection('Posts')
      .add({
        email: auth().currentUser.email,
        Seller: auth().currentUser.displayName,
        State: userData.State,
        Pincode: userData.Pincode,
        WoolType: Type,
        Quantity: Quntity,
        Amount: Total,
        Phone: Number,
        Address: userData.Address,
        Status: 'Active',
      })
      .then(() => {
        sendNotification();
        setNumber('');
        setQuntity('');
        setTotal('');
        setType('');
        Snackbar.show({
          text: 'Post Created Successfully',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'ok',
            textColor: 'green',
            onPress: () => {},
          },
        });
      });
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 3}}>
      <Header />
      {focused ? (
        <View>
          <Animated.Text
            entering={FadeInRight.duration(200)}
            className="text-2xl text-black text-center mb-5 font-bold">
            New Sell Post
          </Animated.Text>
          <Animated.View entering={FadeInRight.delay(50).duration(200)}>
            <TextInput
              className="rounded-xl bg-black/10 mb-3 mx-4 px-3 text-xl text-black"
              placeholder="Wool Type"
              placeholderTextColor={'gray'}
              value={Type}
              onChangeText={e => {
                setType(e);
              }}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(100).duration(200)}>
            <TextInput
              className="rounded-xl bg-black/10 mb-3 mx-4 px-3 text-xl text-black"
              placeholder="Quntity"
              placeholderTextColor={'gray'}
              inputMode="numeric"
              value={Quntity}
              onChangeText={e => {
                setQuntity(e);
              }}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(150).duration(200)}>
            <TextInput
              className="rounded-xl bg-black/10 mb-3 mx-4 px-3 text-xl text-black"
              placeholder="Amount"
              inputMode="numeric"
              placeholderTextColor={'gray'}
              value={Total}
              onChangeText={e => {
                setTotal(e);
              }}
            />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200).duration(200)}>
            <TextInput
              style={{}}
              className="rounded-xl bg-black/10 mb-3 mx-4 px-3 text-xl text-black"
              placeholder="Contact Number"
              inputMode="numeric"
              value={Number}
              onChangeText={e => {
                setNumber(e);
              }}
              placeholderTextColor={'gray'}
            />
          </Animated.View>
        </View>
      ) : null}
      {focused ? (
        <Animated.View
          entering={FadeInDown.duration(100).springify()}
          className="absolute bottom-10 self-center">
          <TouchableOpacity
            onPress={() => {
              ValidateInfo();
            }}
            style={{borderWidth: 0.5, borderColor: '#c0c0c0'}}
            className="bg-sky-400 rounded-2xl p-3 px-10   ">
            <Text className="text-black text-2xl font-extrabold ">Sell</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Sell;
