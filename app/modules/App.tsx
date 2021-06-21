import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../redux';
import TodoScreen from './TodoScreen';
import rootSaga from '../saga/index';

const Stack = createStackNavigator();
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

function MyStack() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Add Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MyStack;
