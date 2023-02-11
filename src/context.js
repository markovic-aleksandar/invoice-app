import { useEffect, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

const AppContext = createContext();

const API_ENDPOINT = 'https://raw.githubusercontent.com/aebiz-aleksandar/api/main/invoices.json';

const initState = {
  invoicesLoading: false,
  invoicesError: false,
  invoices: [],
  filterStats: '',
  theme: 'light'
}

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);
  
  const getInvoices = async url => {
    dispatch({type: actions.FETCH_INVOICES_BEGIN});
    try {
      const response = await axios(url);
      const {data} = response;
      dispatch({type: actions.FETCH_INVOICES_SUCCESS, payload: data});
    }
    catch(error) {
      console.log(error);
      dispatch({type: actions.FETCH_INVOICES_ERROR});
    }
  }

  useEffect(() => {
    getInvoices(API_ENDPOINT);
  }, []);

  return <AppContext.Provider value={{
    ...state
  }}>
    {children}
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppProvider, useAppContext }