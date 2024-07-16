import React, { useContext } from "react";
import axios from "axios";
import AppContext from "../AppContext";
import { Form } from "react-bootstrap";

const Filter = () => {
  const { dispatch } = useContext(AppContext);

  const handleFilter = (e) => {
    const filter = e.target.value;
    axios
      .get(`http://localhost:3000/students?group=${filter}`)
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error });
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Filter by Group</Form.Label>
        <Form.Select onChange={handleFilter}>
          <option value="">All</option>
          <option value="React-11">React-11</option>
          <option value="React-13">React-13</option>
          <option value="React-17">React-17</option>
          <option value="React-58">React-58</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default Filter;
