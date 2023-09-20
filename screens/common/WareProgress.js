import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProgressBar from 'react-native-progress/Bar';
const WareProgress = ({data}) => {
  const [ratio, setRatio] = useState(0);
  console.log(data);
  useEffect(() => {
    setTimeout(() => {
      let ratiok = 0;
      const currentVal = parseFloat(data.data.current);
      const maxVal = parseFloat(data.data.max);
      ratiok = currentVal / maxVal;
      setRatio(ratiok);
      getColor(ratiok);
    }, 100);
  }, [data]);
  const getColor = k => {
    if (k < 0.5) {
      setColor('green');
    } else if (k >= 0.5 && k < 0.8) {
      // return 'orange';
      setColor('orange');
    } else {
      // return 'red';
      setColor('red');
    }
  };

  const [color, setColor] = useState('green');
  return (
    <View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#c0c0c0',
          backgroundColor: '#fff',
        }}
        className="rounded-2xl px-3 py-2 my-1">
        <Text className="text-black text-lg font-bold mb-1">{data.id}</Text>
        <ProgressBar
          progress={ratio}
          width={null}
          height={14}
          borderRadius={20}
          color={color}
        />
      </View>
    </View>
  );
};

export default WareProgress;
