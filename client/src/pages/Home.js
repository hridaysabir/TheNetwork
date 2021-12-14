import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PostCard from '../components/PostCard'
import { Grid } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'

import '../App.css'

function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data: { getPosts: posts = [] } = {} } =
    useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            )
          })
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export default Home
