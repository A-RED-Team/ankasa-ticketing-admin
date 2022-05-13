import axios from '../../utils/axios';

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`auth/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
