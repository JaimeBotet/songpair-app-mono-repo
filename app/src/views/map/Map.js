import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { positionWatcher } from "../../utils/watchPosition";

import { MapContainer as Map, TileLayer, useMap } from "react-leaflet";
import { Container, Row, Col, Spinner} from "react-bootstrap";

import Header from "../components/Header/Header";
import Marker from "../../redux/containers/components/MarkerContainer";

import ROUTES from "../../utils/routes";

import "./Map.scss";
import "leaflet/dist/leaflet.css";


function MapView({
	currentUserState: { isAuthenticated, currentUser } = {},
	communityState: { nearPeopleLoading, nearPeopleLoadingError, nearPeopleData } = {},
	fetchNearPeople, appSocket
}) {
	const [point, setPoint] = useState(null);
	const [pointError, setPointError] = useState(null);
	const [moved, setMoved] = useState(false);

	function ChangeView({center, active}) {
		const map = useMap();
		if (point && active) {
			map.setView([center.lat, center.long]);
		}
		useEffect(() => {
			if (active) setMoved(false);
		}, [active]);

		return null;
	}

	useEffect(() => {
		if (point) {
			fetchNearPeople(point);
			var watcher = positionWatcher(point, setPoint);
		} else {
			navigator.geolocation.getCurrentPosition(
				(pos) => setPoint({lat: pos.coords.latitude, long: pos.coords.longitude}),
				(err) => setPointError(err)
			);
		}
		setMoved(true);

		return function () {
				navigator.geolocation.clearWatch(watcher)
		}
	}, [point, fetchNearPeople]);

	// Redirect if not logged
	if (!isAuthenticated) {
		return <Redirect to={ROUTES.LOGIN} />;
	}

	return (
		<>
		<Header title="Near People" back={ROUTES.DASHBOARD} />
		<Container fluid className="map-page">
			<Row className="map-row text-center">
				<Col xs={12} md={11} lg={11} xl={4}>
					{point ? (
						<Map
							className="map-container"
							center={[point.lat, point.long]}
							zoom={100} scrollWheelZoom={false}
						>
							<ChangeView center={point} active={moved}/>
							{ nearPeopleLoading ? (
								<Row className="d-flex align-items-center h-100">
									<Col><Spinner animation="grow" variant="primary"/></Col>
								</Row>
							) : (
								nearPeopleLoadingError ?
								(
									<Row className="d-flex align-items-center h-100">
										<Col><p className="h5">{nearPeopleLoadingError}, please try again.</p></Col>
									</Row>
								) : (
									<>
										<TileLayer
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
											attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										/>
										{nearPeopleData &&
											nearPeopleData.map((user) =>
											<Marker
												key={user.spotifyID}
												user={user}
												appSocket={appSocket}
												currentUser={currentUser}
											/>
										)}
									</>
								)
							)}
						</Map>
					) : (
						<Container fluid className="map-container">
							<Row className="d-flex align-items-center h-100 text-white">
								<Col>
									{pointError && (
										<p className="h5">Could not access your geolocation, please try again.</p>
									)}
								</Col>
							</Row>
						</Container>
					)}
				</Col>
			</Row>
		</Container>
		</>
	);
}

export default MapView;