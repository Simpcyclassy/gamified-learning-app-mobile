import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.welcome}>Welcome to quiz today</Text>
        <Image
          source={require('../../../images/quiz-images-png-6.png')}
          style={styles.quizImage}
        />
        <Button
          title="go to quiz"
          onPress={() => navigation.navigate('Questions')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    width: '100%',
    maxWidth: 425,
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  quizImage: {
    width: 425,
    height: 400,
  },
});

export default Home;
