import React, { Component } from "react";
import datas from "./assets/data";

import VesselsTables from "./component/VesselsTables";

class App extends Component {
  render() {
    return (
      <div>
        <VesselsTables datas={datas} />
      </div>
    );
  }
}

export default App;
