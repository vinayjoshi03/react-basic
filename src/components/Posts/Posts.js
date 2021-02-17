import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import PostGrid from './Post/PostGrid'
import AddPost from './Post/AddPost'
import ModelComponent from '../UI/ModalComponent/ModalComponent'
import { deletePost, fetchPosts } from './../../actions/postActions'
import { connect } from 'react-redux'
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPost: null,
            posts: [],
            postTitle: '',
            modelBody: '',
            showModel: false,
            disableSubmit: true,
            errorMessage: {},
            allPosts: this.props.postData,
            isLoading: true
        }
    }

    
    handleViewPost(postid) {
        this.setState({ selectedPost: postid, showModel: true });
    }
    handleModelClose() {
        this.setState({ showModel: false, modelBody: null });
        window.logation = '/post-list';
    }
    handleDeletePost = (postid) => {
        //this.setState({ postTitle: "Delete", showModel: true, selectedPostBody: "Do you want to delete post?", selectedDeletePost: myArray});
        this.props.deletePostData({ id: postid });
        this.props.getAllPosts();
        this.setState({ allPosts: this.props.postData });
    }
    componentDidMount() {
        this.props.getAllPosts();
        const { postData } = this.props;
        if(this.props.showLoading === false) {
            this.setState({ isLoading:false });
        }
        this.setState({ allPosts: postData, isLoading:false });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Show loading--->", this.props.showLoading);
        if(this.props.showLoading === false && prevState.isLoading) {
            this.setState({isLoading: false});
        }
    }

    
    //data = this.setPosts();
    render() {
        console.log(this.state);
        
        let isloading = this.state.isLoading;
        console.log("isloading===>", isloading);
        let loadingData = (props) => {
            
            if (props.currentPage === 'post-list') {
                return (
                    
                    <PostGrid
                        selectedPost={this.state.selectedPost}
                        handleDeletePost={this.handleDeletePost}
                        allPosts={this.props.postData}
                    />
                )
            } 
            if (props.currentPage === 'addpost') {
                return (
                    <div>
                        <AddPost
                            //handleSubmit={this.handleSubmit.bind(this)}
                            disableSubmit={this.state.disableSubmit}
                            validateFields={this.validateFields.bind(this)}
                            errorMessage={this.state.errorMessage}
                        />
                    </div>
                )
            }
        }
        return (
            <Row>
                <Col>
                    <h1>Posts</h1>

                    {isloading? <div>Loading....</div> : <div>{loadingData(this.props)}</div> }
                </Col>
                <ModelComponent title={this.state.postTitle} modelBody={this.state.modelBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel} />
            </Row>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        postsCount: state.post.counter,
        postData: state.post.posts,
        showLoading: state.post.showLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncCounter: () => dispatch({ type: 'INC_COUNT', data: [{ username: 'vinay' }] }),
        deletePostData: (deletePostData) => {
            dispatch(deletePost(deletePostData))
        },
        getAllPosts: () => {
            dispatch(fetchPosts())
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)