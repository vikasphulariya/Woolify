import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWb from './HeaderWb';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
const ManageOder = ({route}) => {
  console.log(route.params.Detailed.data.BuyerEmail);
  const [Activity, setActivity] = useState(route.params.Detailed.data.Activity);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('Posts')
      .doc(route.params.Detailed.id)
      .onSnapshot(onResult, onError);
    return () => unsubscribe();
    // getItem();
  }, []);
  function onResult(querySnapshot) {
    console.log('Got Users collection result.');
    // saveToDevice(querySnapshot);
    getItem(querySnapshot);
  }

  function onError(error) {
    console.error('ss', error);
  }

  const getItem = async querySnapshot => {
    let temp = [];
    console.log(querySnapshot._data.Activity);
    // console.log('temp', temp);
    // setSellAds(temp);
  };
  console.log(route.params.Detailed.id);
  const sendNotification = k => {
    var data = JSON.stringify({
      data: {
        body: `${auth().currentUser.displayName}  ${k} your Wool`,
        title: 'Sell Update',
        by: auth().currentUser.email,
        for: route.params.Detailed.data.BuyerEmail,
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
        setActivity(k);
        // nab.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View className="pt-5 flex-1">
      <HeaderWb title={'Manage Your Order'} />
      <Text className="text-black px-3 text-lg self-center">
        Current Status: {Activity}
      </Text>
      <View className="align-middle">
        {Activity === 'Proccesing' ? (
          <TouchableOpacity
            onPress={() => {
              // const whatsappURL = `whatsapp://send?phone=91${route.params.Detailed.Phone}`;
              // Linking.openURL(whatsappURL);
              firestore()
                .collection('Posts')
                .doc(route.params.Detailed.id)
                .update({
                  Status: 'Bought',
                  Activity: 'Dispatched',
                })
                .then(() => {
                  sendNotification('Dispatched');
                });
            }}
            className="bg-blue-700 mt-14  mx-5 p-3 rounded-2xl">
            <Text className="text-xl text-white font-extrabold self-center">
              {' '}
              Dispatch Order
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="align-middle">
        {Activity === 'Dispatched' ? (
          <TouchableOpacity
            onPress={() => {
              // const whatsappURL = `whatsapp://send?phone=91${route.params.Detailed.Phone}`;
              // Linking.openURL(whatsappURL);
              firestore()
                .collection('Posts')
                .doc(route.params.Detailed.id)
                .update({
                  Status: 'Bought',
                  Activity: 'Delivered',
                })
                .then(() => {
                  sendNotification('Deliverd');
                });
            }}
            className="bg-blue-700 mt-14  mx-5 p-3 rounded-2xl">
            <Text className="text-xl text-white font-extrabold self-center">
              {' '}
              Mark Deliverd
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="absolute bottom-10 self-center ">
        {Activity === 'Cancled' || Activity === 'Delivered' ? null : (
          <TouchableOpacity
            onPress={() => {
              // const whatsappURL = `whatsapp://send?phone=91${route.params.Detailed.Phone}`;
              // Linking.openURL(whatsappURL);
              firestore()
                .collection('Posts')
                .doc(route.params.Detailed.id)
                .update({
                  Status: 'Bought',
                  Activity: 'Canceld',
                })
                .then(() => {
                  sendNotification('Delivered');
                });
            }}
            className="bg-red-800 p-3 rounded-2xl">
            <Text className="text-lg text-white font-extrabold">Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ManageOder;
