import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const HeaderWb = ({title}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View className="flex-row justify-between mx-4 mb-4">
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          className="text-black text-2xl">
          ⩤
        </Text>
        <Text className="text-black text-center text-2xl ">{title}</Text>
        <Text className="text-black text-2xl">{``}</Text>
      </View>
    </View>
  );
};

export default HeaderWb;
