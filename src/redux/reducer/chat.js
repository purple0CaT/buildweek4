import { SET_CHATS } from "../actions/action";
import { initialState } from "../store/store";
//
export const chatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        list: [action.payload],
      };
    default:
      return state;
  }
};
