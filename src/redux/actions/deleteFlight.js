import axios from '../../utils/axios';

export const deleteFlight = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`flight/${id}`)
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
