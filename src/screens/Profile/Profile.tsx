import React from "react";
import "./Profile.css";
import Navigation from "../../components/Navigation/Navigation";
import ProfileForm from "../../components/Profile/ProfileForm";
import { updateUser } from "src/redux/actions/user.actions";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";

const Profile: React.FC = () => {
  const { data: user } = useSelector((state: RootState) => state.user);
  return (
    <Navigation className="h-screen overflow-hidden flex flex-col">
      <ProfileForm
        formDispatchAction={updateUser}
        onError={() => {}}
        onSuccess={() => {}}
        state={user}
      />
    </Navigation>
  );
};

export default Profile;
