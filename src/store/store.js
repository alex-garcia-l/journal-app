import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { noteReducer } from '../reducers/noteReducer';


const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: noteReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)
