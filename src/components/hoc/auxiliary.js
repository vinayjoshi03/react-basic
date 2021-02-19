import React, { Component } from 'react'
import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';
import Layout from './../Layout/Layout'

class Aux extends Component {
    componentDidMount() {
        const loginToken = Cookies.get("vj-authtoken")
        console.log("Cookie value==>", loginToken);
    }
    render() {
        return (
            <Container border="primary">
                <Layout>
                    
                    {this.props.children}
                </Layout>
            </Container>
        );
    }
}

export default Aux