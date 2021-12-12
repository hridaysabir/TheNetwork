import React from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'

function commentPost() {
  console.log('comment on post')
}

function CommentButton(props) {
  const { commentCount } = props
  return (
    <Button as="div" labelPosition="right" onClick={commentPost}>
      <Button color="teal" basic>
        <Icon name="comments" />
        Comment
      </Button>
      <Label basic color="teal" pointing="left">
        {commentCount}
      </Label>
    </Button>
  )
}

export default CommentButton
