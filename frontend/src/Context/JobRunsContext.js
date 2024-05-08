import React, { createContext, useState, useEffect } from "react";

// Create the JobRunsContext
const JobRunsContext = createContext();

const JobRunsProvider = ({ children }) => {
  // State to store the job runs data
  const [jobRuns, setJobRuns] = useState([]);

  // Function to fetch job runs data
  const fetchJobRunsData = async () => {
    try {
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

  return (
    // Provide the job runs data and function to update it to the children components
    <JobRunsContext.Provider value={{ jobRuns, setJobRuns }}>{children}</JobRunsContext.Provider>
  );
};

// Export the JobRunsContext and JobRunsProvider
export { JobRunsContext, JobRunsProvider };
