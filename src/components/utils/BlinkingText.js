import React, {Component} from 'react';
import {Text} from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState((previousState) => {
        return {isShowingText: !previousState.isShowingText};
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return <Text>{display}</Text>;
  }
}

export default Blink;
