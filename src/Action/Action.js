import { TYPES } from "./Types";
export const addPosition = (newPosition) => {
  return {
    type: TYPES.ADD_POSITION,
    newPosition: newPosition,
  };
};
export const addUser = (newUser) => {
  return {
    type: TYPES.ADD_USER,
    newUser: newUser,
  };
};
export const deletePosition = (id) => {
  return {
    type: TYPES.DELETE_POSITION,
    id: id,
  };
};
export const deleteUser = (id) => {
  return {
    type: TYPES.DELETE_USER,
    id: id,
  };
};
export const editPosition = (position) => {
  return {
    type: TYPES.EDIT_POSITION,
    payload: position,
  };
};
export const editUser = (user) => {
  return {
    type: TYPES.EDIT_USER,
    payload: user,
  };
};
export const selectedPosition = (position) => {
  return {
    type: TYPES.SET_SELECTED_POSITION,
    position: position,
  };
};
export const selectedUser = (user) => {
  return {
    type: TYPES.SET_SELECTED_USER,
    user: user,
  };
};
