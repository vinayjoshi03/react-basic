import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import {validateLoginForm} from '../../../util/validations'
import {connect} from 'react-redux'

class UserLogin extends Component {
    state = {
        inputData: {username: "",password: ""},
        errorMessages:{}
    }
    handleChange (event) {
        let data=this.state.inputData;
        data[event.target.name]=event.target.value;
        this.setState({inputData:data});
    }

    async handleSubmit(event){
        event.preventDefault();
        let response={};
        response = await validateLoginForm(this.state.inputData);
        if(response===true) {

        }
        this.setState({errorMessages:response});
    }

    render() {
        console.log("component----->");
        let userNameError = '';
        let passwordError = '';
        if(Object.keys(this.state.errorMessages).length>0) {
            if(typeof this.state.errorMessages.username=='string') {
                userNameError = this.state.errorMessages.username;
            }
            if(typeof this.state.errorMessages.password=='string') {
                passwordError = this.state.errorMessages.password;
            }
        }
        return (
            <div>
                <Form method="POST" onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" onChange={this.handleChange.bind(this)} type="text" placeholder="Username" />
                        <p style={{ 'color': 'red' }}>{userNameError}</p>
                    </Form.Group>
                    
                    <Form.Group controlId="exampleForm.ControlTextarea1" onChange={this.handleChange.bind(this)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" row="3"/>
                        <p style={{ 'color': 'red' }}>
                         {passwordError}
                        </p>
                    </Form.Group>
                    <input variant="outline-success" className={'btn btn-success'} type="submit" value="Submit" />
                </Form>
            </div>
        )
    }
}

export default UserLogin;