import { FC } from "react";
import "./Message.scss";
import { useStore } from "../../store/store";
import { THistoryMessage } from "../../store/history";
import { validateLocaleDate } from "../../assets/functions/validateLocaleDate";

export type TMessage = {
  mssg: THistoryMessage;
};

export const Message: FC<TMessage> = ({ mssg }) => {
  const { currentUserID } = useStore();
  const finalDate = validateLocaleDate(mssg.date);
  return (
    <div
      className={`Message${
        mssg.userID === currentUserID ? ` Message__current` : ""
      }`}
    >
      <div className="Message-Text">{mssg.messageText}</div>
      <div className="Message-Date">{finalDate}</div>
    </div>
  );
};
