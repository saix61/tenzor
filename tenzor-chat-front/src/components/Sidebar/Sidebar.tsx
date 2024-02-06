import "./Sidebar.scss";
import { IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { ContactList } from "../ContactList/ContactList";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ModalContent } from "../ModalContent/ModalContent";

export const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(true);
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar-Head">
        <IconButton onClick={onClickHandler}>
          <AddCircleOutline fontSize={"small"} color={"primary"} />
        </IconButton>
      </div>
      <ContactList />
      {showModal &&
        createPortal(
          <ModalContent
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
};
