import React, {Component} from 'react'
import {Form, Alert} from 'react-bootstrap';
import {connect} from 'react-redux'
import {addNewPost} from './../../../actions/postActions'
class AddPost extends Component {
    /*constructor(props){
        super(props);
    }*/
    constructor(props) {
        super(props);
        this.disableSubmit = this.props.disableSubmit
        this.validationMessages = this.props.errorMessage
    }
    
    state={
        inputData:[],
        postValues:{status:1, title:'', description:''},
        count:0,
        errorMessage:{},
        disableSubmit: true,
    }
    validate(key, value, errorData) {
        let errors = errorData;
        var letters = /^[A-Za-z ]+$/;
        switch(key){
            case 'title':
                    if(!value) {
                        errors[key]="Title field is required";
                    } else if(value !=='' && !new RegExp(letters).test(value)) {
                            errors[key]="Title should contain only charactors and spaces"
                    } else {
                        delete errors[key];
                    }
                    break;
            case 'description':        
                    if(value === '') {
                        errors[key]="Description is required field";
                    
                    } else {
                        delete errors[key];
                    }
                    break;                    
            case 'status': 
                    if(parseInt(value)!==1) {
                        errors[key]="Default status should be active";
                    } else {
                        delete errors[key];
                    }
                    
                    break;
            default:
        }
        return errors;
    }
    async handleSubmit(event) {
        let errors = {};
        event.preventDefault();
        console.log(this.state.postValues);
        Object.keys(this.state.postValues).map((key, index)=>{
            let error = this.validate(key, this.state.postValues[key], this.state.errorMessage);
            if(typeof error[key] !== 'undefined') {
                errors[key]=error[key];
            }
            return null;
        });
        if(Object.keys(errors).length<=0) {
            this.setState({disableSubmit:false, errorMessage:errors});
        } else {
            this.setState({disableSubmit:true, errorMessage:errors});
        }
        if(!this.state.disableSubmit) {
            if(this.props.showLoading) {
                const body = 'Loading...';
                this.setState({showModel:true,modelBody:body,postTitle:"Add Post"});
            }
            await this.props.addPostAction(this.state.postValues);
            if(this.props.isPostAdded) {
                this.setState({showModel:true,modelBody:<div>POST ADDDED SUCCESSFULLY</div>,postTitle:"Add Post"});
            }
        }
    }

    validateFields(key, value) {
        let errors = this.validate(key, value, this.state.errorMessage);
        if(Object.keys(errors).length<=0) {
            this.setState({disableSubmit:false, errorMessage:errors});
        } else {
            this.setState({disableSubmit:true, errorMessage:errors});
        }
    }

    handleChange(event) {
        let data = this.state.postValues;
        data[event.target.name]=event.target.value;
        this.setState({postValues:data});
        this.validateFields(event.target.name, event.target.value);
    }

    render() {
        let title = ""
        let status = ""
        let description = "";
        if(typeof this.state.errorMessage !=="undefined") {
            if(this.state.errorMessage.title!==""){title=this.state.errorMessage.title}
            if(this.state.errorMessage.status!==""){status=this.state.errorMessage.title}
            if(this.state.errorMessage.description!==""){description=this.state.errorMessage.description}
        }

        let addFormContent = <Form method="POST" onSubmit={this.handleSubmit.bind(this) }>
        <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Post Title</Form.Label>
            <Form.Control name="title" onChange={this.handleChange.bind(this)} type="text" placeholder="Post title"/>
            <p style={{'color':'red'}}>
                {title}
            </p>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Status</Form.Label>
            <Form.Control name="status" as="select" onChange={this.handleChange.bind(this)}>
            <option>1</option>
            <option>0</option>
            </Form.Control>
            <p style={{'color':'red'}}>
               {status}
            </p>
        </Form.Group>
        <Form.Group  controlId="exampleForm.ControlTextarea1" onChange={this.handleChange.bind(this)}>
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" as="textarea" rows="3" />
            <p style={{'color':'red'}}>
               {description}
            </p>
        </Form.Group>
        <input variant="outline-success" className={'btn btn-success'}  type="submit" value="Submit" />
    </Form>;

        if(this.props.isPostAdded) {
            addFormContent = <Alert variant="success"><div>Post Added Successfully</div></Alert>
        }
        return (   
            <div>
                {addFormContent}
            </div>
        )
    }
}

let mapStateToProp = (state) => {
    return {
        isPostAdded: state.post.addPostSuccess,
        showLoading: state.post.showLoading
    }
}

let mapDispatchToProps=dispatch=> {
    return {
        addPostAction:(data)=>dispatch(addNewPost(data))
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(AddPost)