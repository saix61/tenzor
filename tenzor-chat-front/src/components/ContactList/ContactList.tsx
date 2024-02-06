import { useStore } from "../../store/store";
import { useHistory } from "../../store/history";
import { Contact } from "../Contact/Contact";
import "./ContactList.scss";

export const ContactList = () => {
  const { getDialog } = useHistory();
  const { currentDialogID, setID } = useStore();

  const onClickHandler = (dialogID: string) => {
    setID(dialogID);
  };

  const contactList = getDialog().sort((a, b) => {
    if (!a.messages.length || !b.messages.length) return -1;
    const lastMessageA = a.messages[a.messages.length - 1];
    const lastMessageB = b.messages[b.messages.length - 1];
    return lastMessageB.date - lastMessageA.date;
  });

  if (!currentDialogID) {
    setID(contactList[0].dialogID);
  }

  const LoopComponent: React.FC = () => (
    <>
      {contactList.map((dialog) => (
        <Contact
          key={dialog.dialogID}
          className={currentDialogID === dialog.dialogID ? "active" : ""}
          onClick={onClickHandler}
          dialog={dialog}
        />
      ))}
    </>
  );

  return (
    <div className="ContactList">
      <LoopComponent />
    </div>
  );
};
