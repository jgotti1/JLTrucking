
import React, { useContext } from "react";
import { NavigationContext } from "./Context/NavigationContext";
import NavMenu from "./components/NavMenu";
import JobRuns from "./components/JobRuns"; 
import './App.css';


function App() {
  const { selectedItem } = useContext(NavigationContext);

  return (
    <div className="App">
      <header className="header">
        <NavMenu />
      </header>
      <img src="/JLlogo.jpg" alt="JL Trucking Logo" className="logo" />
      <h4>{selectedItem}</h4>
      {selectedItem === "Jobs" && <JobRuns />}
    </div>
  );
}

export default App;
