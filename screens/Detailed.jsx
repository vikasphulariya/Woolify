import {View, Text, Linking} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
// import Header from '../common/Header';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import HeaderWb from './common/HeaderWb';
const Detailed = ({route}) => {
  console.log(route.params.Id);
  const temp = route.params.Detailed;
  const sendNotification = () => {
    var data = JSON.stringify({
      data: {
        body: `${auth().currentUser.displayName}  Bought your Wool`,
        title: 'Sell Update',
        by: auth().currentUser.email,
        to: route.params.Detailed.email,
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
  return (
    <View className="flex-1 my-4 px-4">
      <HeaderWb title={'Detailed Info'} />
      <View className="mt-3">
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Seller : {route.params.Detailed.Seller}
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Quantity : {route.params.Detailed.Quantity} Kg
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Total Amount : {route.params.Detailed.Amount}
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Phone : {route.params.Detailed.Phone}
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Address : {route.params.Detailed.Address}
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          Pincode : {route.params.Detailed.Pincode}
        </Text>
        <Text className="bg-white rounded-lg text-black px-3 text-lg py-[2] my-1">
          State : {route.params.Detailed.State}
        </Text>
        {route.params.Detailed.Status !== 'Active' &&
        route.params.Detailed.email !== auth().currentUser.email ? (
          <Text className="bg-white rounded-lg text-red-700 px-3 text-lg py-[2] my-1">
            Status : {route.params.Detailed.Activity}
          </Text>
        ) : null}
      </View>
      {route.params.Detailed.email === auth().currentUser.email ? null : (
        <View className="flex-row mt-3 justify-around">
          <TouchableOpacity className="bg-sky-400 px-3 py-[3]  rounded-full">
            <Text
              onPress={() =>
                Linking.openURL(`tel:${route.params.Detailed.Phone}`)
              }
              className="text-lg text-white font-semibold ">
              Call Seller
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const whatsappURL = `whatsapp://send?phone=91${route.params.Detailed.Phone}`;
              Linking.openURL(whatsappURL);
            }}
            className="bg-green-500 px-3 py-[3]  rounded-full">
            <Text className="text-lg text-white font-semibold">Whatsapp </Text>
          </TouchableOpacity>
        </View>
      )}
      {route.params.Detailed.Status === 'Active' &&
      route.params.Detailed.email !== auth().currentUser.email ? (
        <TouchableOpacity
          onPress={() => {
            const whatsappURL = `whatsapp://send?phone=91${route.params.Detailed.Phone}`;
            // Linking.openURL(whatsappURL);
            firestore()
              .collection('Posts')
              .doc(route.params.Id)
              .update({
                Status: 'Bought',
                Activity: 'Proccesing',
                BuyerEmail: auth().currentUser.email,
                Buyer: auth().currentUser.displayName,
              })
              .then(() => {
                sendNotification();
              });
          }}
          className="bg-[#b68c80] px-3 py-[3]  rounded-full self-center my-6">
          <Text className="text-2xl text-white font-extrabold text-center self-center">
            Buy
          </Text>
        </TouchableOpacity>
      ) : null}

      {route.params.Detailed.Status !== 'Active' &&
      route.params.Detailed.email === auth().currentUser.email ? (
        <TouchableOpacity className="bg-[#c97030dc] px-3 py-[3]  rounded-full self-center mt-5">
          <Text
            onPress={() =>
              // Linking.openURL(`tel:${route.params.Detailed.Phone}`)
              Snackbar.show({
                text: 'Coming Soon',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                  text: 'OK',
                  textColor: 'green',
                  onPress: () => {
                    // navigation.replace('Login');
                  },
                },
              })
            }
            className="text-lg text-white font-semibold ">
            Buyer Details
          </Text>
        </TouchableOpacity>
      ) : null}
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Detailed;
