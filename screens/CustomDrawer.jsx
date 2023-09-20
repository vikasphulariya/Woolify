/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const CustomDrawer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Text className="text-black text-center text-xl font-bold p-2 mt-4 rounded-2xl">
        Hi, {auth().currentUser.displayName}
      </Text>

      <TouchableOpacity
        className="bg-amber-400  self-center mx-3 w-full rounded-2xl"
        onPress={() => {}}>
        <Text className="text-white text-2xl text-center p-2 font-extrabold">
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-amber-400  self-center my-3 w-full rounded-2xl"
        onPress={() => {}}>
        <Text className="text-white text-2xl text-center p-2 font-extrabold">
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('cdd');
          navigation.navigate('Manage');
        }}
        className="bg-amber-400  self-center mb-3 w-full rounded-2xl">
        <Text className="text-white text-2xl text-center p-2 font-extrabold">
          My Sell Post's
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('cdd');
          navigation.navigate('Warehouse');
        }}
        className="bg-amber-400  self-center mb-3 w-full rounded-2xl">
        <Text className="text-white text-2xl text-center p-2 font-extrabold">
          Ware House
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{position: 'absolute', bottom: 0}}
        className="bg-sky-400 self-center m-3 w-full rounded-2xl "
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('VS');
              navigation.replace('login');
            })
            .catch(() => {
              navigation.replace('login');
              console.log('FWef');
            });
        }}>
        <Text className="text-white text-center text-2xl p-2 font-extrabold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;
