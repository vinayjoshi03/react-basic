import React, { useEffect, useState, Component } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { getSampleData } from '../../actions/sampleAction';
import { connect } from 'react-redux';
import NewComponent from './component'
class PostComponent extends Component {
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
    componentDidMount() {
        this.props.getAllSamplePosts();

    }
    render() {
        const showSampleposts = (allposts) => {
            let counter = 0;
            const rows = () => allposts.map((index, key) => {
                counter = counter + 1;
                return (
                    <>
                        <tr key={Math.random(10)}>
                            <td>{index.id}</td>
                            <td>{index.title}</td>
                        </tr>
                    </>
                )
            })
            return (
                (allposts != undefined && allposts.length > 0) ? <>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Post</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows()}
                        </tbody>
                    </table>
                </> : null
            )
        }

        return (
            <div>
                <NewComponent />
                {showSampleposts(this.props.sampleStates)}  
            </div>
        )
    }
}
const mapStatesToProps = (state) => {
    return {
        sampleStates: state.post.samplePosts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllSamplePosts: () => dispatch(getSampleData())
    }
}
export default connect(mapStatesToProps, mapDispatchToProps)(PostComponent);
