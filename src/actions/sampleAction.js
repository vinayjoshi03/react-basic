import * as actionTypes from './types'
import axios from 'axios';

export const getSampleData = () => {
    //https://jsonplaceholder.typicode.com/posts
    console.log('getSampleData call====>');
    return async (dispatch) => {
        await axios.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
            console.log('SamplePosts = ', result)
            dispatch({ type: actionTypes.GET_ALL_SAMPLE_POSTS, payload: result.data});
        }).catch((error) => {
            console.log(error);
        })
    }
    
}