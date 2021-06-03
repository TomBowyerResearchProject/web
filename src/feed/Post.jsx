import React from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import EmojiInput from '../shared/EmojiInput';
import getTimeAgoFromObject from '../utils/date';
import PostComment from './PostComment';

const Post = ({
  auth, data, likePost, unlikePost, commentPost,
}) => {
  let mainInformation = <>Default message</>;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${content.latitude},${content.longitude}&zoom=${content.zoom}&maptype=satellite`;
    mainInformation = (
      <iframe
        title={data.post.id}
        width="500"
        height="400"
        loading="lazy"
        src={imageSrc}
      />
    );
  }

  let button = <Button onClick={() => likePost(auth.token, data.post.id)} icon id="like-button"><Icon name="like" /></Button>;
  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth.token, data.post.id, likeArray[likeIndex].id)}
        id="unlike-button"
        icon
      >
        <Icon name="like" />
      </Button>
    );
  }

  return (
    <Segment>
      <Container>
        <Header as="h2" dividing>
          {data.post.username}
          <Header.Subheader id="post-subheader">
            <Icon name="like" />
            {data.likes ? data.likes.length : 0}
            &nbsp;
            <Icon name="clock" />
            {getTimeAgoFromObject(data.post.updated_at)}
          </Header.Subheader>
        </Header>
        <Container textAlign="center" id="main-post">
          {mainInformation}
        </Container>
      </Container>
      <Divider />
      <Container>
        <Grid columns={2} textAlign="center">
          <Grid.Column>
            {button}
          </Grid.Column>
          <Grid.Column>
            <EmojiInput
              header="Comment on post"
              type="comment"
              action={commentPost}
              token={auth.token}
              postID={data.post.id}
              subComponentID="emoji-comment-input"
              iconName="comment"
            />
          </Grid.Column>
        </Grid>
      </Container>
      <Divider />
      <Header as="h2">Comments</Header>
      {data.comments ? data.comments.map((comment) => (
        <PostComment key={comment.id} data={comment} />
      )) : null }
    </Segment>
  );
};

export default Post;
