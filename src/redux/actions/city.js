import axios from '../../utils/axios';

export const getListCity = () => {
  return {
    type: 'GET_LIST_CITY',
    payload: axios({
      url: `city?limit=100`,
      method: 'GET'
    })
  };
};

export const getDetailCity = (id) => {
  return {
    type: `GET_DETAIL_CITY`,
    payload: axios({
      url: `city/${id}`,
      method: 'GET'
    })
  };
};

export const store = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`city`, data)
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
      .put(`city/${id}`, data)
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
      .put(`city/status/${id}`, status)
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
      .delete(`city/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
