import axios from '../../utils/axios';

export const getAllCity = () => {
  return {
    type: 'GET_ALL_CITY',
    payload: axios({
      url: `city?limit=100`,
      method: 'GET'
    })
  };
};
