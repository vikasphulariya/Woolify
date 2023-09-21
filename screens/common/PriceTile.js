import {View, Text} from 'react-native';
import React from 'react';

const PriceTile = ({data}) => {
  const k = data.data['Angora '];
  console.log(k[0]);
  return (
    <View className="px-3 my-1">
      <View className="bg-[#fff] rounded-2xl pb-3">
        <Text className="self-center font-extrabold text-black text-2xl mb-2 mt-1">
          {data.id}
        </Text>
        <View className="flex-row justify-around">
          <View>
            <Text className="bg-sky-400 px-2 rounded-xl text-center text-white font-bold text-lg">
              Type
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              Mongra
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              Angora
            </Text>
          </View>
          <View>
            <Text className=" px-2 rounded-xl text-white text-center  font-bold text-lg bg-orange-500">
              Previous
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              {data.data.MongraO[0]}/Kg
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              {k[0]}/Kg
            </Text>
          </View>
          <View>
            <Text className="bg-green-500 px-2 rounded-xl text-center  text-white font-bold text-lg">
              Latest
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              {data.data.MongraO[1]}/Kg
            </Text>
            <Text className=" px-2 mt-2 rounded-xl text-black font-bold text-lg">
              {data.data['Angora '][1]}/Kg
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PriceTile;
