
import React, { useContext, useState } from "react";
import { NavigationContext } from "./Context/NavigationContext";
import { Button, Form } from "react-bootstrap";
import NavMenu from "./components/NavMenu";
import JobRuns from "./components/JobRuns"; 
import DateRangeSearch from "./components/Modals/DateRangeSearch";
import './App.css';


function App() {
  const { selectedItem } = useContext(NavigationContext);

  const [highlightJobsFields, setHighlightJobsFields] = useState({});

  const [showJobsModal, setShowJobsModal] = useState(false);

  const [showJobsEditModal, setShowJobsEditModal] = useState(false);

  const [filterComplete, setFilterComplete] = useState(false);
  const [filterInProgress, setFilterInProgress] = useState(false);

  const [showDateRangeModal, setShowDateRangeModal]= useState(false)
  
  const [dateRangeStart, setDateRangeStart] = useState(null)
  const [dateRangeStop, setDateRangeSop] = useState(null)

  const handleOpenJobsModal = () => {
     setHighlightJobsFields({});
     setShowJobsModal(true);
  };
  
  const handleOpenJobsEditModal = () => {
    setHighlightJobsFields({});
    setShowJobsEditModal(true);
  };

   const handleCloseJobsModal = () => {
     setShowJobsModal(false);
   };
  
    const handleCloseJobsEditModal = () => {
      setShowJobsEditModal(false);
  };
  
    const handleOpenDateRangeModal = () => {
      setShowDateRangeModal(true); 
    };

    const handleCloseDateRangeModal = () => {
      setShowDateRangeModal(false);
    };


  return (
    <div className="App">
      <header className="header">
        <NavMenu />
      </header>
      <img src="/JLlogo.jpg" alt="JL Trucking Logo" className="logo" />
      <h3 className="header-font">{selectedItem}</h3>
      {selectedItem === "Jobs" && (
        <div>
          <Button variant="secondary" onClick={handleOpenJobsModal} className="FilterButton open-modal-btn btn-sm">
            Add Job Run
          </Button>
          <Button variant="secondary" className="FilterButton FilterButton open-modal-btn btn-sm" style={{ marginLeft: "0.5rem" }}>
            <div className="checkbox-container d-flex">
              <Form.Check type="checkbox" label="In Progress" checked={filterInProgress} onChange={(e) => setFilterInProgress(e.target.checked)} className="mr-2" />
              <Form.Check type="checkbox" label="Complete" checked={console.log("complete")} onChange={(e) => setFilterComplete(e.target.checked)} className="mr-2" />
            </div>
          </Button>
          <Button onClick={handleOpenDateRangeModal} variant="secondary" className="FilterButton open-modal-btn btn-sm" style={{ marginLeft: "0.5rem" }}>
            Filter by Date
          </Button>

          <JobRuns
            showJobsEditModal={showJobsEditModal}
            setShowJobsEditModal={setShowJobsEditModal}
            showJobsModal={showJobsModal}
            setShowJobsModal={setShowJobsModal}
            handleCloseJobsModal={handleCloseJobsModal}
            handleOpenJobsModal={handleOpenJobsModal}
            handleOpenJobsEditModal={handleOpenJobsEditModal}
            handleCloseJobsEditModal={handleCloseJobsEditModal}
            highlightJobsFields={highlightJobsFields}
            setHighlightJobsFields={setHighlightJobsFields}
          />

          {showDateRangeModal && <DateRangeSearch handleCloseDateRangeModal={handleCloseDateRangeModal} handleOpenDateRangeModal={showDateRangeModal} />}
        </div>
      )}
    </div>
  );
}

export default App;
