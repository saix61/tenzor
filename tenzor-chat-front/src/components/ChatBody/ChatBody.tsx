import { ChatInterface } from "../ChatInterface/ChatInterface";
import { MessageList } from "../MessageList/MessageList";
import "./ChatBody.scss";

export const ChatBody = () => {
  return (
    <div className="ChatBody">
      <MessageList />
      <ChatInterface />
    </div>
  );
};
