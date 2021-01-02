import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import ModelComponent from '../../UI/ModalComponent/ModalComponent'
import AddPost from '../Post/AddPost'
import { fetchPosts, getPostDetailsByPost } from './../../../actions/postActions'
import { connect } from 'react-redux'

class PostGrid extends Component {
    state = {
        loadedPost: null,
        showModel: false,
        selectedPostBody: null,
        postTitle: "Post Details",
        selectedDeletePost: null,

    }

    handleDelete = (postid) => {
        //console.log("Posts", this.props.postsData);
        let myArray = this.props.postsData.filter(function (obj) {
            return obj.id !== postid;
        });
        this.props.selectedPost = myArray;
        this.setState({ postTitle: "Delete", showModel: true, selectedPostBody: "Do you want to delete post?" })
    }

    handleModelClose() {
        this.setState({ showModel: false });
        //window.location = "/post-list";
    }

    async viewPostDetailsHandler(selectedPost) {
        /*Axios.get('http://localhost:1337/api/posts/'+selectedPost).then(response=>{
            this.setState({loadedPost:response.data, selectedPostBody:response.data.data.description, showModel:true});
        });*/
        await this.props.getPostDetails(selectedPost);
        if(this.props.singlePostData){
            this.setState({loadedPost:this.props.singlePostData, selectedPostBody:this.props.singlePostData.description, showModel:true});
        } else {
            this.setState({loadedPost:this.props.singlePostData, selectedPostBody:this.props.singlePostData.description, showModel:true});
        } 
        
    }

    createNewPost(event) {
        this.setState({ selectedPostBody: <div><AddPost /></div>, showModel: true });
    }

    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        let PostData = this.props.postData.map((post, key) => {
            return (
                <tr key={post.id + "id"}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                        <Button
                            onClick={() => this.viewPostDetailsHandler(post.id)}
                            variant="outline-success"
                            size="sm">View</Button>
                        <Button
                            onClick={() => this.handleDelete(post.id)}
                            variant="outline-danger"
                            size="sm">Delete</Button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div onClick={() => this.createNewPost()}>Create New Post</div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PostData}
                    </tbody>
                </Table>
                <ModelComponent title={this.state.postTitle} modelBody={this.state.selectedPostBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel} />
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
        postData: state.post.posts,
        isPostAdded: state.post.addPostSuccess,
        showLoading: state.post.showLoading,
        singlePostData: state.post.selectedPostData

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => {
            dispatch(fetchPosts('data'))
        },
        getPostDetails: (postID) => {
            return dispatch(getPostDetailsByPost(postID))
        }
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(PostGrid);