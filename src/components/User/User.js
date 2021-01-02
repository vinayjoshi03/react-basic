import React,{Component} from 'react'

import {Row, Col} from 'react-bootstrap';
import UserGrid from './UserDetails/UserGrid'
class User extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <h1>Usres</h1>
                    <UserGrid />
                </Col>
            </Row>
        )
    }
}
export default User