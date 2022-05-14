import axios from '../../utils/axios';

export const getAllFlight = () => {
  return {
    type: 'GET_ALL_FLIGHT',
    payload: axios({
      url: `flight`,
      method: 'GET'
    })
  };
};
