import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Welcome Chioma</Text>
      <Button
        title="Go to quiz"
        onPress={() => navigation.navigate('Questions')}
      />
    </View>
  );
};

export default Home;
