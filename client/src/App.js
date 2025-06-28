import React from 'react';
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

import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register', '/events'];

  return (
    <>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
        <Route exact path="/user-dashboard" component={UserDashboard} />
        <Route exact path="/events" component={Events} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/edit-events/:id" component={EditEventPage} />
 {/* New Route */}
         
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
