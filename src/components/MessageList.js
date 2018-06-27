import React from "react";
import Message from "./Message";
const MessageList = props => {
  if (props.disabled) {
    return <div>&larr; Please Join a room first</div>;
  } else {
    return (
      <div className="messages">
        {props.messages.map((message, index) => (
          <Message
            key={index}
            senderId={message.senderId}
            text={message.text}
          />
        ))}
      </div>
    );
  }
};
export default MessageList;
