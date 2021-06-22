import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-redux';
import TodoScreen from './TodoScreen';
import store from '../Store';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Add Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MyStack;
