import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import BuyTile from '../common/BuyTile';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Buy = () => {
  const [sellAds, setSellAds] = useState([]);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('Posts')
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
      if (
        documentSnapshot.data().email !== auth().currentUser.email &&
        documentSnapshot.data().Status === 'Active'
      )
        temp.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data(),
        });
    });
    console.log('temp', temp);
    // temp.sort((a, b) => {
    //   const nameA = a.data.name.toUpperCase();
    //   const nameB = b.data.name.toUpperCase();
    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // setSortBy('Name');
    // setItems(temp);
    // setItemsCopy(temp);
    // setAllItems(temp);
    //   });
    setSellAds(temp);
  };
  return (
    <View style={{marginBottom: 60}}>
      <Header />
      {/* <Text>Buy</Text> */}
      <FlatList
        data={sellAds}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <View>
              <BuyTile propsData={item} />
              {/* <Text className="text-black">{index + 1}</Text> */}
            </View>
          );
        }}
      />
      {/* <BuyTile /> */}
    </View>
  );
};

export default Buy;
