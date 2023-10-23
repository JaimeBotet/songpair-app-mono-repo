import React, { useEffect, useState } from "react";
import { useLocation, Redirect, Link } from 'react-router-dom';
import { parse } from 'qs';

import { Container, Row, Col, Form, Spinner} from 'react-bootstrap';

import ROUTES from '../../utils/routes'

import './Register.scss';
import dummyAvatar from '../../assets/accounts/dummy_avatar.png'

function Register({
  currentUserState: { signInForm, signInFormLoad, signInFormError, signUpError, isSigningUp, isAuthenticated } = {},
  fetchFormData, signup
}) {
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coord, setCoord] = useState("");
  const [formError, setFormError] = useState(false);

  // Fetch user data from Spotify
  useEffect(() => {
    let code = parse(location.search, { ignoreQueryPrefix: true }).code
    fetchFormData(code)
  }, [fetchFormData, location.search]);

  // Update useStates when fetch from Spotify is done
  useEffect(() => {
    if (signInForm) {
      setName(signInForm.display_name);
      setEmail(signInForm.email);
      setAvatar(signInForm.images[0] ? signInForm.images[0].url : dummyAvatar);
    }
  }, [signInForm]);

  // Erase errors entering information on inputs
  useEffect(() => {
    setFormError(false);
  }, [coord, password, email, name]);

  // Check form then send Sign Up to backend
  const signUpHandle = () => {
    if (name === "") return setFormError("Please, insert your name")
    if (email === "") return setFormError("Please, insert your email")
    if (password === "") return setFormError("Please, insert a password")
    if (password.length < 8) return setFormError("Password minimun length: 8 chars")
    if (coord === "") return setFormError("Please, accept location use")

    let newUser = {
      name,
      email,
      password,
      avatar,
      spotifyID: signInForm.id,
      token: signInForm.tokens.access_token,
      refreshToken: signInForm.tokens.refresh_token,
      location: coord,
    }

    signup(newUser);
  }

  // Handle geolocation
  const locationHandle = () => {
    const success = (pos) => {
      setCoord({type: "Point", coordinates: [pos.coords.longitude, pos.coords.latitude]});
    }

    const error = (err) => {
      setCoord("");
    }

    if (coord === "") {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setCoord("");
    }
  }

  // Redirect if user is logged
  if (isAuthenticated) {
    return <Redirect to={ROUTES.DASHBOARD} />;
  }

  return (
    <Container fluid className="fade-in register-page">
      <Row>
        <Col xs={12}>
          <h1 className="text-white">Sign up</h1>
        </Col>
        { (isSigningUp || ( signInFormLoad && !signInForm)) && (
            <Spinner animation="border" variant="primary" />
        )}
        { signInForm && !isSigningUp && (
          <Col xs={8} md={5} lg={3} className="text-center text-white">
            <Form.Control type="file" id="avatar" className="d-none"></Form.Control>
              <label htmlFor="avatar">
                <img
                  src={avatar}
                  alt="user avatar"
                  className="avatar"
                />
              </label>
            <Form.Control
                type="name"
                placeholder="Your name"
                className="mb-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
            <Form.Check
              className="mt-3 mb-1"
              type="switch"
              id="location"
              label="Accept geolocation use"
              onClick={locationHandle}
            />
            {formError && <Col xs={12} className="badge badge-danger">{formError}</Col>}
            {signUpError && <Col xs={12} className="badge badge-danger">{signUpError}</Col>}
            <div
              className="text-white btn btn-primary w-100"
              onClick={signUpHandle}
            >
              Register
            </div>
            <Col xs={12}>
              <p className="text-center text-secondary mt-2">
                Got an account? <Link to={ROUTES.LOGIN}
                className="text-primary"
                role="button"
              >
                Sign In
              </Link>
              </p>
            </Col>
          </Col>
        )}
        { signInFormError && (
          <>
            <Col xs={12} className="badge badge-danger">{signInFormError}</Col>
            <Col xs={8} md={5} lg={3}>
              <Link to={ROUTES.LOGIN}
                className="btn btn-primary w-100"
              >
                Please try again
              </Link>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Register;