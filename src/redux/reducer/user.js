import { initialState } from "../store/store.js";
import { SET_USER_INFO } from "../actions/action.js";
//
export const userReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        name: action.payload.username,
        email: action.payload.email,
        avatar: action.payload.avatar,
        _id: action.payload._id,
      };

    default:
      return state;
  }
};
