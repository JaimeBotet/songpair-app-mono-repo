import { useState } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import ROUTES from "../../../utils/routes"

import './Notification.scss';

function Notification({msg, room}) {
  const history = useHistory();

  const [hide, setHide] = useState(false);

  function handleNotification() {
    history.push(ROUTES.CHAT + room);
    setHide(true);
  }

  return (
    <Container>
      <Row>
        <Col
          xs={12}
          className={`notification bg-secondary fade-in ${hide && 'fade-out'}`}
          onClick={handleNotification}
        >
          {msg}
        </Col>
      </Row>
    </Container>
  );
}

export default Notification;