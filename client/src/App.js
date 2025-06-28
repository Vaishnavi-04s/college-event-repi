import React from 'react';
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import CreateEvent from './pages/CreateEvent';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import EditEventPage from './components/EditEventPage';  // Import this!
import EditEventFormPage from './components/EditEventFormPage';

// import Navbar from './components/Navbar'; // Optional

=======
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
<<<<<<< HEAD
  const hideNavbarRoutes = ['/', '/login', '/register', '/events'];
=======
  const hideNavbarRoutes = ['/', '/login', '/register', '/events']; // Hide on specified routes
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587

  return (
    <>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}
<<<<<<< HEAD

=======
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
<<<<<<< HEAD
        <Route exact path="/user-dashboard" component={UserDashboard} />
        <Route exact path="/events" component={Events} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/edit-events/:id" component={EditEventPage} />
 {/* New Route */}
         
=======
        <Route path="/events" component={Events} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/user-dashboard" component={UserDashboard} />
        <Route path="/admin-dashboard/edit/:id" component={AdminDashboard} />

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      </Switch>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
