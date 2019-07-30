import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//import reducers next
import userReducer from "./userReducer";
import counselorsReducer from "./counselorsReducer";
import journalReducer from "./journalReducer";
import requestCounselorReducer from './requestCounselorReducer'

const rootReducer = combineReducers({
  user: userReducer,
  counselors: counselorsReducer,
  journal: journalReducer,
  requestCounselor: requestCounselorReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(promiseMiddleware)
  )
);
export const persistor = persistStore(store);
