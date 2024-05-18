import React, { createContext, useState, useEffect } from "react";

// Create the JobRunsContext
const JobRunsContext = createContext();

const JobRunsProvider = ({ children }) => {
  // State to store the job runs data
  const [jobRuns, setJobRuns] = useState([]);

  // Function to update job runs data
  const updateJobRuns = (updatedJobRuns) => {
    setJobRuns(updatedJobRuns);
  };

  // Function to fetch job runs data
  const fetchJobRunsData = async () => {
    try {
      console.log("jobs context")
      // Make API call to fetch job runs data
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}jobs`);
      const data = await response.json();

      // Set the job runs data in state
      setJobRuns(data);
    } catch (error) {
      console.error("Error fetching job runs data:", error);
    }
  };

  // Fetch job runs data when component mounts
  useEffect(() => {
    fetchJobRunsData();
  }, []);

  // Function to delete a job run
  const deleteJobRun = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job run");
      }
      setJobRuns(jobRuns.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job run:", error);
    }
  };

const fetchJobRunsDateData = async (dateRangeStart, dateRangeStop) => {
  try {
    console.log("jobs date context");
    // Fetch all records from the server
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}jobs`);
    const data = await response.json();

    // Filter the records to include only those within the date range
    const filteredData = data.filter((job) => {
      console.log(job.job_date)
      const jobDate = new Date(job.job_date); // Adjust the field name based on your data
      return jobDate >= new Date(dateRangeStart) && jobDate <= new Date(dateRangeStop) || new Date(dateRangeStart)  == new Date(dateRangeStop);
    });

    // Set the filtered job runs data in state
    console.log(filteredData);
    setJobRuns(filteredData);
  } catch (error) {
    console.error("Error fetching job runs data:", error);
  }
};


  // Function to edit a job run
  const editJobRun = async (id, updatedJobRun) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJobRun),
      });
      if (!response.ok) {
        throw new Error("Failed to update job run");
      }
      const updatedJob = await response.json();
      setJobRuns(jobRuns.map((job) => (job.id === id ? updatedJob : job)));
    } catch (error) {
      console.error("Error updating job run:", error);
    }
  };

  return (
    <JobRunsContext.Provider
      value={{
        jobRuns,
        setJobRuns,
        updateJobRuns,
        fetchJobRunsData,
        deleteJobRun,
        editJobRun,
        fetchJobRunsDateData
      }}>
      {children}
    </JobRunsContext.Provider>
  );
};

// Export the JobRunsContext and JobRunsProvider
export { JobRunsContext, JobRunsProvider };
