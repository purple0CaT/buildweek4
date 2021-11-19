import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import { chatsReducer } from "../reducer/chat";
import { socketReducer } from "../reducer/socket";
import { userReducer } from "../reducer/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  LoginDetails: {
    email: "",
    password: "",
  },
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: {
      _id: "",
      members: [],
      name: "",
      history: [],
      image: "",
    },
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
