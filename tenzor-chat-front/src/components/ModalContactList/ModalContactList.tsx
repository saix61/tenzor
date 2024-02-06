import { FC } from "react";
import { TUser, useUsers } from "../../store/users";
import { ModalContact } from "../ModalContact/ModalContact";

export type TModalContactList = {
  onClick: (user: TUser) => void;
};

export const ModalContactList: FC<TModalContactList> = ({ onClick }) => {
  const { userList } = useUsers();

  const onClickHandler = (user: TUser) => {
    onClick(user);
    console.log("createNewDialog", user.userID);
  };

  const LoopComponent: React.FC = () => (
    <>
      {userList.map((user) => (
        <ModalContact key={user.userID} user={user} onClick={onClickHandler} />
      ))}
    </>
  );

  return (
    <div className="ModalContactList">
      <LoopComponent />
    </div>
  );
};
