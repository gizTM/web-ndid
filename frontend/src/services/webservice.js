import axios from 'axios'

const post = (path, body) => {
  return axios
    .post(path, body)
    .then(resp => {
      console.log('response: ', resp);
      return resp;
    })
    .catch(error => {
      console.error('error message: ', error.toString());
      console.error('error: ', error);
      return Promise.reject(error);
    });
}

export {
  post
}