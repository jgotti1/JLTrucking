import React, { useContext, useEffect } from "react";
import { JobRunsContext } from "../Context/JobRunsContext";

const JobRunsViewer = () => {
  const { jobRuns } = useContext(JobRunsContext);

  useEffect(() => {
    console.log("Job Runs:", jobRuns);
  }, [jobRuns]);

  return <div>Job Runs sent to console</div>;
};

export default JobRunsViewer;
