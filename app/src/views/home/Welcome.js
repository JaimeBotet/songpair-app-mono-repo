import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import LeftLayers from '../components/Transition/LeftLayers'
import './Welcome.scss';

function Welcome() {
	const [transition, setTransition] = useState(false);
	const history = useHistory();

	const handleClick = () => {
		setTransition(true);
		setTimeout(() => history.push("/login"), 1500);
	}

	return (
		<Container fluid className="welcome-page">
			<LeftLayers active={transition} />
			<Row>
				<Col xs={8} md={4} lg={1}>
					<div className="music-icon move-left">
						<MusicNoteBeamed size={25} />
					</div>
					<div className="music-icon move-right">
						<MusicNoteBeamed size={25} />
					</div>
				</Col>
				<Col xs={12}>
					<h1 className="text-white">Songpair</h1>
				</Col>
				<Col xs={8} md={4} lg={2}
					className="text-white btn btn-primary"
					onClick={handleClick}
				>
					Start
				</Col>
				<Col xs={12} className="text-center text-secondary">find others favorite songs</Col>
				<Col xs={12} className="text-center text-secondary">share yours</Col>
			</Row>
		</Container>
	);
}

export default Welcome;