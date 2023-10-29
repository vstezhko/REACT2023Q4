import { Component } from 'react';
import Main from './pages/Main';

class App extends Component {
  render() {
    return (
      <div className="background">
        <div className="main wrapper">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
