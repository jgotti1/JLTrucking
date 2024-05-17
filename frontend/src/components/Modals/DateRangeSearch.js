import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DateRangeSearch = ({ handleCloseDateRangeModal, handleOpenDateRangeModal }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleSearchClick = () => {
    // Perform search action with the selected date range
    // handleSearch(fromDate, toDate);
  };

  return (
    <Modal show={handleOpenDateRangeModal} onHide={handleCloseDateRangeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Date Range Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
        <Button variant="primary" >
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateRangeSearch;
