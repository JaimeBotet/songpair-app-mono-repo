import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row, Col, Form, Spinner} from 'react-bootstrap';
import DownLayers from '../components/Transition/DownLayers';
import { signUpRedirect } from '../../config/config';
import './Login.scss';

import ROUTES from '../../utils/routes';

function Login({
  currentUserState: { isLoggingIn, loginError, isAuthenticated } = {},
  login
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [transition, setTransition] = useState(false);

  // Login handle
  const loginHandle = () => {
    if (email === "") return setFormError("Please, insert your email")
    if (password === "") return setFormError("Please, insert a password")
    if (password.length < 8) return setFormError("Password minimun length: 8 chars")

    login({email, password});
  }

  // Animation then redirect to sign up
	const handleSignUp = () => {
		setTransition(true);
		setTimeout(() => window.location = signUpRedirect, 1500);
  }

  // Erase errors entering information on inputs
  useEffect(() => {
    setFormError(false);
  }, [password, email]);

  // Redirect if user is logged
  if (isAuthenticated) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <Container fluid className="fade-in login-page">
      <DownLayers active={transition} />
      <Row>
        <Col xs={12}>
          <h1 className="text-white">Songpair</h1>
        </Col>
        {isLoggingIn ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <Col xs={9} md={5} lg={3} className="spotify-btn my-4">
              Log in with Spotify
            </Col>
            <Col xs={12}>
              <p className="text-center text-secondary">Or use your account</p>
            </Col>
            <Col xs={8} md={5} lg={3}>
              <Form.Control
                type="email"
                placeholder="Email"
                className="mb-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="text-white btn btn-primary w-100"
                onClick={loginHandle}
              >
                Log in
              </div>
              {formError && <Col xs={12} className="badge badge-danger">{formError}</Col>}
              {loginError && <Col xs={12} className="badge badge-danger">{loginError}</Col>}
            </Col>
            <Col xs={12}>
              <p className="text-center text-secondary mt-2">
                Don't have one? <span
                className="text-primary"
                role="button"
                onClick={handleSignUp}
              >
                Sign up
              </span>
              </p>
            </Col>
          </>
        )}
      </Row>
  </Container>
  );
}

export default Login;