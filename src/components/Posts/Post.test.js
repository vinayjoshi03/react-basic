import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Post from './Posts'
import AddPost from './Post/AddPost'

configure({adapter:new Adapter});

describe("<Post />",()=>{
    
    function setAddPostProps(){
        return Object.assign({},{
            currentPage:'addpost',
            errorMessage:{
                title:"test title",
                status:"test status",
                description:"test description"
            }
        });
    }
    
    it("Should load AddPost Component if page selected",()=>{
        const props = setAddPostProps();
        const wraper = shallow(<AddPost {...props} />);
        expect(props.currentPage).toEqual('addpost');
    })
})
