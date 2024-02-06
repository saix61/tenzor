import "./ModalContent.scss";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { ModalContactList } from "../ModalContactList/ModalContactList";
import { FC } from "react";
import { useHistory } from "../../store/history";
import { useStore } from "../../store/store";
import { TUser } from "../../store/users";

export type TModalContent = {
  onClose: () => void;
  isOpen: boolean;
};

export const ModalContent: FC<TModalContent> = ({
  onClose,
  isOpen = false,
}) => {
  const { addDialog } = useHistory();
  const { currentUserID, setID } = useStore();

  const handleAddDialog = (contact: TUser) => {
    setID(addDialog(currentUserID, contact.userID));
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Modal className="ModalContent" open={isOpen} onClose={handleClose}>
      <Box className="ModalContent-Box">
        <div className="ModalContent-Head">
          <h2>Choose contact</h2>
          <IconButton onClick={handleClose}>
            <Close fontSize={"small"} color={"primary"} />
          </IconButton>
        </div>
        <div className="ModalContent-Body">
          <ModalContactList onClick={handleAddDialog} />
        </div>
      </Box>
    </Modal>
  );
};
