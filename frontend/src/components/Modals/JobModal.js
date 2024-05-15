import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function JobModal({ highlightJobsFields, showJobsModal, handleCloseJobsModal, handleSubmit, handleDelete}) {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // if (initialData.job_date) {
    //   // Convert ISO 8601 format to YYYY-MM-DD format
    //   const date = new Date(initialData.job_date);
    //   const formattedDate = date.toISOString().split("T")[0]; // This will give you YYYY-MM-DD format
    //   initialData.job_date = formattedDate;
    // }
    setFormData({
      job_date: "",
      po_number: "",
      job_type:  "",
      truck_id:  "1",
      driver_id:  "JL",
      starting_mileage:  "",
      ending_mileage:  "",
      pickup_location: "",
      delivery_location: "",
      job_pay: "",
      status: "In Progress",
      notes: "",
    });
  }, [showJobsModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={showJobsModal} onHide={handleCloseJobsModal} className="data-entry-modal">
      <Modal.Header closeButton>
        <Modal.Title>"Edit Request"</Modal.Title>
        <br />
      </Modal.Header>
      <small className="required">* Required fields</small>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb2">
                <Form.Label>Job Date *</Form.Label>
                <Form.Control className={`${highlightJobsFields["Job Date"] ? "highlight" : ""}`} type="date" name="job_date" value={formData.job_date} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>PO Number</Form.Label>
                <Form.Control type="text" name="po_number" value={formData.po_number} onChange={handleChange} className={`${highlightJobsFields["job_date"] ? "highlight" : ""}`} />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Job Type *</Form.Label>
                <Form.Control className={`${highlightJobsFields["Job Type"] ? "highlight" : ""}`} type="text" name="job_type" value={formData.job_type} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Starting Mileage *</Form.Label>
                <Form.Control
                  className={`${highlightJobsFields["Starting Mileage"] ? "highlight" : ""}`}
                  type="text"
                  name="starting_mileage"
                  value={formData.starting_mileage}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pickup Location *</Form.Label>
                <Form.Control
                  className={`${highlightJobsFields["Pickup Location"] ? "highlight" : ""}`}
                  type="text"
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Pay Amount</Form.Label>
                <Form.Control className={`${highlightJobsFields["Job Pay"] ? "highlight" : ""}`} type="text" name="job_pay" value={formData.job_pay} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Truck ID *</Form.Label>
                <Form.Select name="truck_id" value={formData.truck_id} onChange={handleChange}>
                  <option value="1">1</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Driver ID *</Form.Label>
                <Form.Select name="driver_id" value={formData.driver_id} onChange={handleChange}>
                  <option value="JL">JL</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Job Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Ending Mileage</Form.Label>
                <Form.Control
                  className={`${highlightJobsFields["Ending Mileage"] ? "highlight" : ""}`}
                  type="text"
                  name="ending_mileage"
                  value={formData.ending_mileage}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Delivery Location *</Form.Label>
                <Form.Control
                  className={`${highlightJobsFields["Delivery Location"] ? "highlight" : ""}`}
                  type="text"
                  name="delivery_location"
                  value={formData.delivery_location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} name="notes" value={formData.notes} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseJobsModal}>
          Close
        </Button>
 
         <Button variant="primary" onClick={() => handleSubmit(formData)}>
            Save Changes
          </Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export default JobModal;
