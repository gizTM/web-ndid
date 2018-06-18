import axios from 'axios'

const fetch = (path, data) => {
  return new Promise((resolve, reject) => {
    axios.post(path, data)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(error => {
        reject(error);
      });
  })
}

export {
  fetch
}