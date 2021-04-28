import React from "react";
import Records from "plugin-records";
import Header from "./components/Header";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Records />
    </div>
  );
}

export default App;