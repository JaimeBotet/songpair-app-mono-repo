import { createSelector } from "reselect";

export const selectSongState = (state) => state.song;

export const songStateSelector = createSelector(
  [selectSongState],
  (songState) => songState,
);

