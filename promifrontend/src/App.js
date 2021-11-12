import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UserListScreen from './Screens/UserListScreen';

function App() {
  return (
    <Router >
      <Header />
      <Container>
        <div className="App">


          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/user-list' component={UserListScreen}/>

        </div>
      </Container>
    </Router>
  );
}

export default App;
