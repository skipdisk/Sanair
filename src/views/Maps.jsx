import React, { useEffect } from "react";
import { renderToString } from "react-dom/server";

// components
import { Card, Col, Container, Row, Button } from "reactstrap";
import Header from "components/Headers/Header";
import SearchBar from "components/SearchBar/SearchBar";
import { CityInfoWindow } from "components/Cities/CityInfoWindow";

//store
import { selectStations } from "store/map/selectors";
import { useSelector } from "react-redux";

//utils
import mapOptions from "utils/mapOptions";
import { selectUser } from "store/userData/selectors";

const MapWrapper = () => {
  const user = useSelector(selectUser);
  const userStations = user.selectedStations;
  const stations = useSelector(selectStations);
  const mapRef = React.useRef(null);
  const google = window.google;

  useEffect(() => {
    const bounds = new google.maps.LatLngBounds();
    let map = mapRef.current;
    map = new google.maps.Map(map, mapOptions);

    if (userStations && userStations.length) {
      userStations.map((userMarker) => {
        const { stationID, title } = userMarker;

        const { latitude, longitude, stationName } = stations[stationID];
        const animation = google.maps.Animation.DROP;

        const infowindow = new google.maps.InfoWindow({
          content: renderToString(
            <CityInfoWindow title={title} {...stations[stationID]} />
          ),
        });

        const marker = new google.maps.Marker({
          stationID,
          stationName,
          title,
          animation,
          map,
          position: new google.maps.LatLng(latitude, longitude),
        });
        bounds.extend(marker.position);

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });

        return marker;
      });
      map.fitBounds(bounds);
    }

    var waqiMapOverlay = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        return (
          "https://tiles.aqicn.org/tiles/usepa-aqi/" +
          zoom +
          "/" +
          coord.x +
          "/" +
          coord.y +
          ".png?token=_TOKEN_ID_"
        );
      },
      name: "Air  Quality",
    });

    map.overlayMapTypes.insertAt(0, waqiMapOverlay);
  }, [
    google.maps.Animation.DROP,
    google.maps.ImageMapType,
    google.maps.InfoWindow,
    google.maps.LatLng,
    google.maps.LatLngBounds,
    google.maps.Map,
    google.maps.Marker,
    stations,
    userStations,
  ]);

  return (
    <>
      <div
        style={{ height: `60vh` }}
        className="shadow-lg map-canvas"
        id="map-canvas"
        ref={mapRef}
      >
        <Button lat={11.0168} lng={76.9558} text="My Marker">
          click me
        </Button>
      </div>
    </>
  );
};

const Maps = () => {
  return (
    <>
      <Header />
      <Container className="mt--8 p-2" fluid>
        <Row>
          <Col>
            <Card className="bg-white">
              <MapWrapper />
            </Card>
          </Col>
        </Row>
        <SearchBar />
      </Container>
    </>
  );
};

export default Maps;
