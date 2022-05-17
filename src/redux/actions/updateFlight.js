import axios from '../../utils/axios';

export const updateFlight = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`flight/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
