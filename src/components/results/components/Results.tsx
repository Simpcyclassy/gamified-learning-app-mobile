import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {Color} from '../../utils/Config';

import {connect} from 'react-redux';
import {updateTimer, updateQuizResult} from '../../redux/actions';

class ViewResultScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'View Result',
      headerTintColor: Color.primary,
    };
  };

  componentDidMount() {
    const {quizResult} = this.props.navigation.state.params;
    this.props.updateQuizResult(quizResult);
  }

  onStartAgan = () => {
    this.props.updateTimer({min: 0, sec: 8});
    this.props.navigation.navigate('QuizPage', {});
  };

  render() {
    // log(this.props.navigation)
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.result}>
            Total Correct: {this.props.quizResult.totalCorrect}
          </Text>
          <Text style={styles.result}>
            Total Questions: {this.props.quizResult.totalQuestions}
          </Text>
          <Button title="Start Again" onPress={this.onStartAgan} />
        </View>

        <FlatList
          style={{marginTop: 5, flex: 1, width: 300}}
          renderItem={(obj) => <ResultRow item={obj.item} />}
          data={this.props.quizResult.selectedAnswers}
        />
      </View>
    );
  }
}

const ResultRow = (props) => {
  const resultColor = props.item.correct ? 'green' : 'red';
  return (
    <View style={{padding: 5, width: gwidth}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: resultColor}}>
        {props.item.count}. {props.item.question}
      </Text>
      <View style={{marginLeft: 20}}>
        <Text>Answer: {props.item.answerLong}</Text>

        <ShowCorrect item={props.item} />
      </View>
    </View>
  );
};

const ShowCorrect = (props) => {
  if (props.item.correct) {
    return null;
  }
  return <Text>Correct: {props.item.correctLong}</Text>;
};

var {gwidth} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  quizResult: state.quizResult,
  state: state.state,
});

export default connect(mapStateToProps, {
  updateTimer,
  updateQuizResult,
})(ViewResultScreen);
