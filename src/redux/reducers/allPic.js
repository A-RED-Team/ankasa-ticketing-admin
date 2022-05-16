const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const allPicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_PIC_PENDING':
      return { ...state, isLoading: true };
    case 'GET_ALL_PIC_FULFILLED':
      return { ...state, isLoading: false, isError: false, data: action.payload.data };
    case 'GET_ALL_PIC_REJECTED':
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default allPicReducer;
