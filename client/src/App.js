import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import MenuBar from './components/MenuBar'

export default function App() {
  return (
    <Router>
      <Container>
      <MenuBar />
      <Route exact path='/'>
       <Home />
      </Route>
      <Route exact path='/login'>
       <Login />
      </Route>
      <Route exact path='/register'>
       <Register />
      </Route>
      </Container>
    </Router>
  );
}

