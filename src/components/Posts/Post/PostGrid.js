import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import ModelComponent from '../../UI/ModalComponent/ModalComponent'
import AddPost from '../Post/AddPost'
import { fetchPosts, getPostDetailsByPost, deletePost } from './../../../actions/postActions'
import { connect } from 'react-redux'

class PostGrid extends Component {


    state = {
        loadedPost: null,
        showModel: false,
        selectedPostBody: null,
        postTitle: "Post Details",
        selectedDeletePost: {},
        allPosts: {},
        postHtml: null
    };



    handleModelClose() {

        this.setState({ showModel: false });
        //window.location = "/post-list";
    }

    async viewPostDetailsHandler(selectedPost) {
        /*Axios.get('http://localhost:1337/api/posts/'+selectedPost).then(response=>{
            this.setState({loadedPost:response.data, selectedPostBody:response.data.data.description, showModel:true});
        });*/
        await this.props.getPostDetails(selectedPost);
        if (this.props.singlePostData) {
            this.setState({ loadedPost: this.props.singlePostData, selectedPostBody: this.props.singlePostData.description, showModel: true });
        } else {
            this.setState({ loadedPost: this.props.singlePostData, selectedPostBody: this.props.singlePostData.description, showModel: true });
        }

    }

    handleDelete(postid) {
        this.props.handleDeletePost(postid);
    }
    createNewPost(event) {
        this.setState({ selectedPostBody: <div><AddPost /></div>, showModel: true });
    }



    render() {
        let PostDataList = this.props.allPosts.map((post, key) => {
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
            );
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
                        {PostDataList}
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
        getPostDetails: (postID) => {
            return dispatch(getPostDetailsByPost(postID))
        }
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(PostGrid);