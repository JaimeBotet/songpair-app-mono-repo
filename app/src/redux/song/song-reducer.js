import SongTypes from "./song-types";

const SongInitialState = {
  songLoading: false,
  songLoadingError: null,
  songFetched: false,
  songUpdating: false,
  songUpdatingError: null,
  songLike: false,
  id: [],
};

const SongReducer = (state = SongInitialState, action) => {
  switch (action.type) {
    case SongTypes.FETCH_SONG_REQUEST: {
      return {
        ...state,
        songLoading: true,
        songLoadingError: null,
        songUpdatingError: null,
      };
    }
    case SongTypes.FETCH_SONG_ERROR: {
      return {
        ...state,
        songLoading: false,
        songLoadingError: action.payload,
      };
    }
    case SongTypes.FETCH_SONG_SUCCESS: {
      const songID = action.payload._id;

      return {
        ...state,
        songLoading: false,
        songFetched: true,
        songLoadingError: null,
        //No idea what this snippet of code does
        byID: {
          ...state.byID,
          [songID]: {
            ...state.byID[songID],
            comments: [...action.payload.comments],
            author: {
              ...action.payload.author,
            },
            ingredients: [...action.payload.ingredients],
          },
        },
      };
    }
    case SongTypes.SONG_UPDATING: {
      return {
        ...state,
        songUpdating: true,
        songUpdatingError: null,
      };
    }
    case SongTypes.SONG_UPDATING_ERROR: {
      return {
        ...state,
        songUpdating: false,
        songUpdatingError: action.payload,
      };
    }
    case SongTypes.ADD_SONG_LIKE: {
      return {
        ...state,
        songLike: true,
      };
    }
    case SongTypes.REMOVE_SONG_LIKE: {
      return {
        ...state,
        songLike: false,
      };
    }

    //Recicled from example code... might be useful?
    case SongTypes.ADD_LOCAL_SONG_COMMENT: {
      const songID = action.payload.songID;
      const newComment = action.payload.comment;

      return {
        ...state,
        byID: {
          ...state.byID,
          [songID]: {
            ...state.byID[songID],
            comments: [newComment, ...state.byID[songID].comments],
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default SongReducer;
