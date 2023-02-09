import { useEffect, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = createContext();

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
    try {
      const response = await fetch(url);
      const {data} = response;
      console.log(data);
    }
    catch(error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getInvoices();
  // }, []);

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