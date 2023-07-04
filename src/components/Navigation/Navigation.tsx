import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../redux/actions/user.actions";
import { BiHomeAlt } from "react-icons/bi";
import { FiSettings, FiLogOut } from "react-icons/fi";
import CircularProgress from "../CircularProgress/CircularProgress";
import { RootState } from "src/redux/store/store";
import { IImage } from "@types";

const NavLink: React.FC<any> = ({ className, ...rest }) => (
  <Link
    className={`text-white hover:text-white focus:text-white active:text-white hover:no-underline focus:no-underline active:no-underline ${className}`}
    {...rest}
  />
);

const NavBtn: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...rest
}) => (
  <button
    className={`
  w-full hover:text-white focus:text-white active:text-white 
  hover:no-underline focus:no-underline active:no-underline 
  bg-darkblue-800 flex items-center text-white font-light my-2 
  py-2 px-3 hover:bg-darkblue-600 focus:bg-darkblue-600 
  rounded-lg ${className}`}
    {...rest}
  />
);

const NavLinkNav: React.FC<any> = ({ className, ...rest }) => (
  <NavLink
    className={`
    bg-darkblue-800 flex items-center text-white font-light 
    my-2 py-2 px-3 hover:bg-darkblue-600 focus:bg-darkblue-600 
    rounded-lg ${className}`}
    {...rest}
  />
);

interface INavigationProps {
  children: React.ReactNode;
  className?: string;
}

const Navigation: React.FC<INavigationProps> = ({
  children,
  className,
}: INavigationProps) => {
  const dispatch = useDispatch();

  const { data: userData } = useSelector((state: RootState) => state.user);
  const avatarURL =
    "https://ui-avatars.com/api/?name=" +
    userData?.name?.replace(" ", "+") +
    "&size=" +
    110;
  const profilePicture = userData
    ? import.meta.env.VITE_UPLOADS_URL +
      "/" +
      (userData?.profile_picture as IImage)?.img?.imageUrl
    : avatarURL;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex flex-1 row">
      <header>
        <div className="w-48 h-screen bg-darkblue-900 dark:bg-black p-5 flex flex-col fixed">
          <NavLink to="/profile">
            <div className="text-md text-white w-full flex items-center h-24">
              <CircularProgress progress={70}>
                <img
                  src={profilePicture}
                  className="object-cover h-full w-full"
                />
              </CircularProgress>
            </div>
            <div className="text-md text-white w-full flex justify-center flex-col h-32">
              <h1 className="text-3xl font-semibold text-white">
                {userData?.name}
              </h1>
            </div>
          </NavLink>
          <ul className="mt-3">
            <li className="w-full nav-item active">
              <NavLinkNav
                className="flex items-center text-white font-light"
                to="/"
              >
                <BiHomeAlt className="mr-3 text-bluish-700 text-xl" />
                Home
              </NavLinkNav>
            </li>
            <li className="w-full nav-item">
              <NavLinkNav className="nav-link" to="/settings">
                <FiSettings className="mr-3 text-bluish-700 text-xl" />
                Settings
              </NavLinkNav>
            </li>
          </ul>
          <ul className=" mt-auto">
            <li className="w-full nav-item">
              <NavBtn
                className="nav-link"
                onClick={() => dispatch(logoutUser())}
              >
                <FiLogOut className="mr-3 text-bluish-700 text-xl" />
                Logout
              </NavBtn>
            </li>
          </ul>
        </div>
      </header>
      <div className="w-screen pl-48">
        <div className={`px-5 py-4 h-full dark:bg-darkblue-900 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
