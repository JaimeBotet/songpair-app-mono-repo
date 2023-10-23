import UserTypes from "./user-types";

export const UserInitialState = {
  isLoggingIn: false,
  loginError: null,
  isAuthenticated: false,
  isSigningUp: false,
  signUpError: null,
  isUpdatingPosition: false,
  updatingPositionError: null,
  isSigningOut: false,
  signOutError: null,
  signInForm: null,
  signInFormLoad: null,
  signInFormError: null,
  currentUser: {
    name: null,
    token: null,
    avatar: null,
    position: {
      lat: null,
      long: null,
    },
  },
};

const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case UserTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signUpError: null,
      };
    }
    case UserTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isSigningUp: false,
        loginError: null,
        currentUser: {
          name: action.payload.name,
          token: action.payload.token,
          avatar: action.payload.avatar,
        },
      };
    }
    case UserTypes.SIGNUP_ERROR: {
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.payload,
      };
    }
    case UserTypes.FORM_REQUEST: {
      return {
        ...state,
        signInFormLoad: true,
        signInFormError: null,
        signUpError: null
      };
    }
    case UserTypes.FORM_SUCCESS: {
      return {
        ...state,
        signInFormLoad: false,
        signInForm: action.payload
      };
    }
    case UserTypes.FORM_ERROR: {
      return {
        ...state,
        signInForm: null,
        signInFormLoad: false,
        signInFormError: action.payload,
      };
    }
    case UserTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        loginError: null,
      };
    }
    case UserTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
        loginError: null,
        currentUser: {
          name: action.payload.name,
          token: action.payload.token,
          avatar: action.payload.avatar,
        },
      };
    }
    case UserTypes.LOGIN_ERROR: {
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload,
      };
    }
    case UserTypes.SIGNOUT_REQUEST: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: null,
      };
    }
    case UserTypes.SIGNOUT_ERROR: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: action.payload,
      };
    }
    case UserTypes.SIGNOUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: null,
        isAuthenticated: false,
        currentUser: {
          name: null,
          lastname: null,
          email: null,
          token: null,
        },
      };
    }
    case UserTypes.UPDATE_POSITION_REQUEST: {
      return {
        ...state,
        isUpdatingPosition: true,
        updatingPositionError: null,
      };
    }
    case UserTypes.UPDATE_POSITION_SUCCESS: {
      return {
        ...state,
        isUpdatingPosition: false,
        updatingPositionError: null,
        currentUser: {
          position: {
            lat: action.payload.lat,
            long: action.payload.long,
          },
        }
      }
    }
    case UserTypes.UPDATE_POSITION_ERROR: {
      return {
        ...state,
        isUpdatingPosition: false,
        updatingPositionError: action.payload,
      };
    }
    case UserTypes.UPDATE_LIKE_REQUEST: {
      return {
        ...state,
        loadingLike: true,
        likeError: null,
      };
    }
    case UserTypes.UPDATE_LIKE_SUCCESS: {
      return {
        ...state,
        loadingLike: false,
        likeError: null,
        like: action.payload,
      }
    }
    case UserTypes.UPDATE_LIKE_ERROR: {
      return {
        ...state,
        loadingLike: false,
        likeError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
