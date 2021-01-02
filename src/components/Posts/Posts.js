import React,{Component} from 'react'
import {Row, Col} from 'react-bootstrap';
import PostGrid from './Post/PostGrid'
import AddPost from './Post/AddPost'
import ModelComponent from '../UI/ModalComponent/ModalComponent'
import {connect} from 'react-redux'
class Posts extends Component {
    constructor(props) {
        super(props);
        //this.disableSubmit=true;
        this.state = {
            loadedPost:null,
            posts:[],
            isLoaded:false,
            postTitle:'',
            modelBody:'',
            showModel: false,
            disableSubmit: true, 
            errorMessage:{}
        }
    }
    
    
    
    

    handleViewPost(postid){
        
        this.setState({selectedPost:postid, showModel:true});
    }

    

    handleModelClose() {
        this.setState({showModel:false,modelBody:null});
        window.logation='/post-list';
    }
    
    render() {
        let loadingData=(props)=>{
            if(props.currentPage === 'post-list') {
                return(
                    <PostGrid 
                    handleViewPost={this.handleViewPost.bind(this)} 
                    selectedPost={this.state.selectedPost} 
                    />      
                )
            }
            if(props.currentPage === 'addpost') {
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
                <ModelComponent title={this.state.postTitle} modelBody={this.state.modelBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel}/>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        postsCount:state.post.counter
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIncCounter:()=> dispatch({type:'INC_COUNT',data:[{username:'vinay'}]})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)