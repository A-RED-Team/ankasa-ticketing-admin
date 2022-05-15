import axios from '../../utils/axios';

export const getAllAirline = () => {
  return {
    type: 'GET_ALL_AIRLINE',
    payload: axios({
      url: `airline?limit=100`,
      method: 'GET'
    })
  };
};
