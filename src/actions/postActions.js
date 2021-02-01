import * as actionTypes from './types'
import Axios from 'axios';
import { Promise } from 'bluebird';
//import {Promise} from 'bluebird'
export const showLoading = (status = false) => {
    return { type: actionTypes.SHOW_LOADING, payload: { showLoading: status } }
}

export const showError = (message = '') => {
    return { type: actionTypes.SHOW_ERROR, payload: { message: message } }
}

export const fetchPosts = (pageNo=0) => {
    return async (dispatch) => {
        dispatch(showLoading(true));
        await Axios.post('http://localhost:1337/api/posts/getall', {pageNumber:pageNo}).then(response => {
            if (response.status === 200) {
                dispatch({ type: actionTypes.VIEW_ALL, payload: {posts:response.data.data, totalPostCount:response.data.totalPostCount }});
                dispatch(showLoading(false));
            } else {
                dispatch(showLoading(false));
                dispatch(showError('Error Occure During fetching posts'));
            }
        }).catch(function (err) {
            dispatch(showLoading(false));
            dispatch(showError(err));
        });
    }
}

export const addNewPost = (data, additionalData={pageNumber:0}) => {
    return (dispatch) => {
        dispatch(showLoading(true));
        return Axios.post('http://localhost:1337/api/posts/create', {postData:data,additionalData:additionalData}).then(response => {
            if (response.status === 200) {
                console.log("After Create-->",response);
                dispatch({ type: actionTypes.SHOW_ADD_SUCCESS, payload: { status: true } });
                dispatch({ type: actionTypes.CREATE_POST, payload: { data: response.data.data } });
                dispatch(showLoading(false));
                dispatch(showError(""));
                dispatch({ type: actionTypes.SHOW_ADD_SUCCESS, payload: { status: false } });
                //return  Promise.resolve('Post added successfully')
            } else {
                dispatch(showLoading(false));
                dispatch(showError('Error Occure During fetching posts'));
                //return Promise.reject('Error occure during creating post')
            }
        }).catch(function (err) {
            dispatch(showLoading(false));
            dispatch(showError(err));
            //return Promise.reject('Error occure during creating post')
        });
    }
}

export const getPostDetailsByPost = (postID) => {
    return (dispatch) => {
        return Axios.get('http://localhost:1337/api/posts/' + postID).then(response => {
            if (response.status === 200) {
                dispatch({ type: actionTypes.POST_DETAILS, payload: { data: response.data.data } });
            } else {
                dispatch(showError('Error Occure During fetching posts'));
            }

        }).catch(function (err) {
            dispatch(showError('Error Occure During fetching posts'));
        });
    }
}

export const deletePost = (post) => {
    return (dispatch) => {
        dispatch(showLoading(true));
        return Axios.delete('http://localhost:1337/api/posts/delete', { data: post }).then(response => {

            if (response.status === 200) {
                dispatch(showLoading(false));
                dispatch({ type: actionTypes.DELETE_POST, payload: { data: response.data.data } });
            } else {
                dispatch(showLoading(false));
                dispatch(showError('Error occurred during deleting post'));
            }
        }).catch(function (err) {
            dispatch(showError('Error occurred during deleting post'));
            dispatch(showLoading(false));
        });
    }
}