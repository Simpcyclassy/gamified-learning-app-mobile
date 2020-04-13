// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {Home} from '../../home/components';
// import {Questions} from '../../questions/components';

// const Stack = createStackNavigator();

// const Router = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Questions" component={Questions} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Router;

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {Home} from './home/components';
import {Questions} from './questions/components';

const Stack = createStackNavigator();

const MainNavigation = () => (
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
          title: 'Scan Devices',
        }}
      />
      <Stack.Screen name="Questions" component={Questions} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigation;
