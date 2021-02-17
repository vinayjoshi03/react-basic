import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { validateLoginForm } from '../../../util/validations'
import { useDispatch, useSelector } from 'react-redux'
import { api } from './../../../util/api'
import Cookies from 'js-cookie';
import {withRouter} from 'react-router'
import {browserHistory} from "react-router";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'

const login = () => {
    const useQuery= () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const [loginDetails, setLoginDetails] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoggedin, setLoginStatus] = useState(false);
    const handleChange = (event) => {
        const data = loginDetails;
        data[event.target.name] = event.target.value;
        setLoginDetails(data);
        //this.setState({ inputData: data });
    }

    useEffect(() => {
        if (Object.keys(errorMessages).length > 0) {
            if (typeof errorMessages.username == 'string') {
                setUsernameError(errorMessages.username);
            }
            if (typeof errorMessages.password == 'string') {
                setPasswordError(errorMessages.password);
            }
        }

       
    }, [usernameError, passwordError, errorMessages]);
    useEffect(()=>{
        if(Cookies.get('vj-authtoken')) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false) 
        }

        if(query.get('logout')) {
            setLoginStatus(false);
            Cookies.remove('vj-authtoken');
            window.location = "/login";
        }
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = {};
        response = await validateLoginForm(loginDetails);
        if (response === true) {
            const userDetails = api.post('http://localhost:1337/api/user/login', loginDetails).then(function (result) {
                Cookies.set('vj-authtoken', result.data.userDetails.token);
                setLoginStatus(true);
                ///browserHistory.push("/users");
                window.location = "/users";
            }).catch(function (error) {
                return <Redirect to='/login' />;
            });
        }
        setErrorMessages(response);
    }
    
    return !isLoggedin? (
        <div>
            <form onSubmit={(event) => { handleSubmit(event) }}>
                Username: <input type="text" name="username" onChange={(event) => { handleChange(event) }} /> {usernameError}
                    Password: <input type="password" name="password" onChange={(event) => { handleChange(event) }} /> {passwordError}
                <input type="submit" value="Login" />
            </form>
        </div>
    ) :(<Redirect to='/users' />)

}

export default withRouter(login);