import React,{Component} from 'react'
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux'
//import * as bs from 'bootstrap/dist/css/bootstrap.css';
//import * as bst from 'bootstrap/dist/css/bootstrap-theme.css';
class UserGrid extends Component {
    state = {
        users:[],
        isLoaded:false
    }
    
    render() {
        let UserData = Object.keys(this.props.userDetails).map((user,key)=> {
            return (
                <tr key={this.props.userDetails[user].id+"id"}>
                    <td>{this.props.userDetails[user].name}<p onClick={this.props.addUsers}>Add User</p></td>
                    <td>{this.props.userDetails[user].username}</td>
                    <td>{this.props.userDetails[user].email}</td>
                    <td>{this.props.userDetails[user].phone}</td>
                    <td>{this.props.userDetails[user].address.city}</td>
                </tr>
            )
        });
        if(!this.props.isLoaded) {
            UserData = (
            <tr>
                <td>Loading...</td>
            </tr> 
            )
        }
        return (
            
            <Table striped bordered hover className={'asfsfsd'}>
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
                {UserData}
              </tbody>
            </Table>  
            
        );
    }
}

const mapStatesToProps = (state) =>{
    return {
        userDetails:state.user.users,
        isLoaded:state.user.isLoaded
    }
}

/*const connectDispatchToProps=dispatch=>{
    return {
        addUsers:data=>dispatch(data)
    }
}*/
export default connect(mapStatesToProps)(UserGrid)