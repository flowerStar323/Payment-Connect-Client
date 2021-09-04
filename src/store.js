import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import root from './reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, root)

const middleware = [thunk, logger];


export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middleware)
    // , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
