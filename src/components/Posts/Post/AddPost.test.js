import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import AddPost from './AddPost'
import {Form} from 'react-bootstrap';
configure({adapter: new Adapter()});

function getFormProps(){
    return Object.assign({},{
        errorMessage:{
            title:"test title",
            status:"test status",
            description:"test description"
        }
    })
}
const props = getFormProps();
describe("<AddPost />", ()=>{
    it("It should render Form", ()=>{
        const wrapper = shallow(<AddPost {...props}/>);
        expect(wrapper.find(Form)).toHaveLength(1);
        
    }); 
})