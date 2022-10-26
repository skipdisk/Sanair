import { useState } from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

// core components
import { chartOptions, parseOptions, aqiChart } from "utils/charts.js";

import Table from "components/Table/Table";
import Header from "components/Headers/Header";
import { useSelector } from "react-redux";
import { selectUser } from "store/userData/selectors";
import { selectStations } from "store/map/selectors";

const Index = (props) => {
  const userData = useSelector(selectUser);
  const stationsData = useSelector(selectStations);
  //eslint-disable-next-line
  const [chartData, setChartData] = useState(
    aqiChart(userData.selectedStations, stationsData)
  );

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--8 p-2" fluid>
        <Row>
          <Col className="">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
                    <h2 className="text-white mb-0">
                      {userData && userData.selectedStations.length
                        ? `Stations AQI Data`
                        : `Please add stations in Maps to track AQI`}
                    </h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                {userData.selectedStations.length && (
                  <div className="chart-sm">
                    <Bar data={chartData.data} options={chartData.options} />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Table
            stationsData={userData.selectedStations.map(
              (station) => stationsData[station.stationID]
            )}
          />
        </Row>
      </Container>
    </>
  );
};

export default Index;
