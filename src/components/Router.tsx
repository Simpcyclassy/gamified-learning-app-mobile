import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './home/components';
import Category from './category/components';
// import Results from './results/components';
import Questions from './questions/components';

const Stack = createStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1C58E2',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: 'Primary Quiz',
        }}
      />
      <Stack.Screen name="QuizPage" component={Questions} />
      {/* <Stack.Screen name="ViewResult" component={Results} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
