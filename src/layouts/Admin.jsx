import React, { useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, UncontrolledAlert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footers/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import sanairLogo from "../assets/img/brand/sanair-logo-animated.svg";
import routes from "routes.js";
import { selectStationNotifications } from "store/global/selectors";
import { useDispatch, useSelector } from "react-redux";
import { pollutionLevel } from "components/Cities/utils";
import { removeNotification } from "store/global/slice";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const stationNotifications = useSelector(selectStationNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.layout + prop.path} component={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: sanairLogo,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar {...props} brandText={getBrandText(props.location.pathname)} />

        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <Footer />
        </Container>
      </div>
      {stationNotifications &&
        stationNotifications.map(({ stationName, status, aqi, stationID }) => (
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
              float: "right",
            }}
          >
            <UncontrolledAlert
              toggle={(e) => {
                dispatch(removeNotification(stationID));
              }}
              color={pollutionLevel(aqi).color}
              fade={false}
            >
              <span className="alert-inner--icon">
                <i className="ni ni-pin-3 ni-lg mr-2" />
              </span>
              <span className="alert-inner--text">
                {stationName} is now {status} at <strong>{aqi}</strong> AQI.
              </span>
            </UncontrolledAlert>
          </div>
        ))}
    </>
  );
};

export default Admin;
