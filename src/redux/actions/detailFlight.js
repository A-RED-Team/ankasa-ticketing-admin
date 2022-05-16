import axios from '../../utils/axios';

export const getdetailFlight = (id) => {
  return {
    type: `GET_DETAIL_FLIGHT`,
    payload: axios({
      url: `flight/${id}`,
      method: 'GET'
    })
  };
};
