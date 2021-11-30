import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen';
import Header from './Components/Header';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import UserListScreen from './Screens/UserListScreen';
import MaterialsScreen from './Screens/MaterialsScreen';
import ShipmentScreen from './Screens/ShipmentScreen';
import CustomersScreen from './Screens/CustomersScreen';
import WarehouseCountingsScreen from './Screens/WarehouseCountingsScreen'
import CountryScreen from './Screens/CountryScreen';
import NonStandartWorksScreen from './Screens/NonStandartWorksScreen';
import OrderScreen from './Screens/OrderScreen';
import BonusScreen from './Screens/BonusScreen';
import ProductsScreen from './Screens/ProductsScreen';
import WeeklyWorkScheduleScreen from './Screens/WeeklyWorkScheduleScreen';
import SalesChannelsScreen from './Screens/SalesChannelsScreen';


function App() {
  return (
    <Router >
      <Header />
      <Container>
        <div className="App">

          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/userlist' component={UserListScreen} />
          <Route path='/materials' component={MaterialsScreen} />
          <Route path='/shipments' component={ShipmentScreen} />
          <Route path='/customers' component={CustomersScreen} />
          <Route path='/warehouse-countings' component={WarehouseCountingsScreen} />
          <Route path='/countries' component={CountryScreen} />
          <Route path='/non-standart-works' component={NonStandartWorksScreen} />
          <Route path='/orders' component={OrderScreen} />
          <Route path='/bonuses' component={BonusScreen} />
          <Route path='/products' component={ProductsScreen} />
          <Route path='/weeklyWorkScheduleScreen' component={WeeklyWorkScheduleScreen} />
          <Route path='/sales-channels' component={SalesChannelsScreen}/>
          <Route path='/' component={HomeScreen} exact />

        </div>
      </Container>
    </Router>
  );
}

export default App;
