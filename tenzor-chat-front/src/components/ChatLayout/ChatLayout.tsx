import "./ChatLayout.scss";

import { ContactCard } from "../ContactCard/ContactCard";
import { ChatBody } from "../ChatBody/ChatBody";

export const ChatLayout = () => {
  return (
    <div className="ChatLayout">
      <ChatBody />
      <ContactCard />
    </div>
  );
};
