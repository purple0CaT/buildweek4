export const initSocket = (value) => ({
  type: "INIT_SOCKET",
  payload: value,
});
export const setUserInfo = (value) => ({
  type: "SET_USER_INFO",
  payload: value,
});
export const SET_ACTIVE_CHAT='SET_ACTIVE_CHAT'
export const setActiveChat = (value) => ({
  type: "SET_ACTIVE_CHAT",
  payload: value,
});
export const setHistory = (value) => ({
  type: "SET_HISTORY",
  payload: value,
});
export const newMessage = (value) => ({
  type: "NEW_MESSAGE",
  payload: value,
});
