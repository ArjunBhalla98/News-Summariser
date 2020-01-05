import React, { Component } from "react";
import "./SourceButton.css";

class SourceButton extends Component {
  constructor(props) {
    super(props);
    this.state = { source: this.props.source };
  }

  render() {
    return <button className="source-button">{this.state.source}</button>;
  }
}

export default SourceButton;
