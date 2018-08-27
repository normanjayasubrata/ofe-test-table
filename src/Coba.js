import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Checkbox from "rc-checkbox";
import {
  OverlayTrigger,
  Button,
  Popover,
  Grid,
  Row,
  Col,
  Glyphicon
} from "react-bootstrap";

class Coba extends Component {
  constructor(props) {
    super();
    this.state = {
      vessels: props.datas,
      columns: props.columns,
      hiddenDelivery: true,
      hiddenDate: true,
      hiddenPrice: true,
      rowprint: [],
      csvdownload: []
    };
  }

  handleCheck = event => {
    this.setState({ [event.target.name]: !event.target.checked });
  };

  multiFilter(array, filters) {
    const filterKeys = Object.keys(filters);
    // filters all elements passing the criteria
    return array.filter(item => {
      // dynamically validate all filter criteria
      return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
    });
  }

  handleExport = () => {
    let filters = {
      id: this.state.rowprint
    };

    let array = [];
    let converted = Object.keys(this.state.vessels[0]).join(",") + "\n";

    let filtereds = this.multiFilter(this.state.vessels, filters);

    filtereds.map(filtered => {
      let result = Object.values(filtered);
      return array.push(result);
    });

    array.forEach(function(row) {
      converted += row.join(",");
      converted += "\n";
    });

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(converted);
    hiddenElement.target = "_blank";
    hiddenElement.download = "vessels.csv";
    hiddenElement.click();
  };

  render() {
    const { vessels, hiddenDelivery, hiddenDate, hiddenPrice } = this.state;
    const columns = [
      {
        dataField: "name",
        text: "NAME",
        sort: true,
        hidden: false
      },
      {
        dataField: "dwt",
        text: "DWT",
        sort: true,
        hidden: false
      },
      {
        dataField: "built",
        text: "YEAR BUILT",
        sort: true,
        hidden: false
      },
      {
        dataField: "imo",
        text: "IMO",
        sort: true,
        hidden: false
      },
      {
        dataField: "type",
        text: "TYPE",
        sort: true,
        hidden: false
      },
      {
        dataField: "delivery",
        text: "DELIVERY",
        sort: true,
        hidden: hiddenDelivery,
        csvExport: !hiddenDelivery
      },
      {
        dataField: "date",
        text: "DATE",
        sort: true,
        hidden: hiddenDate,
        csvExport: !hiddenDate
      },
      {
        dataField: "country",
        text: "COUNTRY BUILT",
        sort: true,
        hidden: false
      },
      {
        dataField: "price",
        text: "PRICE",
        sort: true,
        hidden: hiddenPrice,
        csvExport: !hiddenPrice
      },
      {
        dataField: "yard",
        text: "YARD",
        sort: true,
        hidden: false
      }
    ];

    const popoverClickRootClose = (
      <Popover id="popover-trigger-click-root-close">
        <ul>
          <li>
            <label>
              <Checkbox name="hiddenDelivery" onChange={this.handleCheck} />
              &nbsp; Delivery
            </label>
          </li>
          <li>
            <label>
              <Checkbox name="hiddenDate" onChange={this.handleCheck} />
              &nbsp; Date
            </label>
          </li>
          <li>
            <label>
              <Checkbox name="hiddenPrice" onChange={this.handleCheck} />
              &nbsp; Price
            </label>
          </li>
        </ul>
      </Popover>
    );

    const onRowSelect = (row, isSelected) => {
      if (isSelected) {
        this.state.rowprint.push(row.id);
      } else {
        this.state.rowprint.splice(this.state.rowprint.indexOf(row.id), 1);
      }
    };

    const onRowSelectAll = (isSelected, rows) => {
      if (isSelected) {
        rows.map(row => {
          return this.state.rowprint.push(row.id);
        });
      } else {
        this.state.rowprint.splice(0, this.state.rowprint.length);
      }
      //   console.log(this.state.rowprint);
    };

    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: onRowSelect,
      onSelectAll: onRowSelectAll
    };

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(`clicked on row with index: ${rowIndex}`);
      }
    };

    return (
      <div>
        <div className="container">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <Button onClick={this.handleExport} bsStyle="primary">
                  export
                </Button>
              </Col>
              <Col xs={6} md={4} className="right">
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="bottom"
                  overlay={popoverClickRootClose}
                >
                  <Button>
                    <Glyphicon glyph="cog" />
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </Grid>
        </div>
        <div className=" mainTable">
          <BootstrapTable
            keyField="id"
            data={vessels}
            columns={columns}
            bordered={false}
            selectRow={selectRow}
            rowEvents={rowEvents}
          />
        </div>
      </div>
    );
  }
}

export default Coba;
