import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {updateState} from '../../redux/actions';

import {Color} from '../../utils/Config';

class QuizCategoryScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTintColor: Color.primary,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Category</Text>
        <FlatList
          renderItem={(obj) => (
            <Category
              item={obj.item}
              navigation={this.props.navigation}
              updateState={this.props.updateState}
            />
          )}
          data={this.props.categories}
        />
      </View>
    );
  }
}

const Category = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.updateState({category: props.item.name});
        props.navigation.navigate('QuizPage');
      }}>
      <View style={styles.category}>
        <Image style={styles.image} source={{uri: props.item.icon}} />
        <Text style={styles.testname}>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  testname: {
    marginLeft: 20,
  },
  category: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    padding: 5,
  },
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {
  updateState,
})(QuizCategoryScreen);
