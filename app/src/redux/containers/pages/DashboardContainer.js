import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { signout, updateUserLocation } from '../../user/user-actions';

import Dashboard from "../../../views/dashboard/Dashboard";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(signout()),
  updateUserLocation: (point) => dispatch(updateUserLocation(point)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
