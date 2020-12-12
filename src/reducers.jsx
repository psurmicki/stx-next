export function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        data: null,
        isLoading: true,
        error: null
      };
    case 'FETCHED_SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: null
      };
    case 'FETCHED_FAILED':
      return {
        data: null,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function booksReducers(state, action) {
  switch (action.type) {
    //Regular list books
    case 'SET_BOOKS_LIST':
      return {
        ...state,
        booksList: action.payload
      };
    case 'ADD_BOOKS':
      return {
        ...state,
        booksList: [...state.booksList, ...action.payload],
        favouriteBookSList: state.favouriteBookSList.filter(book => book.id !== action.payload[0].id)
      };
    case 'REORDER_BOOKS':
      return {
        ...state,
        booksList: action.payload
      };
    case 'REMOVE_BOOKS':
      return {
        ...state,
        booksList: state.booksList.filter(book => book.id !== action.payload.id)
      };
    //Favourite books
    case 'SET_FAVOURITE_BOOK':
      return {
        ...state,
        favouriteBookSList: action.payload
      };
    case 'ADD_FAVOURITE_BOOK':
      return {
        ...state,
        favouriteBookSList: [...state.favouriteBookSList, ...action.payload],
        booksList: state.booksList.filter(book => book.id !== action.payload[0].id)
      };
    case 'REORDER_FAVOURITE_BOOK':
      return {
        ...state,
        favouriteBookSList: action.payload
      };
    case 'REMOVE_FAVOURITE_BOOK':
      return {
        ...state,
        favouriteBookSList: state.favouriteBookSList.filter(book => book.id !== action.payload.id)
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};