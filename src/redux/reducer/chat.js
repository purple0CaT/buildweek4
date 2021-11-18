import { SET_ACTIVE_CHAT } from "../actions/action";
import { initialState } from "../store/store";
// 
export const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return {
        ...state,
        // chats:{
        //   ...state.chats,
          active: action.payload
        // }
      }
    default:
      return state;
  }
};
