import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/register', '/events']; // Hide on specified routes

  return (
    <>
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/events" component={Events} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/create-event" component={CreateEvent} />
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
