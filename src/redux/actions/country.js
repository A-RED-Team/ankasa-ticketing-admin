import axios from '../../utils/axios';

export const getListCountry = () => {
  return {
    type: 'GET_LIST_COUNTRY',
    payload: axios({
      url: `country?limit=100`,
      method: 'GET'
    })
  };
};

export const getDetailCountry = (id) => {
  return {
    type: `GET_DETAIL_COUNTRY`,
    payload: axios({
      url: `country/${id}`,
      method: 'GET'
    })
  };
};

export const store = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`country`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const update = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`country/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`country/status/${id}`, status)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const destroy = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`country/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
