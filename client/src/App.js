import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import PrivateRoute from './components/other/PrivateRoute';

import './App.css';
import './bootstrap.css';

import Navbar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';
import Landing from '../src/components/layout/Landing';
import Register from './components/register/Register';
import Login from './components/register/Login';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddCar from './components/cars/AddCar';
import EditCar from './components/cars/EditCar';
import Cars from './components/cars/Cars';
import Profile from './components/profile/Profile';
import { clearProfile } from './actions/profileActions';
import PostRegister from './components/layout/PostRegister';
import SingleCar from './components/cars/SingleCar';
import SingleProfile from './components/profile/SingleProfile';
import UserCars from './components/cars/UserCars';
import MyCars from './components/cars/MyCars';
import About from './components/layout/About';
import AddPictures from './components/pictures/AddPictures';
import Pictures from './components/pictures/Pictures';
import EditPictures from './components/pictures/EditPictures';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //expiring token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    //login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/cars' component={Cars}></Route>
            <Route exact path='/post-register' component={PostRegister}></Route>
            <Switch>
              <PrivateRoute exact path='/car/:id' component={SingleCar}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile/:username' component={SingleProfile}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/create/profile' component={CreateProfile}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/edit/profile' component={EditProfile}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add/car' component={AddCar}></PrivateRoute>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/edit/car/:id' component={EditCar}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/profile' component={Profile}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/cars/user/:id' component={UserCars}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/cars/my-cars' component={MyCars}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add/pictures/car/:id' component={AddPictures}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/edit/pictures/:id/:car_id' component={EditPictures}></PrivateRoute>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/pictures/car/:id' component={Pictures}></PrivateRoute>
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
