import fetch from 'isomorphic-fetch';
import C from './constants';
import {v4} from 'uuid';

const parseResponse = response => response.json();

const logError = error => console.error(error);

const fetchThenDispatch = (dispatch, url, method, body) =>
  fetch(
    url,
    {
      method,
      body,
      headers: {'Content-Type': 'application/json'}
    }
  ).then(parseResponse)
    .then(dispatch)
    .catch(logError);

export const addColor = (title, color) =>
  (dispatch) =>
    fetchThenDispatch(
      dispatch,
      '/api/colors',
      'POST',
      JSON.stringify({title, color})
    );

export const removeColor = id =>
  dispatch =>
    fetchThenDispatch(
      dispatch,
      `/api/color/${id}`,
      'DELETE'
    );

export const rateColor = (id, rating) =>
  dispatch =>
    fetchThenDispatch(
      dispatch,
      `/api/color/${id}`,
      'PUT',
      JSON.stringify({rating})
    );