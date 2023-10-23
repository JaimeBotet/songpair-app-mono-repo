import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { login } from "../../user/user-actions";

import Login from "../../../views/auth/Login";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(login({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
