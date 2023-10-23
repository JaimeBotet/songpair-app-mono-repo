import { createSelector } from "reselect";

export const selectCommunityState = (state) => state.community;

export const communityStateSelector = createSelector(
  [selectCommunityState],
  (communityState) => communityState,
);

