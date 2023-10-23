import UserTypes from "./user-types";
import { signInFormURI, signUpURI, loginURI, logoutURI, updatePosURI, updateLikeURI } from "../../config/config";

export const resetStoreAndLogOut = () => ({
  type: UserTypes.RESET_STORE_AND_LOG_OUT,
});

export const signInFormRequest = () => ({
  type: UserTypes.FORM_REQUEST,
});

export const signInFormError = (message) => ({
  type: UserTypes.FORM_ERROR,
  payload: message,
});

export const signInFormSuccess = (form) => ({
  type: UserTypes.FORM_SUCCESS,
  payload: form
});

export const loginRequest = () => ({
  type: UserTypes.LOGIN_REQUEST,
});

export const loginError = (message) => ({
  type: UserTypes.LOGIN_ERROR,
  payload: message,
});

export const loginSuccess = ({ name, token, avatar }) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: {
    name: name,
    token: token,
    avatar: avatar,
  },
});

export const signUpRequest = () => ({
  type: UserTypes.SIGNUP_REQUEST,
});

export const signUpError = (message) => ({
  type: UserTypes.SIGNUP_ERROR,
  payload: message,
});

export const signupSuccess = ({ name, token, avatar }) => ({
  type: UserTypes.SIGNUP_SUCCESS,
  payload: {
    name: name,
    token: token,
    avatar: avatar,
  },
});

export const signoutRequest = () => ({
  type: UserTypes.SIGNOUT_REQUEST,
});

export const signoutError = (message) => ({
  type: UserTypes.SIGNOUT_REQUEST,
  payload: message,
});

export const signoutSuccess = () => ({
  type: UserTypes.SIGNOUT_SUCCESS,
});

export const updateLocationRequest = () => ({
  type: UserTypes.UPDATE_LOCATION_REQUEST
});

export const updateLocationSuccess = (point) => ({
  type: UserTypes.UPDATE_LOCATION_SUCCESS,
  payload: {
    point: point
  }
});

export const updateLocationError = (message) => ({
  type: UserTypes.UPDATE_LOCATION_ERROR,
  payload: message
});

export const updateLikeRequest = () => ({
  type: UserTypes.UPDATE_LIKE_REQUEST
});

export const updateLikeSuccess = (like) => ({
  type: UserTypes.UPDATE_LIKE_SUCCESS,
  payload: like
});

export const updateLikeError = (message) => ({
  type: UserTypes.UPDATE_LIKE_ERROR,
  payload: message
});


export function signUp({ name, email, password, avatar, token, refreshToken, location, spotifyID }) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    const res = await fetch(signUpURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar,
        token,
        refreshToken,
        location,
        spotifyID
      }),
    }).catch((error) => dispatch(signUpError(error.message)));

    const resJson = await res
      .json()
      .catch((error) => dispatch(signUpError(error.message)));

    if (res.ok) {
      dispatch(
        signupSuccess({
          name: resJson.data.user.name,
          token: resJson.data.token,
          avatar: resJson.data.user.avatar,
        }),
      );
    } else {
      dispatch(signUpError(resJson.error));
    }
  };
}

export function login({ email, password }) {
  return async function loginThunk(dispatch) {
    dispatch(loginRequest());

    const res = await fetch(loginURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).catch((error) => dispatch(loginError(error.message)));

    const resJson = await res
      .json()
      .catch((error) => dispatch(signUpError(error.message)));

    if (res.ok) {
      dispatch(
        loginSuccess({
          name: resJson.data.user.name,
          token: resJson.data.token,
          avatar: resJson.data.user.avatar,
        }),
      );
    } else {
      dispatch(loginError(resJson.error));
    }
  };
}

export function signout() {
  return async function logoutThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    if (token) {
      dispatch(signoutRequest());

      const res = await fetch(logoutURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => dispatch(signoutError(error.message)));

      if (res.ok) {
        dispatch(signoutSuccess());
      }
    } else {
      dispatch(signoutError("Missing auth token"));
    }
  };
}

export function signInForm(code) {
  return async function signInFormThunk(dispatch, getState) {

    dispatch(signInFormRequest());

    const res = await fetch(`${signInFormURI}?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => dispatch(signInFormError(error.message)));

    const resJson = await res
      .json()
      .catch((error) => dispatch(signInFormError(error.message)));

    if (res.ok) {
      dispatch(
        signInFormSuccess(resJson.data.data)
      );
    } else {
      dispatch(signInFormError(resJson.error));
    }
  };
}

export function updateUserLocation(point) {
  return async function updateLocationThunk(dispatch, getState) {

    const token = getState().user.currentUser.token;

    if (token) {
      dispatch(updateLocationRequest());

      const res = await fetch(updatePosURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          point: point
        }),
      }).catch((error) => dispatch(updateLocationError(error.message)));

      if (res.ok) {
        dispatch(updateLocationSuccess(point));
      }
    } else {
      dispatch(updateLocationError("Missing auth token"));
    }
  };
}

export function updateLike(song, receiver) {
  return async function updateLikeThunk(dispatch, getState) {

    const token = getState().user.currentUser.token;

    if (token) {
      dispatch(updateLikeRequest());

      const res = await fetch(updateLikeURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          song: song,
          receiver: receiver
        }),
      }).catch((error) => dispatch(updateLikeError(error.message)));

      const resJson = await res
      .json()
      .catch((error) => dispatch(updateLikeError(error.message)));

      if (res.ok) {
        dispatch(updateLikeSuccess(resJson.data.data));
      } else {
        dispatch(updateLikeError(resJson.error));
      }

    } else {
      dispatch(updateLikeError("Missing auth token"));
    }
  };
}


