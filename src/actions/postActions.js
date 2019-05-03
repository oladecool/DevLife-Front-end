import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    GET_POSTS,
    CLEAR_ERRORS,
    POST_LOADING,
    DELETE_POST
} from './types';

//ADD POST
export const addPost = postdata => dispatch => {
    dispatch(clearErrors());
    axios
        .post('//localhost:5000/api/post', postdata)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//GET POST
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('//localhost:5000/api/post')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};

// Add Like
export const addLike = id => dispatch => {
    axios
      .post(`//localhost:5000/api/posts/like/${id}`)
      .then(res => dispatch(getPosts()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};
  
//REMOVE LIKE
export const removeLike = id => dispatch => {
    axios
        .post(`//localhost:5000/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    };
};

//DELETE POST 
export const deletePost = id => dispatch => {
    axios
        .post(`//localhost:5000/api/post/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };
  
