import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";

const DateRangeSearch = ({ handleCloseDateRangeModal, handleOpenDateRangeModal, setDateRangeStart, setDateRangeStop, toDate, setToDate, fromDate, setFromDate }) => {
  const [validationError, setValidationError] = useState("");

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleDateSearchClick = () => {
    if (!fromDate || !toDate) {
      setValidationError("Both start and end dates are required.");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      setValidationError("The start date cannot be greater than the end date.");
      return;
    }

    setValidationError(""); // Clear any previous errors

    setDateRangeStart(fromDate);
    setDateRangeStop(toDate);
    handleCloseDateRangeModal();
  };

  return (
    <Modal show={handleOpenDateRangeModal} onHide={handleCloseDateRangeModal} className="data-entry-modal">
      <Modal.Header closeButton>
        <Modal.Title>Date Range Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form.Group controlId="fromDate">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" value={fromDate} onChange={handleFromDateChange} />
          </Form.Group>
          <Form.Group controlId="toDate">
            <Form.Label>To Date</Form.Label>
            <Form.Control type="date" value={toDate} onChange={handleToDateChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDateRangeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDateSearchClick}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateRangeSearch;
