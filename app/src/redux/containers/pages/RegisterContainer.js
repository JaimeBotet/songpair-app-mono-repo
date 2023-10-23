import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { signInForm, signUp } from "../../user/user-actions";

import Signup from "../../../views/auth/Register";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFormData: (code) =>
    dispatch(signInForm(code)),
  signup: ({name, email, password, avatar, token, refreshToken, location, spotifyID}) =>
    dispatch(signUp({name, email, password, avatar, token, refreshToken, location, spotifyID})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
