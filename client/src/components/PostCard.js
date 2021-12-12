import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />

        <Card.Header>{username}</Card.Header>

        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>

        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton likeCount={likeCount} />
        <CommentButton commentCount={commentCount} />
      </Card.Content>
    </Card>
  )
}

export default PostCard
