import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Actions from '../actions';
import Firebase from 'firebase';

export default function configureStore(initialState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const config = {
    apiKey: 'AIzaSyAo-6vCLMcRnlKCZD6x6o76uVzqcz4jwa4',
    authDomain: 'tagger-c4286.firebaseapp.com',
    databaseURL: 'https://tagger-c4286.firebaseio.com',
    projectId: "tagger-c4286",
    storageBucket: "tagger-c4286.appspot.com",
    messagingSenderId: "656652853202"
  };

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers (
      applyMiddleware(reduxThunk)
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  Firebase.initializeApp(config);
  store.dispatch(Actions.verifyAuth());

  return store;
}
