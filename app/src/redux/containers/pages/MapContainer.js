import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { communityStateSelector } from "../../community/community-selectors";

import { fetchNearPeople, openChatRoom } from "../../community/community-actions";

import Map from "../../../views/map/Map";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
  communityState: communityStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNearPeople: (point) => dispatch(fetchNearPeople(point))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
