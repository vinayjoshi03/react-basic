import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import ModelComponent from '../../UI/ModalComponent/ModalComponent'
import Pagination from '../../pagination/PaginationComponent'
import AddPost from '../Post/AddPost'
import { fetchPosts, getPostDetailsByPost, deletePost } from './../../../actions/postActions'
import { connect } from 'react-redux'

class PostGrid extends Component {

    constructor(props) {
    super(props);
    this.state = {

        loadedPost: null,
        showModel: false,
        selectedPostBody: null,
        postTitle: "Post Details",
        selectedDeletePost: {},
        allPosts: {},
        postHtml: null,
        totalPostsCount: 0,
        currentPage: 0
    };
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
        if (this.props.singlePostData) {
            this.setState({ loadedPost: this.props.singlePostData, selectedPostBody: this.props.singlePostData.description, showModel: true });
        } else {
            this.setState({ loadedPost: this.props.singlePostData, selectedPostBody: this.props.singlePostData.description, showModel: true });
        }

    }

    componentDidMount() {
        //console.log("componentDidMount props--->", props);
        //this.setState({totalPostCount: this.props.totalPostCount});
    }
    handleDelete(postid) {
        this.props.handleDeletePost(postid);
    }
    createNewPost(event) {
        this.setState({ selectedPostBody: <div><AddPost /></div>, showModel: true });
    }

    

    render() {
        let totalPages = Math.ceil(this.props.totalPostsCount / 5);
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
        this.totalPostsCount = this.props.totalPostsCount;
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

                <ReactPaginate onPageChange={this.props.getPagePost} containerClassName="paginationContainer" pageCount={totalPages} pageRangeDisplayed={2} marginPagesDisplayed="2"></ReactPaginate>
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
        singlePostData: state.post.selectedPostData,
        totalPostsCount: state.post.totalPostsCount
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getPostDetails: (postID) => {
            return dispatch(getPostDetailsByPost(postID))
        }, getPagePost: ({ selected: selectedPage}) => {
            dispatch(fetchPosts(selectedPage));
        },
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(PostGrid);