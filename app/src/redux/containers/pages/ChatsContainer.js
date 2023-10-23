import { connect } from "react-redux";

import { currentUserStateSelector } from "../../user/user-selectors";
import { communityStateSelector } from "../../community/community-selectors";

import { updateUserLocation } from '../../user/user-actions';
import { getChats } from '../../community/community-actions';

import Chats from "../../../views/chat/Chats";

const chatsStateToProps = (state) => ({
  currentUserState: currentUserStateSelector(state),
  communityState: communityStateSelector(state),
});

const chatsDispatchToProps = (dispatch) => ({
  getChats: () => dispatch(getChats()),
  updateUserLocation: (point) => dispatch(updateUserLocation(point)),
});

export default connect(chatsStateToProps, chatsDispatchToProps)(Chats);
