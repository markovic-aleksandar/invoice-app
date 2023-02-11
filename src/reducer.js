import * as actions from './actions';

const reducer = (state, action) => {
  if (action.type === actions.FETCH_INVOICES_BEGIN) {
    return {...state, invoicesLoading: true};
  }

  if (action.type === actions.FETCH_INVOICES_SUCCESS) {
    return {
      ...state,
      invoicesLoading: false,
      invoices: action.payload
    };
  }

  if (action.type === actions.FETCH_INVOICES_ERROR) {
    return {
      ...state,
      invoicesLoading: false,
      invoicesError: true
    };
  }

  throw new Error('This type of action is not exist');
}

export default reducer;