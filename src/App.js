import React, { Component } from "react";
import datas from "./data";
import columns from "./dataHeader";
import VesselsTables from "./VesselsTables";

class App extends Component {
  render() {
    return (
      <div className="App">
        <VesselsTables datas={datas} columns={columns} />
      </div>
    );
  }
}

export default App;
