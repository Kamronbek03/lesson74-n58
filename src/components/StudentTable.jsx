import React from "react";
import { Table, Button } from "react-bootstrap";
import "./StudentTable.css";

const StudentTable = ({ students, onEdit, onDelete }) => (
  <Table striped hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Group</th>
        <th className="text-end">Action</th>
      </tr>
    </thead>
    <tbody>
      {students.map((student, index) => (
        <tr key={student.id}>
          <td>{index + 1}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.group}</td>
          <td className="text-end">
            <Button variant="primary" onClick={() => onEdit(student)}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => onDelete(student.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default StudentTable;
