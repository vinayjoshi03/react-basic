import React, { Component, useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import * as actionTypes from './../../../actions/types'
import {useSelector, useDispatch} from 'react-redux'
//import * as bs from 'bootstrap/dist/css/bootstrap.css';
//import * as bst from 'bootstrap/dist/css/bootstrap-theme.css';
const UserGrid = () => {
    let userData;
    const initialState = useSelector((state)=>state);
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});
    const showLoading = initialState.common.showLoading
    useEffect(() => {
        dispatch({ type: actionTypes.SHOW_LOADING, payload: { showLoading: true } });
       Axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            setUserDetails(response.data);
            dispatch({ type: actionTypes.SHOW_LOADING, payload: { showLoading: false } });
        });
    }, []);

    const UserData = () => {
        const rows = Object.keys(userDetails).map((item, key) => {
            const userData = userDetails[item];
            return (
                <tr key={userData.id + "id"}>
                    <td>{userData.name}<p>Add User</p></td>
                    <td>{userData.username}</td>
                    <td>{userData.email}</td>
                    <td>{userData.phone}</td>
                    <td>{userData.address.city}</td>
                </tr>
            )
        });
        return (<Table striped bordered hover className={'asfsfsd'}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>)
    }

    return (
        <>
            User details
          {!showLoading? UserData(): ""}
        </>
    )
}

export default UserGrid;