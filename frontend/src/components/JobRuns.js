import React, { useContext, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { JobRunsContext } from "../Context/JobRunsContext";
import JobRunModal from "./Modals/JobModal";
import { v4 as uuidv4 } from "uuid";

const JobRunsViewer = () => {
  const { jobRuns } = useContext(JobRunsContext);
  const [showModal, setShowModal] = useState(false);
  const { updateJobRuns } = useContext(JobRunsContext);
  const [highlightFields, setHighlightFields] = useState({});

const handleSubmit = async (formData) => {
  console.log(formData);

function validateForm(formData) {
  let missingFields = [];
  let nonNumericFields = [];

  if (!formData || !formData.job_date.trim()) {
    missingFields.push("Job Date");
  }
  if (!formData || !formData.job_type.trim()) {
    missingFields.push("Job Type");
  }
  if (!formData || !formData.starting_mileage.trim()) {
    missingFields.push("Starting Mileage");
  } else if (isNaN(formData.starting_mileage)) {
    nonNumericFields.push("Starting Mileage");
  }
  // Changed to only check numeric validity if not blank
  if (formData.ending_mileage.trim() && isNaN(formData.ending_mileage)) {
    nonNumericFields.push("Ending Mileage");
  }
  // Changed to only check numeric validity if not blank
  if (formData.job_pay.trim() && isNaN(formData.job_pay)) {
    nonNumericFields.push("Job Pay");
  }
  if (!formData || !formData.pickup_location.trim()) {
    missingFields.push("Pickup Location");
  }
  if (!formData || !formData.delivery_location.trim()) {
    missingFields.push("Delivery Location");
  }

  let alerts = [];
  if (missingFields.length > 0) {
    alerts.push("Please fill out the following required fields: " + missingFields.join(", ") + ".");
  }
  if (nonNumericFields.length > 0) {
    alerts.push("The following fields must be numeric: " + nonNumericFields.join(", ") + ".");
  }

  if (alerts.length > 0) {
    const fieldsToUpdate = [...missingFields, ...nonNumericFields].reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setHighlightFields(fieldsToUpdate);

    alert(alerts.join("\n"));

    return false; // Prevent form submission
  }

  setHighlightFields({});
  return true; // Proceed with form submission if all fields are filled and valid
}

// Make sure to pass formData to validateForm
if (!validateForm(formData)) {
  return; // Stop the function if validation fails
}

   const processedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
     acc[key] = value.trim() === "" ? null : value;
     return acc;
   }, {});

  try {
    // Make a POST request to update the job run data on the server
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(processedFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to update job run data");
    }

    // If the request is successful, update the job runs context with the new data
    updateJobRuns([...jobRuns, formData]);
  } catch (error) {
    console.error("Error updating job run data:", error);
  }
  setShowModal(false);
};


  const handleOpenModal = () => {
    setHighlightFields({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <Button variant="secondary" onClick={handleOpenModal} className="open-modal-btn mb-3 btn-sm">
          Add Job Run
        </Button>
        <Table striped bordered hover size="sm" className="data-text">
          <thead>
            <tr>
              <th>Job Date</th>
              <th>PO Number</th>
              <th>Job Type</th>
              <th>Truck ID</th>
              <th>Driver ID</th>
              <th>Starting Mileage</th>
              <th>End Mileage</th>
              <th>Pickup Location</th>
              <th>Delivery Location</th>
              <th>Pay Amount</th>
              <th>Status</th>
              <th>Completed Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {jobRuns.map((jobRun) => (
              <tr key={jobRun.id || uuidv4()}>
                <td>
                  {new Date(jobRun.job_date).toISOString().split("T")[0].split("-").slice(1).concat(new Date(jobRun.job_date).toISOString().split("T")[0].split("-")[0]).join("/")}
                </td>
                <td>{jobRun.po_number}</td>
                <td>{jobRun.job_type}</td>
                <td>{jobRun.truck_id}</td>
                <td>{jobRun.driver_id}</td>
                <td>{jobRun.starting_mileage}</td>
                <td>{jobRun.ending_mileage}</td>
                <td>{jobRun.pickup_location}</td>
                <td>{jobRun.delivery_location}</td>
                <td> ${jobRun.job_pay}</td>
                <td>{jobRun.status}</td>
                <td>{jobRun.complete_time ? new Date(jobRun.complete_time).toLocaleString() : ""}</td>
                <td>{jobRun.notes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <JobRunModal showModal={showModal} handleClose={handleCloseModal} handleSubmit={handleSubmit} highlightFields={highlightFields} />
      </div>
    </div>
  );
};

export default JobRunsViewer;
