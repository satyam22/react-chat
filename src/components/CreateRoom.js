import React, { Component } from "react";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("room name::", this.state.roomName);
    this.props.createRoom(this.state.roomName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="roomName"
          value={this.state.roomName}
          onChange={this.handleChange}
        />
        <button type="submit" name="submit">
          CREATE ROOM{" "}
        </button>
      </form>
    );
  }
}
