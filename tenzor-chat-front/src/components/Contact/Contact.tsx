import "./Contact.scss";
import { FC } from "react";
import { useStore } from "../../store/store";
import { TDialogHistory } from "../../store/history";
import { useUsers } from "../../store/users";
import { validateLocaleDate } from "../../assets/functions/validateLocaleDate";

export type TContact = {
  className?: string;
  dialog: TDialogHistory;
  onClick: (dialogID: string) => void;
};

export const Contact: FC<TContact> = ({ className = "", dialog, onClick }) => {
  const { currentUserID } = useStore();
  const { getUserByID } = useUsers();

  const { dialogID, messages, interlocutors } = dialog;

  const contactCardID =
    interlocutors.filter((i) => i !== currentUserID)[0] ?? currentUserID;
  const contactCardInfo = getUserByID(contactCardID);

  const onClickHandler = () => {
    onClick(dialogID);
  };

  const lastMassage = messages.length > 0 && messages[messages.length - 1];
  const isYou = lastMassage && lastMassage.userID === currentUserID;
  const finalDate = lastMassage ? validateLocaleDate(lastMassage.date) : "";

  return (
    <div
      className={`Contact${className ? ` ${className}` : ""}`}
      onClick={onClickHandler}
    >
      <div className="Contact-Photo">
        <img src={contactCardInfo.photoUrl} alt="Contact-Name" />
      </div>
      <div className="Contact-Content">
        <div className="Contact-Name">{contactCardInfo.name}</div>
        <div className="Contact-LastMessage">
          {currentUserID === contactCardID || isYou ? <span>You: </span> : ""}
          {lastMassage && lastMassage.messageText}
        </div>
      </div>
      <div className="Contact-LastMessageDate">{finalDate}</div>
    </div>
  );
};
