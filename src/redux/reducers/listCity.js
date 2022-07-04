const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const listCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_CITY_PENDING':
      return { ...state, isLoading: true };
    case 'GET_LIST_CITY_FULFILLED':
      return { ...state, isLoading: false, isError: false, data: action.payload.data.data };
    case 'GET_LIST_CITY_REJECTED':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default listCityReducer;
