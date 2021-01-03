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
            isLoaded: false,
            postTitle: '',
            modelBody: '',
            showModel: false,
            disableSubmit: true,
            errorMessage: {},
            allPosts: this.props.postData
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
        this.setState({ allPosts: this.props.postData })
    }

    
    //data = this.setPosts();
    render() {
        //this.props.getAllPosts();
        //this.setState({allPosts:this.props.postData});
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
                    <div>{loadingData(this.props)}</div>
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