import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between p-3">
      <Text className="text-black text-2xl font-extrabold">Woolify</Text>
      <TouchableOpacity
        className="px-2"
        onPress={() => {
          navigation.toggleDrawer();
          // auth()
          //   .signOut()
          //   .then(() => {
          //     console.log('VS');
          //     navigation.replace('login');
          //   })
          //   .catch(() => {
          //     navigation.replace('login');
          //     console.log('FWef');
          //   });
        }}>
        <Feather name="menu" color={'black'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
