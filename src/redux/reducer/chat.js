import { SET_ACTIVE_CHAT, SET_CHATS } from "../actions/action";
import { initialState } from "../store/store";
//
export const chatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        // chats:{
        //   ...state.chats,
          active: action.payload
        // }
      }
    case SET_CHATS:
      return {
        ...state,
        list: [action.payload],
      };
    case "SET_ACTIVE_HISTORY":
      return {
        ...state,
        active: { history: action.payload },
      };
    default:
      return state;
  }
};
