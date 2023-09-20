import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
const BuyTile = ({propsData}) => {
  const navigation = useNavigation();
  console.log(propsData);
  const temp = propsData.data;
  return (
    <View
      style={{backgroundColor: '#fff'}}
      className="mx-3 rounded-2xl my-1 px-3 py-1">
      <Text
        className={
          auth().currentUser.email === temp.email
            ? 'text-sky-600 text-lg font-bold'
            : 'text-black text-lg'
        }>
        Seller: {auth().currentUser.email === temp.email ? `You` : temp.Seller}
      </Text>
      <Text className="text-black text-lg">Wool Type: {temp.WoolType}</Text>
      <Text className="text-black text-lg">Quantity: {temp.Quantity} Kg</Text>
      <Text className="text-black text-lg">Price: ₹{temp.Amount} </Text>
      {temp.Status !== 'Active' && temp.email !== auth().currentUser.email ? (
        <Text className="text-red-700 text-lg">Status: {temp.Activity} </Text>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detailed', {
            Detailed: temp,
            Id: propsData.id,
          });
        }}
        style={{elevation: 2}}
        className="absolute bottom-2 bg-blue-300 right-2 rounded-xl px-2 py-[2]">
        <Text className="text-lg font-bold">Details</Text>
      </TouchableOpacity>
      {auth().currentUser.email === temp.email && temp.Status === 'Active' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Edit', {
              Detailed: propsData,
            });
          }}
          style={{}}
          className="absolute top-2 right-2 rounded-xl px-2 py-[2]">
          <Feather name="edit" size={28} color={'black'} />
        </TouchableOpacity>
      ) : null}
      {auth().currentUser.email === temp.email && temp.Status !== 'Active' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Edit', {
              Detailed: propsData,
            });
          }}
          style={{}}
          className="absolute top-2 right-2 rounded-xl px-2 py-[2]">
          <Feather name="eye" size={28} color={'black'} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default BuyTile;
