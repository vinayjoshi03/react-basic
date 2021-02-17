import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Header from './components/Layout/Header'
import User from './components/User/User'
import PostContainer from './containers/Post/postsContainer'
import Layout from './components/Layout/Layout'
//import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLogin from './containers/User/UserLogin'
import ReactHooks from './containers/ReactHooks'
import TestComponent from './containers/test'
import ErrorBoundry from './components/UI/ErrorBoundry/ErrorBoundaryComponent'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
const App = () => {

  const [isLoggedin, setLogin] = useState(true);
  
  useEffect(() => {
    
    if (Cookies.get("vj-authtoken")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    
  }, [isLoggedin]);
  return (
    <Container border="primary">
      <Router>
        <Layout>
          <Header />
          <Switch>
            <Route exact path="/">
              {!isLoggedin ? <Redirect to="/login" /> : <User />}
            </Route>
            <Route path="/post-list">
              <ErrorBoundry>{!isLoggedin ? <Redirect to="/login" /> : <PostContainer currentPage="post-list" />}</ErrorBoundry>
            </Route>
            <Route path="/users">
              <ErrorBoundry>{!isLoggedin ? <Redirect to="/login" /> : <User />}</ErrorBoundry>
            </Route>
            <Route path="/login">
              <ErrorBoundry><UserLogin /></ErrorBoundry>
            </Route>
            <Route path="/login:logout">
              <ErrorBoundry><UserLogin /></ErrorBoundry>
            </Route>
            <Route path="/hooks">
              <ErrorBoundry>{!isLoggedin ? <Redirect to="/login" /> : <ReactHooks />} </ErrorBoundry>
            </Route>
            <Route path="/testcode">
              <ErrorBoundry>{!isLoggedin ? <Redirect to="/login" /> : <TestComponent />} </ErrorBoundry>
            </Route>
          </Switch>

        </Layout>
      </Router>
    </Container>
  );
}
export default App;
//xport default connect(null, connectDispatchToProps)(App);
