import React, { Component } from "react";
import ChatKit from "@pusher/chatkit";
import RoomList from "./components/RoomList";
import CreateRoom from "./components/CreateRoom";
import MessageList from "./components/MessageList";
import CreateMessage from "./components/CreateMessage";

import { instanceLocator, tokenUrl } from "./config";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      joinableRooms: [],
      joinedRooms: [],
      messages: []
    };
    this.getRooms = this.getRooms.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
  }
  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: "perborgen",
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => {
        console.log("error connecting to chatkit", err);
      });
  }
  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        console.log("joinable rooms:: ", joinableRooms);
        this.setState({
          joinableRooms: joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => {
        console.log("error in getting rooms list", err);
      });
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({ messages: [...this.state.messages, message] });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => {
        console.log("error in subscribing to room", err);
      });
  }
  sendMessage(text) {
    console.log("message text:: ", text);
    this.currentUser
      .sendMessage({
        text,
        roomId: this.state.roomId
      })
      .catch(err => {
        console.log("error in sending message", err);
      });
  }
  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => {
        console.log("error in creating room", err);
      });
  }

  render() {
    const { joinableRooms, joinedRooms, messages, roomId } = this.state;
    return (
      <div className="app">
        <div className="rooms">
          <RoomList
            rooms={[...joinableRooms, ...joinedRooms]}
            roomId={roomId}
            subscribeToRoom={this.subscribeToRoom}
          />
          <CreateRoom createRoom={this.createRoom} />
        </div>
        <div className="messages">
          <MessageList messages={messages} disabled={!roomId} />
          <CreateMessage sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}
