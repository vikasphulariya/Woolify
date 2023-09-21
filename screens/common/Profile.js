/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import
import {useIsFocused} from '@react-navigation/native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInUp,
  BounceInDown,
  FadeInRight,
} from 'react-native-reanimated';
const Profile = ({navigation}) => {
  const focused = useIsFocused();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // console.log(focused);
    firestore()
      .collection('Users')
      .doc(auth().currentUser.email)
      .onSnapshot(data => {
        setUserData(data._data);
        console.log(data);
      }, console.log('vdv'));
    //   .then(data => {
    //     console.log(data._data);
    //     setUserData(data._data);
    //     // setNumber(data._data.Phone);
    //   });
  }, []);
  return (
    <View className="flex-1">
      <Text className="text-black text-3xl self-center my-3 mt-5">
        {auth().currentUser.displayName}'s Profile
      </Text>
      {focused ? (
        <View>
          <Animated.View
            entering={FadeInRight.duration(200)}
            className="mx-4 my-2">
            <Text className="text-black px-1 text-base">Email</Text>
            <Text className=" bg-white  p-2 text-black font-semibold rounded-lg px-3 text-lg">
              {auth().currentUser.email}
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(100).duration(200)}
            className="mx-4 my-2">
            <Text className="text-black px-1 text-base">Phone Number</Text>
            <Text className=" bg-white  p-2 text-black font-semibold rounded-lg px-3 text-lg">
              {userData.Phone}
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(100).duration(200)}
            className="mx-4 my-2">
            <Text className="text-black px-1 text-base">State</Text>
            <Text className=" bg-white  p-2 text-black font-semibold rounded-lg px-3 text-lg">
              {userData.State}
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(100).duration(200)}
            className="mx-4 my-2">
            <Text className="text-black px-1 text-base">Address</Text>
            <Text className=" bg-white  p-2 text-black font-semibold rounded-lg px-3 text-lg">
              {userData.Address}
            </Text>
          </Animated.View>
        </View>
      ) : null}
      {focused ? (
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            className="bg-sky-400 self-center m-3 w-full rounded-xl "
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  console.log('VS');
                  navigation.replace('login');
                })
                .catch(() => {
                  // navigation.replace('login');
                  console.log('FWef');
                });
            }}>
            <Text className="text-white text-center text-2xl p-2 font-extrabold">
              Logout
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Profile;
