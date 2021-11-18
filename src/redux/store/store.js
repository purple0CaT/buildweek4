import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import localStorage from "redux-persist/es/storage";
import { userReducer } from "../reducer/user";
import { chatsReducer } from "../reducer/chat";
import { socketReducer } from "../reducer/socket";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  LoginDetails: {
    email: "",
    password: "",
  },
  userInfo: {
    _id: "1",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: "",
    list: [],
  },
  socket: "",
};

const allReducers = combineReducers({
  userInfo: userReducer,
  chats: chatsReducer,
  socket: socketReducer,
});

const persistConfigs = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEYENCRIPTION,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};
const persistedReducer = persistReducer(persistConfigs, allReducers);
const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(configureStore);

export { configureStore, persistor };
