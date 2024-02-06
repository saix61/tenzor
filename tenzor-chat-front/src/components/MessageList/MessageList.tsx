import { useEffect, useRef } from "react";
import { useStore } from "../../../src/store/store";
import { useHistory } from "../../store/history";
import { Message } from "../Message/Message";
import "./MessageList.scss";

export const MessageList = () => {
  const { getDialog } = useHistory();
  const { currentDialogID } = useStore();

  const messageList = currentDialogID
    ? getDialog(currentDialogID)
    : getDialog(0);

  const elementRef = useRef<HTMLDivElement>(null);
  const scrollToElement = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, [messageList]);

  const LoopComponent: React.FC = () => (
    <>
      {messageList.map((dialog) =>
        dialog.messages.map((mssg, i) => <Message key={i} mssg={mssg} />)
      )}
      <div ref={elementRef}></div>
    </>
  );

  return (
    <div className="MessageList">
      <LoopComponent />
    </div>
  );
};
