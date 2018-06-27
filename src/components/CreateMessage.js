import React, { Component } from "react";

export default class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="message"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button type="submit">SEND</button>
      </form>
    );
  }
}
