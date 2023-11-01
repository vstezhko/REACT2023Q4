import { Component } from 'react';
import Main from './pages/Main';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="background">
        <ErrorBoundary
          fallback={<p className="fallback">Something went wrong</p>}
        >
          <Main />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
