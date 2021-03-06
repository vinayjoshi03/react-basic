import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { Row, Col, Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

class Header extends Component {
    //static contextType = ThemeContext;
    render() {
        const menues = () => {
            if (Cookies.get("vj-authtoken") != undefined) {
                return (
                    <>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/post-list">Posts</Nav.Link>
                        <Nav.Link as={Link} to="/hooks">Hooks</Nav.Link>
                        <Nav.Link as={Link} to="/testcode">Test Code</Nav.Link>
                        <Nav.Link as={Link} to="/login?logout=true">Logout</Nav.Link>
                    </>
                );
            } else {
                return (
                    <>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/useCallback">Use Callback example</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </>
                );

            }
        }

        return (
            <Row>
                <Col>

                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">My Blog</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {menues()}
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        )
    }
}

export default Header
