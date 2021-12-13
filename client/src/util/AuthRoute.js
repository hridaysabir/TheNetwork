import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component }) {
  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <Route
      render={(props) =>
        // {...rest}
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
