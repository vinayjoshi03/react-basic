import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import {validateLoginForm} from '../../../util/validations'
import {connect} from 'react-redux'

class UserLogin extends Component {
    state = {
        inputData: {username: "",password: ""},
        errorMessages:{},
        inputChange:{value1:0,value2:0},
        total:null
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

    handleTextChange = (event)=>{
        let data=this.state.inputChange;
        data[event.target.name]=event.target.value;
        this.setState({inputChange:data});
        let total = parseInt(this.state.inputChange.value1)+parseInt(this.state.inputChange.value2);
        this.setState({total:total})
    }

    render() {
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
        let testFilterWithObj = [{
            username: "vinay",
            id:20,
            amount:50
        },{
            username: "rahul",
            id:20,
            amount:200
        }];
        let filterTest = testFilterWithObj.filter(values=>{
            if(values.amount>50) return values;
        });
        console.log("FilterData==>", filterTest);
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

                <div>
                    Value1: <input type="text" name="value1" onChange={this.handleTextChange.bind(this)} />
                    Value2: <input type="text" name="value2" onChange={this.handleTextChange.bind(this)} />

                    <div>Pasted here== {this.state.total} </div>

                </div>
            </div>
        )
    }
}

export default UserLogin;