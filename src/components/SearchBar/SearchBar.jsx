import Cities from "components/Cities/Cities";
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // document.querySelector(".form-control").focus();
    if (search.length < 3) {
      setIsEmpty(true);
    } else if (search.length >= 3) {
      setIsEmpty(false);
    }
  }, [search]);

  return (
    <>
      <Form>
        <Row className="mt-4">
          <Col xs="12">
            <FormGroup>
              <InputGroup className="mb-5" onChange={(e) => setSearch(e.target.value)}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-zoom-split-in" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search a location for air quality data" type="text" />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {search.length >= 3 && <Cities search={search} isEmpty={isEmpty} />}
    </>
  );
};

export default SearchBar;
