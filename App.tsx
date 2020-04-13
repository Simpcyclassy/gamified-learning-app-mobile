import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/store';
import {Router} from './src/components/router/components';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Router />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
