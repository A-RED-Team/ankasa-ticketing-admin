import axios from '../../utils/axios';

export const getAllPic = () => {
  return {
    type: 'GET_ALL_PIC',
    payload: axios({
      url: `pic?limit=100`,
      method: 'GET'
    })
  };
};
