import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Category from './category/components/Category';
// import QuizPageScreen from './components/screens/QuizPageScreen';
// import ViewResultScreen from './components/screens/ViewResultScreen';
// import SettingsScreen from './components/screens/SettingsScreen';

import {Home} from './home/components';
// import {Questions} from './questions/components';

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
      {/* <Stack.Screen name="QuizPageScreen" component={QuizPageScreen} /> */}
      {/* <Stack.Screen name="ViewResultScreen" component={ViewResultScreen} /> */}
      {/* <Stack.Screen name="SettingsScreen" component={SettingsScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
