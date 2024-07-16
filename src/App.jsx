import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import AppContext from "./AppContext";
import StudentModal from "./components/StudentModal"; // Renamed to StudentModal
import StudentTable from "./components/StudentTable"; // Renamed to StudentTable
import Filter from "./components/Filter";
import "./App.css";

const initialState = {
  students: [],
  loading: true,
  error: null,
};

const actionTypes = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_STUDENT: "ADD_STUDENT",
  DELETE_STUDENT: "DELETE_STUDENT",
  UPDATE_STUDENT: "UPDATE_STUDENT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        students: action.payload, // Changed 'contacts' to 'students'
        loading: false,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADD_STUDENT: // Changed 'ADD_CONTACT' to 'ADD_STUDENT'
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case actionTypes.DELETE_STUDENT: // Changed 'DELETE_CONTACT' to 'DELETE_STUDENT'
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_STUDENT: // Changed 'UPDATE_CONTACT' to 'UPDATE_STUDENT'
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    group: "React-11",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((response) => {
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_ERROR, payload: error });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected === null) {
      axios
        .post("http://localhost:3000/students", {
          ...form,
          id: state.students.length + 1,
        })
        .then((response) => {
          dispatch({ type: actionTypes.ADD_STUDENT, payload: response.data });
        })
        .catch((error) => {
          console.error("Error adding student:", error);
        });
    } else {
      axios
        .put(`http://localhost:3000/students/${selected}`, form)
        .then((response) => {
          dispatch({
            type: actionTypes.UPDATE_STUDENT,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    }

    setForm({
      firstName: "",
      lastName: "",
      group: "React-11",
    });
    setSelected(null);
    setShowModal(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setSelected(student.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this student?")) {
      axios
        .delete(`http://localhost:3000/students/${id}`)
        .then(() => {
          dispatch({ type: actionTypes.DELETE_STUDENT, payload: id });
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  };

  if (state.loading) {
    return <Spinner animation="border" />;
  }

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch, handleEdit, handleDelete }}>
      <Container className="mt-5">
        <Row className="mb-3">
          <Col>
            <h1>Contact Management</h1>
            <Button className="button" onClick={() => setShowModal(true)}>
              <>Add Contact</>
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Filter />
          </Col>
        </Row>
        <Row>
          <Col>
            <StudentTable
              students={state.students} // Passed 'students' instead of 'contacts'
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
        <StudentModal
          show={showModal}
          onHide={() => setShowModal(false)}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          selected={selected}
        />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
