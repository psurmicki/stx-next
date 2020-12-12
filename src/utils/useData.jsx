import { useEffect, useReducer } from 'react';
import { apiReducer } from '../reducers.jsx';

const API_KEY = 'AIzaSyCpVyXQfzzvrymmeAp2vcxD3GRVyZLXeok'

const fetchData = async (path, index = 0) => {
  if (!path) return;
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${path}&maxResults=10&startIndex=${index}&key=${API_KEY}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
};

export const useData = (path, index) => {
  const [response, dispatch] = useReducer(apiReducer, { data: null, isLoading: false, error: null });
  useEffect(() => {
    dispatch({ type: 'FETCHING_DATA' });
    fetchData(path, index)
      .then((data) => dispatch({ type: 'FETCHED_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCHED_FAILED', payload: error }));
  }, [path, index]);
  return response;
};