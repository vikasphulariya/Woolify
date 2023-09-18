import {View, Text} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const Header = () => {
  return (
    <View className="flex-row justify-between p-3">
      <Text
        className="text-black text-2xl font-extrabold"
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('VS');
            }
            .catch(() => {
              console.log('FWef');
            });
        }}>
        Woolify
      </Text>
      <Feather name="menu" color={'black'} size={30} />
    </View>
  );
};

export default Header;
