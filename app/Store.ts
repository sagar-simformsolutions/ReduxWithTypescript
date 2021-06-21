import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import rootReducer from './redux';

const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware];

const middlewares = applyMiddleware(...middleWare);
const enhancers = compose(middlewares);

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;

// Enable persistence
export default store;
