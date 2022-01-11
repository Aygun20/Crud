import React, { createContext, useReducer } from "react";
import { Reducer } from "./AppReducer";

const initialState = {
  users: [
    { id: 1, name: "murad", age: 21 },
    { id: 2, name: "aygun", age: 22 },
    { id: 3, name: "sebine", age: 23 },
  ],
  selectedUser: null,
  positions: [
    { id: 1, position: "teacher" },
    { id: 2, position: "doctor" },
    { id: 3, position: "engineer" },
  ],
  selectedPosition: null,
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
