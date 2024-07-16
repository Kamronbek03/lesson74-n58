import React from "react";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import "../App.css";

Modal.setAppElement("#root");

const StudentModal = ({ show, onHide, form, onChange, onSubmit, selected }) => (
  <Modal
    isOpen={show}
    onRequestClose={onHide}
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
      },
    }}
  >
    <h2>{selected === null ? "Adding student" : "Editing student"}</h2>{" "}
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please fill this field!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Group</Form.Label>
        <Form.Select
          name="group"
          value={form.group}
          onChange={onChange}
          required
        >
          <option value="React-11">React-11</option>
          <option value="React-13">React-13</option>
          <option value="React-17">React-17</option>
          <option value="React-58">React-58</option>
        </Form.Select>
      </Form.Group>
      <div className="buttons">
        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" onClick={onHide}>
          Cancel
        </button>
      </div>
    </Form>
  </Modal>
);

export default StudentModal;
