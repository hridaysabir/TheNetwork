import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import './App.css'
import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import MenuBar from './components/MenuBar'

//Use component in AuthRoute otherwise rendering a Route within a Route will be ignored

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/">
            <Home />
          </Route>
          <AuthRoute exact path="/login" Component={Login} />
          <AuthRoute exact path="/register" Component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  )
}
