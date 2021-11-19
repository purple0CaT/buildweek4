export const INIT_SOCKET = "INIT_SOCKET";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
export const SET_HISTORY = "SET_HISTORY";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const SET_CHATS = "SET_CHATS";

export const initSocket = (value) => ({
  type: INIT_SOCKET,
  payload: value,
});
export const setUserInfo = (userObj) => ({
  type: SET_USER_INFO,
  payload: userObj,
});
export const setActiveChat = (value) => ({
  type: SET_ACTIVE_CHAT,
  payload: value,
});
export const setHistory = (value) => ({
  type: SET_HISTORY,
  payload: value,
});
export const newMessage = (value) => ({
  type: NEW_MESSAGE,
  payload: value,
});
export const setChats = (array) => ({
  type: SET_CHATS,
  payload: array,
});
export const setActiveHistory = (value) => ({
  type: "SET_ACTIVE_HISTORY",
  payload: value,
});
