import { ChatLayout } from "../ChatLayout/ChatLayout";
import "./ChatWrapper.scss";
import { Sidebar } from "../Sidebar/Sidebar";

export const ChatWrapper = () => {
  return (
    <div className="ChatWrapper">
      <Sidebar />
      <ChatLayout />
    </div>
  );
};
