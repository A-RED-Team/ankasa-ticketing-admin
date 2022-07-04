const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const detailCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DETAIL_CITY_PENDING':
      return { ...state, isLoading: true };
    case 'GET_DETAIL_CITY_FULFILLED':
      return { ...state, isLoading: false, isError: false, data: action.payload.data.data };
    case 'GET_DETAIL_CITY_REJECTED':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default detailCityReducer;
