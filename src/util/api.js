//import React from 'react'
import Axios from 'axios';
export const api = {
    post: (apiPath, data) => {
        return Axios.post(apiPath, data).then(function (response) {
            
            if(response.status == 200) {
                return response;
            } else {
                return {error:"Error occure during getting response"}
            }
        }).catch(function (error) { return error });
    }
}