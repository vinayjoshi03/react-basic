import React,{Component} from 'react'

class Paginate extends Component {

    constructor(props){
        super(props);
        this.pageCount=props.pageCount;
    }


render(){
    return (
    <div>Page count {this.pageCount} Pagination data here {this.props.totalPostsCount}</div>
    )
}

}

export default Paginate