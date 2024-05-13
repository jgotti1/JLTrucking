
import React, { useContext, useState } from "react";
import { NavigationContext } from "./Context/NavigationContext";
import { Button } from "react-bootstrap";
import NavMenu from "./components/NavMenu";
import JobRuns from "./components/JobRuns"; 
import './App.css';


function App() {
  const { selectedItem } = useContext(NavigationContext);
  const [highlightJobsFields, setHighlightJobsFields] = useState({});
  const [showJobsModal, setShowJobsModal] = useState(false);

  const handleOpenJobsModal = () => {
     setHighlightJobsFields({});
     setShowJobsModal(true);
   };

   const handleCloseJobsModal = () => {
     setShowJobsModal(false);
   };

  return (
    <div className="App">
      <header className="header">
        <NavMenu />
      </header>
      <img src="/JLlogo.jpg" alt="JL Trucking Logo" className="logo" />
      <h3 className="header-font">{selectedItem}</h3>
      { selectedItem === "Jobs" && (<Button variant="secondary" onClick={handleOpenJobsModal} className="open-modal-btn mb-3 btn-sm">
        Add Job Run
      </Button>)}
      {selectedItem === "Jobs" && (
        <JobRuns
          showJobsModal={showJobsModal}
          setShowJobsModal={setShowJobsModal}
          handleCloseJobsModal={handleCloseJobsModal}
          handleOpenJobsModal={handleOpenJobsModal}
          highlightJobsFields={highlightJobsFields}
          setHighlightJobsFields={setHighlightJobsFields}
        />
      )}
    </div>
  );
}

export default App;
