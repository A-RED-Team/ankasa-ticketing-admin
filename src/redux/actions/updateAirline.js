import axios from '../../utils/axios';

export const updateAirline = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`airline/${id}`, data, {
        headers: {
          'Content-Type': `multipart/form-data`
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
