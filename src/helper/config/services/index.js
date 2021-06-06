import axios from 'axios';
import { broadcastSocket } from '../../../core/config/socketHandle';

const instance = axios.create({
  baseURL: 'https://jenish-be.herokuapp.com/',
});
export default function axiosCall(method, url, responseType, data, headers) {
  return async (dispatch) => {
    const apiData = data ? {
      method, url, data, headers,
    } : { method, url, headers };
    instance(apiData)
      .then((response) => {
        console.log(response, 'response');
        if (response.data.status) {
          broadcastSocket(response.data);
          dispatch({ type: `${responseType}_SUCCESS`, updatePayload: response.data });
        } else {
          dispatch({ type: `${responseType}_ERROR`, updatePayload: response.data });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error === 'Authentication token expired') {
          localStorage.clear();
        }
        dispatch({
          type: 'FETCH_ERROR',
          updatePayload: err.response ? err.response : 'Something Went Wrong.',
        });
      });
  };
}