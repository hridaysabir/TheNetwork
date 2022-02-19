import gql from 'graphql-tag'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function PostForm() {
  const [values, setValues] = React.useState({
    body: '',
  })
  const [errors] = React.useState({})

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      })
      values.body = ''
    },
    onError(err) {
      return err
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
      <Form onSubmit={onSubmit} error={errors ? true : false}>
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
      {error && (
        <div
          className="ui error message"
          style={{ marginBottom: 10, width: '60%' }}
        >
          <ul>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
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
