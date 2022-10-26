import { Link } from "react-router-dom";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

//utils
import { hamburgerLinks } from "./utils";

const AdminNavbar = ({ brandText, currentUser: { displayName, photoURL } }) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-md-inline-block"
            to="/"
          >
            {brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={photoURL || require("assets/img/brand/default-profile.png")}
                      referrerPolicy="no-referrer"
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">{displayName}</span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {hamburgerLinks.map(
                  ({ title, icon, classNames, onClick, layout, path }, idx) => {
                    return (
                      <DropdownItem
                        className={classNames}
                        onClick={onClick}
                        to={`${layout}${path}`}
                        tag={Link}
                        key={idx}
                      >
                        {icon}
                        {title}
                      </DropdownItem>
                    );
                  }
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
