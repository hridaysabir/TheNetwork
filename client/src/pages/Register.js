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

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    variables: {
      username: values,
    },
  })

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="Username"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="Email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="Password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  )
}

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

export default Register
