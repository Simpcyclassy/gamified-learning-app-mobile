import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import Router from './src/components/Router';

export default class App extends React.Component {
  setMaxQuestions = (maxQuestions) => {
    this.setState({maxQuestions});
  };
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
