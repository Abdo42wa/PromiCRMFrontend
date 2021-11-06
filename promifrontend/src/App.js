import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <Router >
      <div className="App">
        navbar

        <Route path='/' component={HomeScreen} exact />

      </div>
    </Router >
  );
}

export default App;
