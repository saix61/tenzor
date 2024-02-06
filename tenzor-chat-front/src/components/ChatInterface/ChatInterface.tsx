import { ChangeEvent, FormEvent, useState } from "react";
import "./ChatInterface.scss";
import { IconButton, Input } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useStore } from "../../store/store";
import { useHistory } from "../../store/history";

export const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("");
  const { addMessage } = useHistory();
  const { currentDialogID, currentUserID } = useStore();

  const sendMessage = (mssg: string) => {
    addMessage(currentDialogID, {
      date: new Date().getTime(),
      userID: currentUserID,
      messageText: mssg,
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="ChatInterface">
      <form className="ChatInterface-Form" onSubmit={onSubmitHandler}>
        <Input
          autoFocus={true}
          className="ChatInterface-Input"
          size={"small"}
          placeholder="Start typing..."
          onChange={onChangeHandler}
          value={inputValue}
        />
        <IconButton className="ChatInterface-Button" type={"submit"}>
          <Send fontSize={"small"} color={"primary"} />
        </IconButton>
      </form>
    </div>
  );
};
