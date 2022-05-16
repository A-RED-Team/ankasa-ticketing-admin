import axios from '../../utils/axios';

export const addFlight = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`flight`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
