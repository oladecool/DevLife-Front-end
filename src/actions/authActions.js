import axios from 'axios';
import { GET_ERRORS , SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


//Register User
export const registerUser = (userData, history)=> dispatch => {
    axios
        .post('//localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('//localhost:5000/api/users/login', userData)
        .then(res => {
            //save to localStorage
            const { token } = res.data;
            //set token to
            localStorage.setItem('jwtToken', token);
            //set token to Auth header
            setAuthToken(token);
            //decode token to get userData
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
              dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
         );
   };

//Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem('jwt-token');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false 
    dispatch(setCurrentUser({}));
}
