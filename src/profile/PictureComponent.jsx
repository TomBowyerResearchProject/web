import axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  Grid, Image, Message, Segment,
} from 'semantic-ui-react';
import defaultPictures from '../constants/DefaultPictures';
import createProfileLink from '../utils/createProfileLink';
import { extractErrorObject } from '../utils/extractObjects';
import randomKey from '../utils/randomKey';
import srcToFile from '../utils/SrcToFile';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_MEDIA_UPLOAD_BASE_URL;

export const PictureComponent = ({ auth }) => {
  const [error, setError] = React.useState(null);
  const [newFile, SetNewFile] = React.useState([]);
  const [emojiSelected, setEmojiSelection] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const errorMessage = error !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        {error}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

  const fileChange = (event) => {
    SetNewFile(event.target.files[0]);
  };

  const profileSelections = (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      {defaultPictures.map((picture) => (
        <Button
          className={picture === emojiSelected ? 'emoji-profile-selected' : 'emoji-profile-selection'}
          key={randomKey()}
          aria-label="default emoji profile picture"
          alt-text={`default emoji profile picture ${picture}`}
          onClick={() => setEmojiSelection(picture)}
        >
          <Image
            src={`/assets/${picture}`}
            aria-label="default emoji profile picture"
            alt-text={`default emoji profile picture ${picture}`}
          />
        </Button>
      ))}
    </div>
  );

  const onFormSubmit = () => {
    setLoading(true);
    const url = `${host}://${base}/user_profile`;
    const formData = new FormData();
    formData.append('image', newFile);
    axios.post(
      url,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      },
    ).then(() => {
      setError(null);
      window.location.reload(false);
    }).catch((err) => {
      setLoading(false);
      setError(extractErrorObject(err).message);
    });
  };

  const setProfileFromEmoji = (e) => {
    e.preventDefault();

    if (emojiSelected == null) {
      return;
    }

    setLoading(true);

    const fileLocation = `../assets/${emojiSelected}`;

    srcToFile(fileLocation, emojiSelected, 'image/png')
      .then((file) => {
        const url = `${host}://${base}/user_profile`;
        const formData = new FormData();
        formData.append('image', file);
        axios.post(
          url,
          formData,
          {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        ).then(() => {
          setError(null);
          window.location.reload(false);
        }).catch((err) => {
          setLoading(false);
          setError(extractErrorObject(err).message);
        });
      });
  };

  return (
    <Segment loading={loading}>
      {errorMessage}
      <h2>
        Profile Picture
      </h2>
      <Grid columns={2} textAlign="center">
        <Grid.Column>
          <h3>Current</h3>
          <Image
            src={createProfileLink(auth.username)}
            size="medium"
            className="profile-display"
            aria-label="Current profile picture"
            alt-text="Current profile picture"
          />
        </Grid.Column>
        <Grid.Column>
          <h3>New Picture</h3>
          <Grid divided="vertically">
            <Grid.Row>
              <h4>Select a new one</h4>
              {profileSelections}
              <Button onClick={(e) => setProfileFromEmoji(e)} className="profile-confirm">Confirm</Button>
            </Grid.Row>
            <Grid.Row>
              <h4>Upload a picture instead</h4>
              <Form onSubmit={onFormSubmit} className="profile-upload-form">
                <Form.Field>
                  <Button as="label" htmlFor="file" type="button" className="profile-upload-button" aria-label="upload profile picture">
                    Select a new profile picture
                  </Button>
                  <input type="file" id="file" hidden onChange={fileChange} />
                </Form.Field>
                <Button type="submit" className="profile-confirm">Confirm</Button>
              </Form>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default PictureComponent;
