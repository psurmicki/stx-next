import React, { createContext, useReducer } from "react";
import { booksReducers } from './reducers.jsx';

const initialState = {
  booksList: [],
  favouriteBookSList: [],
  error: null
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducers, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export default Store;