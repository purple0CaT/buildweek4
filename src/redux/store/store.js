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
    _id: "6194e5dbdf63d1c9d6339f07",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: {
      _id: "6194e70efbecea49db16fae3",
      members: [
        {
          _id: "6194e5dbdf63d1c9d6339f07",
          username: "Cristina17",
          email: "Jacklyn18@hotmail.com",
          createdAt: "2021-11-17T11:22:03.074Z",
          updatedAt: "2021-11-17T11:23:37.540Z",
          socket: "bipqmfftd-iy_slYAAAB",
        },
      ],
      name: "Test",
      history: [
        {
          content: {
            text: "Hello John!",
          },
          sender: {
            username: "Cristina17",
            email: "Jacklyn18@hotmail.com",
            socket: "tBRz-wWxYibSbt89AAAB",
            _id: "6194e5dbdf63d1c9d6339f07",
            updatedAt: "2021-11-18T10:25:47.296Z",
            createdAt: "2021-11-17T11:22:03.074Z",
          },
          _id: "61962a316c9733944e6b71ef",
          updatedAt: "2021-11-18T10:25:53.462Z",
          createdAt: "2021-11-18T10:25:53.462Z",
        },
        {
          content: {
            text: "Hello John!",
          },
          sender: {
            username: "Cristina17",
            email: "Jacklyn18@hotmail.com",
            socket: "tBRz-wWxYibSbt89AAAB",
            _id: "6194e5dbdf63d1c9d6339f07",
            updatedAt: "2021-11-18T10:25:47.296Z",
            createdAt: "2021-11-17T11:22:03.074Z",
          },
          _id: "61962a326c9733944e6b71fd",
          updatedAt: "2021-11-18T10:25:54.524Z",
          createdAt: "2021-11-18T10:25:54.524Z",
        },
      ],
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
