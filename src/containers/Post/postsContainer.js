import React, { useEffect, useState } from 'react'
import { getAllPosts, getPostDetailsByPost, deleteSinglePost } from './../../actions/postActions'
import * as actionTypes from './../../actions/types';
import postReducer from './../../store/postReducer'
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';


//import Pagination from '../../pagination/PaginationComponent'
const posts = () => {
    const [allPosts, setAllPosts] = useState([]);
    //const dispatch = useDispatch();
    const initialState = useSelector(state => state);
    const [isLoading, setLoading] = useState(initialState.common.showLoading);
    const [totalPages, setTotalPages] = useState();
    const showLoading = initialState.common.showLoading;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actionTypes.SHOW_LOADING, payload: { showLoading: true } });
        const response = getAllPosts().then(function (result) {
            initialState.post.posts = result.data;
            dispatch({ type: actionTypes.VIEW_ALL, payload: { posts: result.data, totalPostCount: result.totalPostCount } });
            dispatch({ type: actionTypes.SHOW_LOADING, payload: { showLoading: false } });
            setTotalPages(Math.ceil(result.totalPostCount / 10));
            setAllPosts(result.data);
        });
    }, []);

    useEffect(() => {
        setAllPosts(initialState.post.posts);        
    }, [allPosts]);


    const handleDeletePost = (postid) => {
        setLoading(true);
        deleteSinglePost({ id: postid }).then(function (result) {
            dispatch({ type: actionTypes.DELETE_POST, payload: { data: result.data.data } });
            const newPosts = initialState.post.posts.filter((data) => {
                return data.id !== initialState.post.posts.id;
            });
            setAllPosts(newPosts);
            setTotalPages(Math.ceil(result.data.data.totalPostCount / 10));
        }).catch(function (err) {
            alert(err);
        });
        setLoading(false);
    }
    const showPosts = () => {
        const rows = allPosts.map((post, key) => {
            return (
                <tr key={post.id + "id"}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                        <Button

                            variant="outline-success"
                            size="sm">View</Button>
                        <Button
                            onClick={() => handleDeletePost(post.id)}
                            variant="outline-danger"
                            size="sm">Delete</Button>
                    </td>
                </tr>
            )
        });
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        //const offset = selectedPage * this.state.perPage;
        setLoading(true);
        const response = getAllPosts(selectedPage).then(function (result) {
            initialState.post.posts = result.data;
            dispatch({ type: "VIEW_ALL", payload: { posts: result.data, totalPostCount: result.totalPostCount } });
            setAllPosts(result.data);
            setTotalPages(Math.ceil(result.totalPostCount / 10));
            setLoading(false);
        });
        return;
    };
    return (
        <div>
            <div>
                Posts
                {!showLoading? showPosts():""}
                <ReactPaginate onPageChange={(e) => { handlePageClick(e) }} containerClassName="paginationContainer" pageCount={totalPages}></ReactPaginate>
            </div>
        </div>
    )
}

export default posts;