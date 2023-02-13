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

  throw new Error('This type of action is not exist');
}

export default reducer;