import React from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'

function likePost() {
  console.log('liked post')
}

function LikeButton(props) {
  const { likeCount } = props
  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button color="red" basic>
        <Icon name="heart" />
        Like
      </Button>
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  )
}

export default LikeButton
