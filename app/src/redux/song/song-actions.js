import SongTypes from "./song-types";

// import { normalizeSong } from "../../schema/song-schema";

export const fetchSongRequest = () => ({
  type: SongTypes.FETCH_SONG_REQUEST,
});

export const fetchSongError = (errorMessage) => ({
  type: SongTypes.FETCH_SONG_ERROR,
  payload: errorMessage,
});

export const fetchSongSuccess = (song) => ({
  type: SongTypes.FETCH_SONG_SUCCESS,
  payload: song,
});

export const songUpdating = () => ({
  type: SongTypes.SONG_UPDATING,
});

export const songUpdatingError = (errorMessage) => ({
  type: SongTypes.SONG_UPDATING_ERROR,
  payload: errorMessage,
});

export const addSongLike = (songID) => ({
  type: SongTypes.ADD_SONG_LIKE,
  payload: {
    songID: songID,
    like: true,
  },
});

export const removeSongLike = (songID) => ({
  type: SongTypes.REMOVE_SONG_LIKE,
  payload: {
    songID: songID,
    like: false,
  },
});



export function fetchSong() {
  return async function fetchSongThunk(dispatch) {
    dispatch(fetchSongRequest());

    const res = await fetch(`fetch_from_Spotify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      dispatch(fetchSongError(error.message));
    });

    const songJson = await res.json();

    if (res.ok) {
      dispatch(fetchSongSuccess(songJson.data));
    } else {
      dispatch(fetchSongError(songJson.error));
    }
  };
}


