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
  filteredInvoices: [],
  filterStatuses: [],
  theme: 'light'
}

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  // fetch inital invoices
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

  // update filter params
  const updateFilter = e => {
    const name = e.currentTarget.name;
    const checked = e.currentTarget.checked;

    dispatch({type: actions.UPDATE_FILTER, payload: {name, checked}});
  }

  // get invoices
  useEffect(() => {
    getInvoices(API_ENDPOINT);
  }, []);

  // trigger filter invoices
  useEffect(() => {
    dispatch({type: actions.FILTER_INVOICES});
  }, [state.filterStatuses]);

  return <AppContext.Provider value={{
    ...state,
    updateFilter
  }}>
    {children}
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppProvider, useAppContext }