import * as actions from './actions';

const reducer = (state, action) => {
  if (action.type === actions.FETCH_INVOICES_BEGIN) {
    return {...state, invoicesLoading: true};
  }

  if (action.type === actions.FETCH_INVOICES_SUCCESS) {
    const invoices = action.payload;
    return {
      ...state,
      invoicesLoading: false,
      invoices: invoices,
      filteredInvoices: invoices
    };
  }

  if (action.type === actions.FETCH_INVOICES_ERROR) {
    return {
      ...state,
      invoicesLoading: false,
      invoicesError: true
    };
  }

  if (action.type === actions.UPDATE_FILTER) {
    const {name, checked} = action.payload;
    const {filterStatuses} = state;
    const tempFilters = checked ? [...filterStatuses, name] : filterStatuses.filter(status => status !== name);

    return {...state, filterStatuses: tempFilters};
  }

  if (action.type === actions.FILTER_INVOICES) {

    const {invoices, filterStatuses} = state;
    let tempInvoices = [...invoices];

    if (filterStatuses.length) {
      tempInvoices = tempInvoices.filter(invoice => filterStatuses.includes(invoice.status));
    }
    
    return {...state, filteredInvoices: tempInvoices};
  }

  if (action.type === actions.SET_CURRENT_INVOICE) {
    return {...state, currentInvoice: action.payload};
  }

  if (action.type === actions.TOGGLE_ADD_EDIT_BAR) {
    return {...state, addEditBar: !state.addEditBar};
  }

  if (action.type === actions.TOGGLE_DELETE_MODAL) {
    return {...state, deleteModal: !state.deleteModal};
  }

  if (action.type === actions.ADD_INVOICE) {
    const invoice = action.payload;

    const invoices = [...state.invoices, invoice];

    
    return {
      ...state,
      invoices,
      filteredInvoices: invoices,
      addEditBar: false
    };
  }

  if (action.type === actions.EDIT_INVOICE) {
    const {id, newInvoice} = action.payload;
    
    const editedInvoices = state.invoices.map(invoice => {
      if (invoice.id === id) {
        return newInvoice;
      }
      return invoice;
    });

    return {
      ...state,
      invoices: editedInvoices,
      filteredInvoices: editedInvoices,
      addEditBar: false,
      editInvoice: null
    };
  }

  if (action.type === actions.DELETE_INVOICE) {
    const invoices = state.invoices.filter(invoice => invoice.id !== action.payload);

    return {
      ...state,
      invoices,
      filteredInvoices: invoices,
      currentInvoice: null,
      deleteModal: false
    }
  }

  if (action.type === actions.ADD_DRAFT_INVOICE) {
    const invoice = action.payload;

    const invoices = [...state.invoices, invoice];

    return {
      ...state,
      invoices,
      filteredInvoices: invoices,
      addEditBar: false
    }
  }

  if (action.type === actions.UPDATE_STATUS) {
    const editedInvoices = state.invoices.map(invoice => {
      if (invoice.id === action.payload) {
        return {...invoice, status: 'paid'};
      }
      return invoice;
    });

    return {
      ...state,
      invoices: editedInvoices,
      filteredInvoices: editedInvoices
    };
  }

  throw new Error('This type of action is not exist');
}

export default reducer;