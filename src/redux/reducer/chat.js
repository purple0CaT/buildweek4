import { initialState } from "../store/store";
//
export const chatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case "SET_ACTIVE_HISTORY":
      return {
        ...state,
        active: { history: action.payload },
      };
    default:
      return state;
  }
};
