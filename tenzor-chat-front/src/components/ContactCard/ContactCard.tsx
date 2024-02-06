import "./ContactCard.scss";
import { Call, VideoCall, Favorite, Cookie } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useStore } from "../../store/store";
import { useUsers } from "../../store/users";
import { useHistory } from "../../store/history";
import Cookies from "js-cookie";

export const ContactCard = () => {
  const { currentDialogID, currentUserID } = useStore();
  const { getDialog } = useHistory();
  const { getUserByID } = useUsers();
  const contactCardID =
    getDialog(currentDialogID)[0].interlocutors.filter(
      (i) => i !== currentUserID
    )[0] ?? currentUserID;

  const contactCardInfo = getUserByID(contactCardID);

  const handleRemoveCookie = () => {
    Cookies.remove("history");
    Cookies.remove("appUsers");
    Cookies.remove("appStore");
    window.location.reload();
  };

  return (
    <div className="ContactCard">
      <div className="ContactCard-PersonalInfo">
        <img
          className="ContactCard-Photo"
          src={contactCardInfo.photoUrl}
          alt="Contact-Name"
        />
        <div className="ContactCard-Name">
          {contactCardInfo.name}
          {contactCardID === currentUserID ? " (You)" : ""}
        </div>
      </div>

      <div className="ContactCard-ActionList">
        {contactCardID === currentUserID ? (
          <Button
            size={"small"}
            variant={"contained"}
            onClick={handleRemoveCookie}
          >
            Clean cookie&nbsp;
            <Cookie fontSize={"small"} />
          </Button>
        ) : (
          <>
            <IconButton>
              <Call fontSize={"small"} color={"primary"} />
            </IconButton>
            <IconButton>
              <VideoCall fontSize={"small"} color={"primary"} />
            </IconButton>
            <IconButton>
              <Favorite fontSize={"small"} color={"primary"} />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};
