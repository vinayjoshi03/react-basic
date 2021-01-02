import * as actionTypes from './types'
import Axios from 'axios';
import { Promise } from 'bluebird';
//import {Promise} from 'bluebird'
export const showLoading=(status=false)=>{
    return {type:actionTypes.SHOW_LOADING,payload:{showLoading:status}}
}

export const showError=(message='')=>{
    return {type:actionTypes.SHOW_ERROR,payload:{message:message}}
}

export const fetchPosts=(data)=>{
    return (dispatch)=>{
        dispatch(showLoading(true));
        Axios.get('http://localhost:1337/api/posts/getall').then(response=>{
            if(response.status === 200) {
                dispatch({type:actionTypes.VIEW_ALL,payload:response.data.data, totalPostsCount:response.data.totalPostCount});
                dispatch(showLoading(false));
            } else {
                dispatch(showLoading(false));
                dispatch(showError('Error Occure During fetching posts'));
            }
        }).catch(function(err){
            dispatch(showLoading(false));
            dispatch(showError(err));
        });
    }
}

export const addNewPost=(data)=>{
    return (dispatch)=>{
        dispatch(showLoading(true));    
           return Axios.post('http://localhost:1337/api/posts/create',data).then(response=>{
                if(response.status === 200) {
                    dispatch({type:actionTypes.SHOW_ADD_SUCCESS,payload:{status:true}})
                    dispatch(showLoading(false));
                    dispatch(showError(""));
                   //return  Promise.resolve('Post added successfully')
                } else {
                    dispatch(showLoading(false));
                    dispatch(showError('Error Occure During fetching posts'));
                    //return Promise.reject('Error occure during creating post')
                }
            }).catch(function(err){
            dispatch(showLoading(false));
            dispatch(showError(err));
            //return Promise.reject('Error occure during creating post')
        });
    }
}

export const getPostDetailsByPost=(postID)=>{
    return (dispatch)=>{
        return Axios.get('http://localhost:1337/api/posts/'+postID).then(response=>{
            if(response.status===200) {
                dispatch({type:actionTypes.POST_DETAILS,payload:{data:response.data.data}});
            } else {
                dispatch(showError('Error Occure During fetching posts'));
            }
            
        }).catch(function(err) {
            dispatch(showError('Error Occure During fetching posts'));
        });
    }
}






