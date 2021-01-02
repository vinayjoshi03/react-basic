import React,{Component} from 'react'
import { Alert } from 'react-bootstrap'

class ErrorBoundaryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
   this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }
  
  render() {
    if (this.state.errorInfo) {
        console.log(this.state.error);
      return (
        <div>
        <Alert variant="danger">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          </Alert>
        </div>
      );
    }
    // Render children if there's no error
    return this.props.children;
  }  
}
export default ErrorBoundaryComponent;