import React, { useState } from "react";

import { Card, Row, Col, Badge } from "reactstrap";
import PropTypes from "prop-types";
import AddCityModal from "./AddCityModal";
import { pollutionLevel } from "./utils";

const City = ({ station, index }) => {
  const { stationName, aqi, lastUpdated } = station;
  const [onHover, setHover] = useState(false);

  const [isAddModalOpen, setAddModal] = useState(false);

  const { status, color } = pollutionLevel(aqi);

  const toggleAddModal = (props) => {
    setAddModal(!isAddModalOpen);
  };

  return (
    <>
      <Col xs="12" className="px-2">
        <Card className="card-stats mb-2 py-3">
          <Row>
            <Col xs="3" className="align-self-center flip-card">
              <Badge
                style={{
                  background: `var(--${color}`,
                }}
                onClick={() => toggleAddModal()}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                color={color}
                tag="div"
                className={`${
                  index === 0 && !onHover ? "animated" : ""
                } flip-card-inner  justify-content-center align-items-center`}
              >
                <div className={`my-auto flip-card-front`}>
                  <h2 className="text-white">{aqi}</h2>
                  <h5 className="text-white">{status}</h5>
                </div>
                <div className={`justify-content-center my-auto flip-card-back `}>
                  <i class="fas fa-plus-circle text-white fa-3x"></i>
                </div>
              </Badge>
            </Col>
            <Col xs="9" className="align-self-center">
              <span style={{ maxWidth: "90%" }} className="h4 d-flex">
                {stationName}
              </span>
              <p className="mt-2 mb-0 text-muted text-sm text-nowrap">
                <span className="h5 text-success mr-2 ">
                  {/* {to be implemented} */}
                  <i className="fa fa-arrow-up" /> 3.48%
                </span>
                <span className="h6 text-muted text-nowrap">
                  {new Date(lastUpdated).toDateString()}
                </span>
              </p>
            </Col>
          </Row>
        </Card>
      </Col>
      <AddCityModal
        isAddModalOpen={isAddModalOpen}
        toggleAddModal={toggleAddModal}
        station={station}
      />
    </>
  );
};

// To be used for testing
City.propTypes = {
  station: PropTypes.shape({
    aqi: PropTypes.string,
    station: PropTypes.shape({
      geo: PropTypes.arrayOf(PropTypes.number),
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    time: PropTypes.shape({
      stime: PropTypes.string,
      tz: PropTypes.string,
      vtime: PropTypes.number,
    }),
    uid: PropTypes.number,
  }).isRequired,
};

export default City;
