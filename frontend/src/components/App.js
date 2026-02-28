import { React, useState } from "react";
// import React, useState from "react";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";
import ResponsiveAppBar from "./ResponsiveAppBar";

// Test login with: localStorage.setItem("token", "fake-token");

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false, // potential security risk
  );

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <div className="App">
      <ResponsiveAppBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
