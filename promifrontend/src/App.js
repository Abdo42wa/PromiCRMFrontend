import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import UserListScreen from './screens/UserListScreen';
import MaterialsScreen from './screens/ProductMaterialsScreen';
import ShipmentScreen from './screens/ShipmentScreen';
import CustomersScreen from './screens/CustomersScreen';
import WarehouseCountingsScreen from './screens/WarehouseCountingsScreen'
import CountryScreen from './screens/CountryScreen';
import OrderScreen from './screens/OrderScreen';
import BonusScreen from './screens/BonusScreen';
import ProductsScreen from './screens/ProductsScreen';
import WeeklyWorkScheduleScreen from './screens/WeeklyWorkScheduleScreen';
import SalesChannelsScreen from './screens/SalesChannelsScreen';
import MaterialsWarehouseScreen from './screens/MaterialsWarehouseScreen';
import OrderProducts from './screens/OrderProducts';
import RecentWorksScreen from './screens/RecentWorksScreen';
import ReportsScreen from './screens/ReportsScreen';


function App() {
  return (
    <Router >
      <Header />
      <Container>
        <div className="App">

          <Route path='/login' component={LoginScreen} />
          <Route path='/userlist' component={UserListScreen} />
          <Route path='/materials' component={MaterialsScreen} />
          <Route path='/shipments' component={ShipmentScreen} />
          <Route path='/customers' component={CustomersScreen} />
          <Route path='/countries' component={CountryScreen} />
          <Route path='/warehouse-countings' component={WarehouseCountingsScreen} />
          <Route path='/orders' component={OrderScreen} exact />
          <Route path='/bonuses' component={BonusScreen} />
          <Route path='/products' component={ProductsScreen} />
          <Route path='/orders/product/:id' component={OrderProducts} />
          <Route path='/weeklyWorkScheduleScreen' component={WeeklyWorkScheduleScreen} />
          <Route path='/sales-channels' component={SalesChannelsScreen} />
          <Route path='/materials-warehouse' component={MaterialsWarehouseScreen} />
          <Route path='/reports' component={ReportsScreen}/>
          {/* <Route path='/recent-works' component={RecentWorksScreen}/> */}
          <Route path='/' component={HomeScreen} exact />

        </div>
      </Container>
    </Router>
  );
}

export default App;
