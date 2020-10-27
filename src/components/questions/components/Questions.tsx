import React from 'react';
import {
  StyleSheet,
  Button,
  Dimensions,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {updateState, updateTimer, updateQuiz} from '../../redux/actions';

import {Color} from '../../utils/Config';
import API from '../../api/api';

// Start of class
class Questions extends React.Component {

  static navigationOptions = ({ navigation }) => {
    let category = navigation.getParam('category');
    return {
      headerTitle: 'Nearly opposite in meaning to the underlined word',
      headerTintColor: Color.primary,
    };
  };

  onPressStart = () => {
    clearInterval(this.interval);
    clearInterval(this.interval2);

    this.selectedAnswers = [];
    this.totalCorrect = 0;

    this.question = null;
    this.indexes = shuffledQuizIndexes(this.props.quiz.totalQuestions);

    this.props.updateState({button: 'Cancel'});

    // run async and possible interruption at every 10ms chuck
    this.interval = setInterval(this.runInterval(), 10);

    // run async timer
    this.interval2 = setInterval(this.runTimer, 1000);
  };

  runTimer = () => {
    timer = {...this.props.timer};
    if (timer.sec === 0) {
      timer.sec = this.props.settings.max_sec;
    } else {
      timer.sec = timer.sec - 1;
    }
    this.props.updateTimer({...timer});
  };

  runInterval = () => {

    //kick-start question, run once
    if (this.question === null) {

      // reset timer
      const {max_min, max_sec} = this.props.settings;
      this.props.updateTimer({min: max_min, sec: max_sec});

      this.question = API.getQuestion(
        this.props.state.category,
        this.indexes[this.props.state.counter - 1],
      );
      this.props.updateQuiz({question: this.question});
    }

    //replenish with new question when timer reaches min=0, sec=0
    const timer_reached_zero =
      this.props.timer.min === 0 && this.props.timer.sec === 0;

    if (timer_reached_zero) {
      this.question = API.getQuestion(
        this.props.state.category,
        this.indexes[this.props.state.counter - 1],
      );
      this.props.updateQuiz({question: this.question});

      // capture answered questions and compute total correct
      isCorrect =
        this.props.state.answer === this.question.correct ? true : false;
      if (isCorrect) {this.totalCorrect++;}

      const answerIndex = getChoice(this.props.state.answer);
      const answerLong =
        answerIndex > -1 ? this.question.radio[answerIndex].label : '';

      const correctIndex = getChoice(this.question.correct);
      const correctLong =
        correctIndex > -1 ? this.question.radio[correctIndex].label : '';

      this.selectedAnswers = [
        ...this.selectedAnswers,
        {
          count: this.props.state.counter,
          question: this.question.question,
          answer: this.props.state.answer,
          answerLong,
          correctAnswer: this.question.correct,
          correctLong,
          correct: isCorrect,
        },
      ];

      if (this.props.state.counter === this.props.quiz.totalQuestions) {

          clearInterval(this.interval);
        clearInterval(this.interval2);

        this.quizResult = {
          selectedAnswers: this.selectedAnswers,
          totalCorrect: this.totalCorrect,
          totalQuestions: this.props.quiz.totalQuestions,
        };

        this.props.updateState({
          button: 'Start',
          answer: '',
          counter: 1,
        });

        this.props.navigation.navigate('ViewResult', {
          quizResult: this.quizResult,
        });
        return this.runInterval;
      } else {
        this.props.updateState({counter: this.props.state.counter + 1});
        this.props.updateTimer({
          min: this.props.settings.max_min,
          sec: this.props.settings.max_sec,
        })

        this.question = API.getQuestion(
          this.props.state.category,
          this.indexes[this.props.state.counter - 1],
        );
        this.props.updateQuiz({question: this.question});
        this.props.updateState({answer: ''});
      }
    }
    return this.runInterval;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  onViewResult = () => {
    this.props.updateState({button: 'Start'});
    this.props.navigation.navigate('ViewResult', {});
  };

  onAnswer = (answer) => {
    this.props.updateState({answer});
  };

  onSubmitAnswer = () => {
    this.props.updateTimer({min: 0, sec: 0});
  };

  onLongPressSubmitAnswer = (choice) => {
    this.onAnswer(choice);
    this.onSubmitAnswer();
  };

  onCancel = () => {
    this.props.updateState({button: 'Start', counter: 1});  
    this.props.navigation.navigate('QuizPage');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TimerCount
            button={this.props.state.button}
            timer={this.props.timer}
            counter={this.props.state.counter}
            quiz={this.props.quiz}
            category={this.props.state.category}
          />

          <View style={{flex: 1}}>
            <TestConsole
              button={this.props.state.button}
              quiz={this.props.quiz}
              onAnswer={this.onAnswer}
              answer={this.props.state.answer}
              counter={this.props.state.counter}
              onLongPressSubmitAnswer={this.onLongPressSubmitAnswer}
            />
          </View>
          <Button title={this.props.state.button} onPress={this.onPressStart} />

        </ScrollView>
      </View>
    );
  }
}

const TimerCount = (props) => {
  if (props.button === 'Cancel') {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{marginRight: 100}}>
          {props.category.name} {props.counter} of {props.quiz.totalQuestions}
        </Text>
        <TimerClock timer={props.timer} />
      </View>
    );
  }
  return null;
};

const TimerClock = (props) => {
  const cond1 = props.timer.sec <= 5;
  const cond2 = props.timer.sec !== 0;

  const color = cond1 && cond2 ? 'red' : 'black';
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Timer:</Text>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: color}}>
        {props.timer.min.zeroPad()}:{props.timer.sec.zeroPad()}
      </Text>
    </View>
  );
};

const TestConsole = (props) => {
  if (props.button === 'Start') {
    return (
      <View
        style={{
          paddingTop: 100,
          paddingBottom: 0,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20}}>Ready Player One</Text>
      </View>
    );
  } else if (props.button === 'Cancel') {
    return (
      <View>
        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {props.counter}. {props.quiz.question.question}
        </Text>
        <Text style={styles.topinfo}>Answer: {props.answer.toUpperCase()}</Text>
        <View style={{paddingTop: 10, paddingBottom: 30}}>
          <TouchableOpacity
            onPress={() => props.onAnswer('a')}
            onLongPress={() => props.onLongPressSubmitAnswer('a')}>
            <Text style={styles.choices}>
              (A) {props.quiz.question.radio[0].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer('b')}
            onLongPress={() => props.onLongPressSubmitAnswer('b')}>
            <Text style={styles.choices}>
              (B) {props.quiz.question.radio[1].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer('c')}
            onLongPress={() => props.onLongPressSubmitAnswer('c')}>
            <Text style={styles.choices}>
              (C) {props.quiz.question.radio[2].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer('d')}
            onLongPress={() => props.onLongPressSubmitAnswer('d')}>
            <Text style={styles.choices}>
              (D) {props.quiz.question.radio[3].label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (props.button === 'View Result') {
    return (
      <View
        style={{
          marginTop: 100,
          paddingBottom: 20,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', paddingBottom: 30}}>
          Result
        </Text>
        <Text style={{fontSize: 20}}>
          {' '}Total Questions: {props.quiz.totalQuestions}
        </Text>
        <Text style={{fontSize: 20}}>
          {' '}Total Correct: {props.quiz.totalCorrect}{' '}
        </Text>
      </View>
    );
  }
};

const SubmitButton = (props) => {
  if (props.title === 'Start') {
    return (
      <View>
        <TouchableOpacity onPress={props.startHandler}>
          <Text
            style={{
              paddingTop: 10,
              fontWeight: 'bold',
              fontSize: 40,
              color: '#6DC5EA',
            }}>
            Press Start
          </Text>
        </TouchableOpacity>
        )<Text>Time Pressured</Text>
      </View>
    );
  } else if (props.title === 'View Result') {
    return <Button title={props.title} onPress={props.viewResultHandler} />;
  } else if (props.title === 'Cancel') {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button
          title="Submit"
          onPress={props.onSubmitAnswerHandler}
          disabled={props.disableSubmit}
          raised={true}
          theme="dark"
          overrides={true}
          backgroundColor="#3fffff"
        />
        <Button title={props.title} onPress={props.cancelHandler} />
      </View>
    );
  }
  return null;
};
var {gheight, gwidth} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    width: gwidth,
  },
  choices: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
  },
  topinfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

const shuffledQuizIndexes = (totalQuestions) => {
  randomQuiz = new Set();
  while (randomQuiz.size !== totalQuestions) {
    rand = Math.floor(Math.random() * 10);
    randomQuiz.add(rand);
  }
  return [...randomQuiz];
};

const getChoice = (letter) => {
  if (!letter || letter == undefined) {return -1;}

  let arr = [];
  arr.a = 0;
  arr.b = 1;
  arr.c = 2;
  arr.d = 3;
  arr.e = 4;

  return arr[letter];
};

Number.prototype.zeroPad = function () {
  return this.toString().padStart(2, '0');
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  timer: state.timer,
  state: state.state,
  quiz: state.quiz,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  updateState,
  updateTimer,
  updateQuiz,
})(Questions)
