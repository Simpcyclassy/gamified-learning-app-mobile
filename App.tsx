import React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import Router from './src/components/Router';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

export default App;
