import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { communityStateSelector } from "../../community/community-selectors";

import { updateLike } from "../../user/user-actions";

import Marker from "../../../views/components/Marker/Marker";
import { openChatRoom } from "../../community/community-actions";

const mapStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
  communityState: communityStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateLike: (song, receiver) => dispatch(updateLike(song, receiver)),
  openChatRoom: (participant) => dispatch(openChatRoom(participant))
});

export default connect(mapStateToProps, mapDispatchToProps)(Marker);
