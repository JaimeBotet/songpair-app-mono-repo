import { connect } from "react-redux";

import {
  songStateSelector,
} from "../../song/song-selectors";

import { fetchSong } from "../../song/song-actions";

import Welcome from "../../../views/home/Welcome";

const mapStateToProps = (state) => ({
  songState: songStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSong: () => dispatch(fetchSong()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
