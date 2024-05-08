import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationProvider } from "./Context/NavigationContext";
import { JobRunsProvider } from "./Context/JobRunsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

function RootComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("Login successful");
  };

  return (
    <React.StrictMode>
      <JobRunsProvider>
        <NavigationProvider>{isLoggedIn ? <App /> : <LoginPage onLogin={handleLogin} />}</NavigationProvider>
      </JobRunsProvider>
    </React.StrictMode>
  );}

root.render(<RootComponent />);
