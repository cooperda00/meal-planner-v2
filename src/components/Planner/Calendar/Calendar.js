//Modules
import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends React.Component {
  state = {
    selectedStartDate: moment().format("YYYY-MM-DD")
  };

  handleChange = e => {
    const date = moment(e).format("YYYY-MM-DD");
    this.setState({
      selectedStartDate: date
    });
  };

  render() {
    return (
      <DatePicker
        // selected={this.state.startDate}
        onChange={this.handleChange}
        placeholderText="Choose a date"
      />
    );
  }
}

export default Calendar;
