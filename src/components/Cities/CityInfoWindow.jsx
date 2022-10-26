import React from "react";

import { Card, CardTitle, Row, CardSubtitle, Button, Container } from "reactstrap";
import { pollutionLevel } from "./utils";

export const CityInfoWindow = ({ title, aqi, lastUpdated, stationID, stationName }) => {
  const { status, color } = pollutionLevel(aqi);
  return (
    <Container fluid className="city-info">
      <Card className="border-0 m-2">
        <Row>
          <div className=" text-white ">
            <Button
              className="btn-icon btn-2 ml--4 mt--2 pr-3 py-2"
              color={color}
              type="button"
            >
              <div className="btn-inner--icon">
                <h2 className="text-white">{aqi}</h2>
                <h5 className="text-white">{status}</h5>
              </div>
            </Button>
          </div>
          <div className="col mt--2">
            <CardTitle tag="h2" className="my-0">
              {title}
            </CardTitle>
            <CardSubtitle
              tag="h5"
              className="city-info-station mt-1 mb-0 font-weight-normal"
            >
              {stationName}
            </CardSubtitle>
            <p className=" h6 mb-0 text-nowrap text-light">
              {new Date(lastUpdated).toDateString()}
            </p>
          </div>
        </Row>
      </Card>
    </Container>
  );
};
