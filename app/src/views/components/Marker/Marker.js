import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { HeartFill, Heart, ChatLeftDots } from 'react-bootstrap-icons';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Marker as MarkerIcon, Popup } from 'react-leaflet';

import L from 'leaflet';
import icon from '../../../assets/map/marker.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ROUTES from "../../../utils/routes";

let DefaultIcon = L.icon({
    iconUrl:      icon,
    shadowUrl:    iconShadow,
    iconSize:     [62, 62],
    iconAnchor:   [31, 52],
    shadowAnchor: [12, 40],
    popupAnchor:  [0, -45]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Marker({
  communityState: { openChatLoading, openChatError, openChatData } = {},
  user, updateLike, openChatRoom, appSocket, currentUser
}) {
  const history = useHistory();

  const long = user.location.coordinates[0]
  const lat = user.location.coordinates[1]
  const { name, avatar, currentSong, like, spotifyID } = user;

  const [songLike, setSongLike] = useState(like);

  function handleLike() {
    updateLike(currentSong, user.spotifyID);
    setSongLike(!songLike);
  }

  async function handleChat(){
    await openChatRoom(spotifyID);

    if (openChatData) {
      appSocket.emit('newChat', {sender: currentUser.name, receiver: spotifyID, room: openChatData._id})
      history.push(ROUTES.CHAT + openChatData._id);
    }
  }

  return (
    <MarkerIcon position={[lat, long]} >
        <Popup>
            <Row className="mb-2 user-row">
                <Col xs={1}>
                  <img
                      src={avatar}
                      className="avatar"
                      alt="user avatar"
                  />
                </Col>
                <Col xs={8} className="username-container">
                  <Link to={ROUTES.PROFILE + spotifyID}>{name}</Link>
                </Col>
                <Col xs={2}>
                  {openChatLoading ? (
                    <Spinner
                      size="sm"
                      animation="border"
                      variant="white"
                    />
                  ) : (
                    <ChatLeftDots
                      size={18}
                      className="chat-icon"
                      color="white"
                      onClick={handleChat}
                    />
                  )}
                </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <img
                    src={currentSong.image[0].url}
                    className="album-img"
                    alt="artist album"
                />
              </Col>
              <Col xs={7} className="ml-2">
                <div className="music-title">{currentSong.music}</div>
                <div className="artist-name">{currentSong.artist}</div>
              </Col>
              <Col xs={2}>
                {songLike ? (
                  <HeartFill
                    size={20}
                    color="crimson"
                    className="like-icon bounce-effect"
                    role="button"
                    onClick={handleLike}
                  />
                ):(
                  <Heart
                    size={20}
                    color="crimson"
                    className="like-icon bounce-effect"
                    role="button"
                    onClick={handleLike}
                  />
                )}
              </Col>
            </Row>
        </Popup>
    </MarkerIcon>
  );
}

export default Marker;