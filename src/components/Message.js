import React from "react";

const Message = props => (
  <div className="message">
    <div className="sender-id">{props.senderId}</div>
    <div className="message-text">{props.text}</div>
  </div>
);
export default Message;
