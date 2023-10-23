import { combineReducers } from "redux";

import UserReducer from "./user/user-reducer";
import CommunityReducer from "./community/community-reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  community: CommunityReducer,
});

export default rootReducer;
