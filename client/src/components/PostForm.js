import gql from 'graphql-tag'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

function PostForm() {
  const [values, setValues] = React.useState({
    body: '',
  })

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result)
      values.body = ''
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    createPost()
  }

  const onChangeBody = (event) => {
    setValues({ ...values, body: event.target.value })
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input
            placeholder="Body"
            onChange={onChangeBody}
            name="body"
            value={values.body}
          />
        </Form.Field>
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
    </div>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export default PostForm
