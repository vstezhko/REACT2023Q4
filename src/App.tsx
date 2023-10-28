import { Component } from 'react';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="background">
        <div className="main wrapper">
          <Header />
        </div>
      </div>
    );
  }
}

export default App;
