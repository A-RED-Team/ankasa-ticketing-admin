import axios from '../../utils/axios';

export const changeStatusFlight = (id, status) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`flight/mode/${id}`, status)
      .then((res) => {
        // console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};
