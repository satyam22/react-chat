import React, { Component } from "react";

export default class RoomList extends Component {
  render() {
    const { rooms, roomId, subscribeToRoom } = this.props;

    return (
      <div className="rooms-list">
        <h3>Rooms List </h3>
        <ul>
          {rooms.map((room, index) => {
            const active = room.id === roomId ? "active" : "";
            return (
              <li key={index} className={"room " + active}>
                <a onClick={() => subscribeToRoom(room.id)} href="#">
                  # {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
