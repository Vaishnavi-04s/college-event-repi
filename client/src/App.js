import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; 
import AdminDashboard from './pages/AdminDashboard';
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />      {/* 👈 This makes Home page default */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* ... other routes like /events */}
      </Switch>
    </Router>
  );
}


export default App;