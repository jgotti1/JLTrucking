// NavigationContext.js

import React, { createContext, useState } from "react";


const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("Jobs");

  return <NavigationContext.Provider value={{ selectedItem, setSelectedItem }}>{children}</NavigationContext.Provider>;
};

export { NavigationContext, NavigationProvider };

