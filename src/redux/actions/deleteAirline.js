import axios from '../../utils/axios';

export const deleteAirline = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`airline/${id}`)
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
