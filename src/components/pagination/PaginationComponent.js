import React, { Component } from 'react'
import { deletePost, fetchPosts } from './../../actions/postActions'
import { connect } from 'react-redux'
import { render } from '@testing-library/react';
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            disablePrevious: true,
            disableNext: false,
            pageLimit: 10,
            //totalPages: Math.ceil(this.props.totalPostsCount / 10)
        }
    }

    nextClickHandler() {
        
        const incrementCurrentPage = parseInt(this.state.currentPage + 1);
        if (this.state.currentPage < this.props.totalPostsCount-1) {
            this.setState({ currentPage: incrementCurrentPage });
            this.setState({ disableNext: false });
            this.setState({ disablePrevious: false });
        } else {
            this.setState({ disableNext: true });
            if (this.state.currentPage > this.props.totalPostsCount-1) {
                this.setState({ disablePrevious: false });
            }
        }

    }
    handlePrevious() {
        if (this.state.currentPage > 1 && this.state.currentPage<=this.props.totalPostsCount-1) {
            const decreasePage = parseInt(this.state.currentPage - 1);
            this.setState({ currentPage: decreasePage });
            this.setState({ disablePrevious: false });
            this.setState({ disableNext: false });
        }

        if(this.state.currentPage==1) {
            this.setState({ currentPage: 1 });
            this.setState({ disablePrevious: true });
            this.setState({ disableNext: false });
        }

    }

    handlePageChange(pageNumber) {
        if(pageNumber>0 && pageNumber<=this.props.totalPostsCount) {
            this.setState({currentPage:pageNumber});
        }
    }



    render() {
        this.totalpages = this.props.totalPostsCount;
        return (
            <div>
                <button onClick={() => this.handlePrevious()} disabled={this.state.disablePrevious}>Previous</button> 
                
                Current Page: {this.state.currentPage}
                <input onChange={(e)=>{this.handlePageChange(parseInt(e.target.value))}}type="text" /> 
                <button disabled={this.state.disableNext} onClick={() => this.nextClickHandler()}>Next</button> Total Pages: {this.totalpages}
            </div>
        )
    }
}




const mapPropsToState = (state) => {
    return {
        totalPostsCount: state.post.totalPostsCount,
        currentPage: state.post.currentPage
    }
}

export default connect(mapPropsToState, null)(Pagination);