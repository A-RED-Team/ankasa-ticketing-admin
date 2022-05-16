import axios from '../../utils/axios';

export const getdetailAirline = (id) => {
  return {
    type: `GET_DETAIL_AIRLINE`,
    payload: axios({
      url: `airline/${id}`,
      method: 'GET'
    })
  };
};
