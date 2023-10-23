import { useState, useEffect } from "react";
import { positionWatcher } from "../utils/watchPosition";

export default function useUpdateLocation(updateUserLocation){

	const [coords, setCoords] = useState(null);

	useEffect(() => {
		if (coords) {
			var watcherId = positionWatcher(coords, setCoords);
			updateUserLocation(coords)
		} else {
			navigator.geolocation.getCurrentPosition((pos) => setCoords({lat: pos.coords.latitude, long: pos.coords.longitude}) );
		}

		return function () {
			navigator.geolocation.clearWatch(watcherId)
		}
	}, [coords, updateUserLocation]);
}
