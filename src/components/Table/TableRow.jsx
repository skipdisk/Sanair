// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from "reactstrap";
import { getAcronym } from "utils/acronyms";
import { pollutionLevel } from "utils/polutionLevels";

const TableRow = ({ stationData }) => {
  const { aqi, stationName, title } = stationData;
  const { status, color } = pollutionLevel(aqi);
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <span className="mb-0 text-sm text-truncate w-">
            {title || getAcronym(stationName)}
          </span>
        </Media>
      </th>
      <td>{aqi}</td>
      <td>
        <Badge color={color} className="badge-dot mr-4">
          <i className={`bg-${color}`} />
          {status}
        </Badge>
      </td>

      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default TableRow;
