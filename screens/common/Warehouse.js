import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import HeaderWb from './HeaderWb';
import WareProgress from './WareProgress';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
const Warehouse = () => {
  const focused = useIsFocused();
  const [wareData, setWareData] = useState([]);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('WareHouse')
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
    querySnapshot.forEach(documentSnapshot => {
      temp.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });
    // console.log('temp', temp);
    setWareData(temp);
  };
  return (
    <View className="px-3 mt-7">
      <HeaderWb title={'WareHouse Capacity'} />
      {/* <Text>Warehouse</Text> */}
      <FlatList
        data={wareData}
        renderItem={({item, index}) => {
          return (
            <View>
              <WareProgress data={item} />
              {/* <WareProgress data={item} /> */}
            </View>
          );
        }}
      />
      {/* <WareProgress /> */}
    </View>
  );
};

export default Warehouse;
