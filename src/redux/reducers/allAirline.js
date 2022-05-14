const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const allAirlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_AIRLINE_PENDING':
      return { ...state, isLoading: true };
    case 'GET_ALL_AIRLINE_FULFILLED':
      return { ...state, isLoading: false, isError: false, data: action.payload.data };
    case 'GET_ALL_AIRLINE_REJECTED':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default allAirlineReducer;
