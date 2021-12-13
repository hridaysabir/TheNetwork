import React, { useContext } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function Register(props) {
  const context = useContext(AuthContext)
  const history = useHistory()
  const [errors, setErrors] = React.useState({})
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        createdAt
        token
      }
    }
  `

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
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

  const onChangeEmail = (event) => {
    setValues({ ...values, email: event.target.value })
  }

  const onChangeConfirmPassword = (event) => {
    setValues({ ...values, confirmPassword: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    addUser()
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        className={loading ? 'loading' : ''}
        error={Object.keys(errors).length > 0}
      >
        <Form.Field required error={errors.username ? true : false}>
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={onChangeUsername}
            name="username"
          />
        </Form.Field>
        <Form.Field required error={errors.email ? true : false}>
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={onChangeEmail}
            type="email"
            name="email"
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
        <Form.Field required error={errors.confirmPassword ? true : false}>
          <label>Confirm Password</label>
          <input
            placeholder="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={onChangeConfirmPassword}
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

export default Register
