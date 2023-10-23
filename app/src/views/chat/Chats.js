import { Redirect, Link } from "react-router-dom";
import { useEffect } from "react";
import useUpdateLocation from "../../hooks/useUpdateLocation"

import { ChatLeftDotsFill, EmojiFrownFill } from "react-bootstrap-icons"
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import Header from "../components/Header/Header";

import "./Chats.scss"
import ROUTES from "../../utils/routes";

function ChatsView({
  currentUserState: { isAuthenticated } = {},
  communityState: { chatsLoading, chatsError, chats } = {},
  getChats, updateUserLocation
}) {

  useUpdateLocation(updateUserLocation);

  useEffect(() => {
    getChats();
  }, [getChats]);

  // Redirect if not logged
  if (!isAuthenticated) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <>
      <Header title="Join Chat" back={ROUTES.DASHBOARD} />
      <Container fluid>
          { chatsLoading &&
            <Row className="songpair-load">
              <Col xs={12}><h2>Songpair</h2></Col>
              <Spinner animation="border" variant="primary" />
            </Row>
          }
          {
            !chatsLoading && chats &&
            <div className="chat py-3">
              <Row className="header">
                <Col xs={12} className="text-center">
                  <span>Select a Chat Room</span>
                </Col>
              </Row>
              <Row className="menu fade-in">
                {chats.map( (chat) =>
                  <Col xs={12} className="mt-4">
                    <Row className="chat-row">
                      <Col xs={4} className="avatar">
                        <Link to={ROUTES.PROFILE + chat.user.spotifyID}>
                          <img src={chat.user.avatar} alt="user avatar" />
                        </Link>
                      </Col>
                      <Col xs={8} className="username">
                        <Link to={ROUTES.CHAT + chat.room}>
                          {chat.user.name}
                          <ChatLeftDotsFill color="white" size={24} className="ml-3" />
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </div>
          }
          { !chatsLoading && chatsError &&
            <Row className="songpair-load">
              <Col xs={12}><h2>{chatsError}</h2></Col>
              <EmojiFrownFill />
            </Row>
          }
      </Container>
    </>
  );
}

export default ChatsView;