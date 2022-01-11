import { TYPES } from "../Action/Types";
export const Reducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.user,
      };
    case TYPES.SET_SELECTED_POSITION:
      return {
        ...state,
        selectedPosition: action.position,
      };
    case TYPES.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.newUser],
      };
    case TYPES.ADD_POSITION:
      return {
        ...state,
        positions: [...state.positions, action.newPosition],
      };

    case TYPES.EDIT_USER:
      const updateUser = action.payload;
      const updateUsers = state.users.map((user) => {
        if (user.id === updateUser.id) {
          return updateUser;
        }
        return user;
      });
      return {
        ...state,
        users: updateUsers,
        selectedUser: null,
      };
    case TYPES.EDIT_POSITION:
      const updatePosition = action.payload;
      const updatePositions = state.positions.map((position) => {
        if (position.id === updatePosition.id) {
          return updatePosition;
        }
        return position;
      });
      return {
        ...state,
        positions: updatePositions,
        selectedPosition: null,
      };
    case TYPES.DELETE_USER:
      return {
        ...state,
        users: [
          ...state.users.filter(
            (selectedUser) => selectedUser.id !== action.id
          ),
        ],
      };
    case TYPES.DELETE_POSITION:
      return {
        ...state,
        positions: [
          ...state.positions.filter(
            (selectedPosition) => selectedPosition.id !== action.id
          ),
        ],
      };

    default:
      return state;
  }
};
