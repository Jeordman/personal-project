import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";


//import reducers next
import userReducer from './userReducer'
import counselorsReducer from './counselorsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  counselors: counselorsReducer
});

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(promiseMiddleware)))