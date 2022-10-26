import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { setStations } from "store/userData/slice";
import { createOrUpdateStation } from "services/firebase";
import { selectUser } from "store/userData/selectors";
import { selectStations } from "store/map/selectors";
import { createStation } from "services/firebase";
import { addStations } from "store/map/slice";
import { CityInfoWindow } from "./CityInfoWindow";
import { pollutionLevel } from "./utils";

const AddCityModal = ({ isAddModalOpen, toggleAddModal, station }) => {
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const stations = useSelector(selectStations);

  const stationWithTitle = {
    ...station,
    title: userInput,
    status: pollutionLevel(station.aqi).status,
  };

  const handleClick = async () => {
    if (!(station.stationID in stations)) {
      createStation(station);
      dispatch(addStations({ [station.stationID]: { ...stationWithTitle } }));
    }
    const result = await createOrUpdateStation({
      user: user,
      station: { ...station },
    });
    dispatch(setStations(result));
  };

  return (
    <Modal
      isOpen={isAddModalOpen}
      toggle={toggleAddModal}
      className="d-flex mt-5 mt-lg-8"
    >
      <ModalHeader toggle={toggleAddModal}>
        Add this location to track AQI data
      </ModalHeader>
      <ModalBody>
        <FormGroup className="mb-3">
          <InputGroup
            className="input-group-alternative"
            onChange={(e) => setUserInput(e.target.value)}
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-pin-3" />
              </InputGroupText>
            </InputGroupAddon>
            <Input autoFocus placeholder="Please enter a name for location" type="text" />
          </InputGroup>
        </FormGroup>
        <div className="pt-3">
          <CityInfoWindow {...stationWithTitle} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          disabled={!userInput}
          onClick={() => {
            handleClick();
            toggleAddModal();
          }}
        >
          Add
        </Button>
        <Button color="secondary" onClick={toggleAddModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddCityModal;
