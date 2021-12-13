import React, { useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function Login() {
  const context = useContext(AuthContext)
  const history = useHistory()
  const [errors, setErrors] = React.useState({})
  const [values, setValues] = React.useState({
    username: '',
    password: '',
  })

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
      }
    }
  `

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      history.push('/')
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values,
  })

  const onChangeUsername = (event) => {
    setValues({ ...values, username: event.target.value })
  }

  const onChangePassword = (event) => {
    setValues({ ...values, password: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <Form.Field required error={errors.username ? true : false}>
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={onChangeUsername}
            name="username"
          />
        </Form.Field>
        <Form.Field required error={errors.password ? true : false}>
          <label>Password</label>
          <input
            placeholder="Password"
            onChange={onChangePassword}
            type="password"
            name="password"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className=".ui.error.message">
          <ul className="list">
            {Object.values(errors).map((value) => {
              return <li key={value}>{value}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Login
