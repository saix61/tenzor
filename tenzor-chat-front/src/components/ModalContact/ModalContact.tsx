import "./ModalContact.scss";
import { FC } from "react";
import { TUser } from "../../store/users";
import { useStore } from "../../store/store";

export type TModalContact = {
  user: TUser;
  onClick: (user: TUser) => void;
};

export const ModalContact: FC<TModalContact> = ({ user, onClick }) => {
  const { currentUserID } = useStore();

  const onClickHandler = () => {
    onClick(user);
  };

  return (
    <div className="ModalContact" onClick={onClickHandler}>
      <div className="ModalContact-Photo">
        <img src={user.photoUrl} alt="ModalContact-Name" />
      </div>
      <div className="ModalContact-Content">
        <div className="ModalContact-Name">
          {user.name}
          {user.userID === currentUserID ? " (You)" : ""}
        </div>
      </div>
    </div>
  );
};
