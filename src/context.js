import { useEffect, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';
import { createInvoiceObj } from './utils/helper';

const AppContext = createContext();

const API_ENDPOINT = 'https://raw.githubusercontent.com/aebiz-aleksandar/api/main/invoices.json';

const initState = {
  invoicesLoading: true,
  invoicesError: false,
  invoices: [],
  filteredInvoices: [],
  currentInvoice: null,
  filterStatuses: [],
  addEditBar: false,
  deleteModal: false,
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

  // set current invoice
  const setCurrentInvoice = invoice => {
    dispatch({type: actions.SET_CURRENT_INVOICE, payload: invoice});
  }

  // toggle add edit bar
  const toggleAddEditBar = () => {
    dispatch({type: actions.TOGGLE_ADD_EDIT_BAR});
  }

  // toggle delete modal
  const toggleDeleteModal = () => {
    dispatch({type: actions.TOGGLE_DELETE_MODAL});
  }

  // add invoice
  const addInvoice = (formData, itemsData) => {
    const newInvoice = createInvoiceObj(formData, itemsData);
    dispatch({type: actions.ADD_INVOICE, payload: newInvoice});
  }

  // edit current invoice
  const editCurrentInvoice = (id, formData, itemsData) => {
    const newInvoice = createInvoiceObj(formData, itemsData, id);
    dispatch({type: actions.EDIT_INVOICE, payload: {id, newInvoice}});
  }

  // delete invoice
  const deleteInvoice = id => {
    dispatch({type: actions.DELETE_INVOICE, payload: id});
  }

  // add draft invoice
  const addDraftInvoice = (formDate, itemsData) => {
    const newInvoice = {...createInvoiceObj(formDate, itemsData), status: 'draft'};
    dispatch({type: actions.ADD_DRAFT_INVOICE, payload: newInvoice});
  }

  // update status to "paid"
  const updateStatus = id => {
    dispatch({type: actions.UPDATE_STATUS, payload: id});
  }

  // get invoices
  useEffect(() => {
    const storageInvoices = localStorage.getItem('invoices');
    if (storageInvoices) {
      dispatch({type: actions.FETCH_INVOICES_SUCCESS, payload: JSON.parse(storageInvoices)});
    } else {
      getInvoices(API_ENDPOINT);
    }
  }, []);

  // trigger filter invoices
  useEffect(() => {
    dispatch({type: actions.FILTER_INVOICES});
  }, [state.invoices, state.filterStatuses]);

  // save to local storage
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(state.invoices));
  }, [state.invoices]);

  return <AppContext.Provider value={{
    ...state,
    updateFilter,
    setCurrentInvoice,
    toggleAddEditBar,
    toggleDeleteModal,
    addInvoice,
    editCurrentInvoice,
    deleteInvoice,
    addDraftInvoice,
    updateStatus
  }}>
    {children}
  </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export { AppProvider, useAppContext }