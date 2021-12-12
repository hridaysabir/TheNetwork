import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function Register() {
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
    update(proxy, result) {
      console.log(result)
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
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={onChangeUsername}
            name="username"
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={onChangeEmail}
            type="email"
            name="email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            onChange={onChangePassword}
            type="password"
            name="password"
          />
        </Form.Field>
        <Form.Field required>
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
    </div>
  )
}

export default Register
