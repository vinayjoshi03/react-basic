import React,{Component} from 'react'
import Post from '../../components/Posts/Posts'
import Axios from 'axios';
class PostContainer extends Component{
    state = {
        postsData:[],
        isLoaded:false,
        postResponse:[]
    }
    
    
    async addPostAction(data){
        
        await Axios.post('http://localhost:1337/api/posts/create',data).then(response=>{
            this.setState({postResponse:response});
        }).catch(function(err){
            console.log(err);
        });
        return this.state.postResponse;
    }

    validateInputs(){
        
    }

    render() {
        return (
            <Post 
            currentPage={this.props.currentPage}
            addPostAction={this.addPostAction.bind(this)}
            />
        )
    }
}

export default PostContainer;