import React, { useContext, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { JobRunsContext } from "../Context/JobRunsContext";
import { v4 as uuidv4 } from "uuid";
import JobRunModal from "./Modals/JobModal";
import JobRunModalEdit from "./Modals/JobModalEdit";

const JobRunsViewer = ({
  showJobsModal,
  showJobsEditModal,
  setShowJobsModal,
  setShowJobsEditModal,
  handleCloseJobsModal,
  handleCloseJobsEditModal,
  highlightJobsFields,
  setHighlightJobsFields,
  filterInProgress,
  filterComplete
}) => {
  const { jobRuns, updateJobRuns, deleteJobRun, editJobRun, fetchJobRunsData } = useContext(JobRunsContext);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setShowJobsEditModal(true);
  };

  useEffect(() => {
    fetchJobRunsData();
  }, []);

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
    if (formData.ending_mileage.trim() && isNaN(formData.ending_mileage)) {
      nonNumericFields.push("Ending Mileage");
    }
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
      setHighlightJobsFields(fieldsToUpdate);

      alert(alerts.join("\n"));

      return false; // Prevent form submission
    }

    setHighlightJobsFields({});
    return true; // Proceed with form submission if all fields are filled and valid
  }

  const handleSubmit = async (formData) => {
    console.log(formData);

    if (!validateForm(formData)) {
      return; // Stop the function if validation fails
    }

    const processedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value === null || value === undefined) {
        acc[key] = null;
      } else if (typeof value === "string") {
        acc[key] = value.trim() === "" ? null : value.trim();
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
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
      const newJobRun = await response.json();
      updateJobRuns([...jobRuns, newJobRun]);
      setSelectedRow(newJobRun);

      // Show the warning message
      alert("Reminder, don't forget to enter the final mileage and mark the job complete when it is done.");

    } catch (error) {
      console.error("Error updating job run data:", error);
    }
    setShowJobsModal(false);
    setHighlightJobsFields({}); // Reset highlight fields
    setShowJobsEditModal(false);
  };

const handleDelete = async (id) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this record?git ");
  if (isConfirmed) {
    try {
      await deleteJobRun(id);
      setShowJobsEditModal(false);
      setHighlightJobsFields({}); // Reset highlight fields
    } catch (error) {
      console.error("Error deleting job run:", error);
    }
  }
};


  const handleEdit = async (formData) => {
    if (!validateForm(formData)) {
      return; // Stop the function if validation fails
    }

    const processedFormData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value === null || value === undefined || value === "") {
        acc[key] = null;
      } else if (typeof value === "string") {
        acc[key] = value.trim();
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      await editJobRun(selectedRow.id, processedFormData);
      setShowJobsEditModal(false);
    } catch (error) {
      console.error("Error editing job run:", error);
    }
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredJobRuns = jobRuns.filter((jobRun) => {
    if (filterInProgress && filterComplete) {
      return jobRun.status === "In Progress" || jobRun.status === "Complete";
    } else if (filterInProgress) {
      return jobRun.status === "In Progress";
    } else if (filterComplete) {
      return jobRun.status === "Complete";
    }
    return false; // If neither checkbox is checked, show no job runs
  });

  // Calculate summary data
  const totalRuns = filteredJobRuns.length;
  const totalMileage = filteredJobRuns.reduce((sum, jobRun) => {
    const startMileage = parseInt(jobRun.starting_mileage, 10) || 0;
    const endMileage = parseInt(jobRun.ending_mileage, 10) || 0;
    return sum + (endMileage - startMileage);
  }, 0);

  const totalPay = filteredJobRuns.reduce((sum, jobRun) => sum + (parseFloat(jobRun.job_pay) || 0), 0);

  return (
    <div className="table-container">
      <div className="table-wrapper">
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
            {filteredJobRuns.map((jobRun) => (
              <tr key={jobRun.id || uuidv4()} onClick={() => handleRowClick(jobRun)}>
                <td>
                  {new Date(jobRun.job_date).toISOString().split("T")[0].split("-").slice(1).concat(new Date(jobRun.job_date).toISOString().split("T")[0].split("-")[0]).join("/")}
                </td>
                <td>{jobRun.po_number != null ? jobRun.po_number : "-"}</td>
                <td>{jobRun.job_type}</td>
                <td>{jobRun.truck_id}</td>
                <td>{jobRun.driver_id}</td>
                <td>{formatNumberWithCommas(jobRun.starting_mileage)}</td>
                <td>{jobRun.ending_mileage !== null ? formatNumberWithCommas(jobRun.ending_mileage) : "-"}</td>
                <td>{jobRun.pickup_location}</td>
                <td>{jobRun.delivery_location}</td>
                <td>{jobRun.job_pay != null ? `$${formatNumberWithCommas(jobRun.job_pay)}` : "-"}</td>
                <td>{jobRun.status}</td>
                <td>{jobRun.complete_time ? new Date(jobRun.complete_time).toLocaleString() : "-"}</td>
                <td>{jobRun.notes != null ? jobRun.notes : "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr />
        <div className="summary">
          <p>
            <span className="bold">Total Runs:</span> {totalRuns}
          </p>
          <p>
            <span className="bold">Total Pay:</span> ${formatNumberWithCommas(totalPay.toFixed(2))}
          </p>
          <p>
            <span className="bold">Total Mileage:</span> {formatNumberWithCommas(totalMileage)}
          </p>
        </div>

        <JobRunModal showJobsModal={showJobsModal} handleCloseJobsModal={handleCloseJobsModal} handleSubmit={handleSubmit} highlightJobsFields={highlightJobsFields} />
        <JobRunModalEdit
          showJobsEditModal={showJobsEditModal}
          handleCloseJobsEditModal={handleCloseJobsEditModal}
          handleSubmit={handleSubmit}
          selectedRow={selectedRow || {}}
          highlightJobsFields={highlightJobsFields}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default JobRunsViewer;
