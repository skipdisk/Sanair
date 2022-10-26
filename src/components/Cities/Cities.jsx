import React, { useEffect, useState } from "react";
import aqicnService from "services/aqicn";
import City from "./City";
import { Container, Row } from "reactstrap";
import { sanitizeMarker } from "store/map/utils";

const Cities = ({ search }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // memory leak cleanup
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      const response = await aqicnService(search, signal);

      response.json().then((res) => {
        const sanitizedData = res.data.map((marker) => sanitizeMarker(marker));
        setResults(sanitizedData);
      });
    }
    fetchData();

    return function cleanup() {
      abortController.abort();
    };
  }, [search]);

  return (
    <>
      {results !== [] && (
        <div>
          <p className="px-4 mt-0 pt-0 d-flex justify-content-center">
            <a href="http://aqicn.org/scale/" target="_blank" rel="noopener noreferrer">
              What do these levels mean?
            </a>
          </p>
        </div>
      )}
      <Container className="mx-0 px-0" fluid>
        <Row className="mx-0 px-0">
          {results !== [] &&
            results.map(
              (station, index) =>
                station.aqi !== "-" && (
                  <City key={station.uid} index={index} station={station} />
                )
            )}
        </Row>
      </Container>
    </>
  );
};

export default Cities;
