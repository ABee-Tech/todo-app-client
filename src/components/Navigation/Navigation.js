import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user.actions";
import styled from "styled-components";
import tw from "twin.macro";
import { BiHomeAlt, BiCategory } from "react-icons/bi";
import { RiPieChartLine } from "react-icons/ri";
import { FiSettings, FiLogOut } from "react-icons/fi";

import Portrait from "../../assets/img/portrait.jpg";

const NavLink = styled(Link)`
  ${tw`text-white hover:text-white focus:text-white active:text-white hover:no-underline focus:no-underline active:no-underline`}
`;
const NavLinkBtn = styled(NavLink)`
  ${tw`text-white hover:text-white focus:text-white active:text-white hover:no-underline focus:no-underline active:no-underline hover:bg-blue-200 focus:bg-blue-200 rounded-lg bg-darkblue-400 flex px-3 py-2 my-1 font-semibold text-sm`}
`;
const NavLinkNav = styled(NavLink)`
  ${tw`bg-darkblue-800 flex items-center text-white font-light my-2 py-2 px-3 hover:bg-darkblue-600 focus:bg-darkblue-600 rounded-lg`}
  & svg {
    ${tw`mr-3 text-bluish-700 text-xl`}
  }
`;

const Header = ({ children }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="w-screen flex">
      <header>
        <div className="w-48 h-screen bg-darkblue-900 p-5 flex flex-col">
          <NavLink
            className="text-md text-white w-full flex items-center h-24"
            to="/"
          >
            <div className=" bg-gradient-to-r from-transparent to-pink rounded-full h-24 w-24 flex justify-center items-center overflow-hidden ">
              <div className=" rounded-full h-full w-full p-1 flex justify-center items-center overflow-hidden">
                <img
                  src={Portrait}
                  className="overflow-hidden rounded-full h-full w-full object-cover"
                />
              </div>
            </div>
          </NavLink>
          <NavLink
            className="text-md text-white w-full flex justify-center flex-col h-32"
            to="/"
          >
            <div>
              <h1 className="text-3xl font-semibold text-white">
                Olivia Mitchell
              </h1>
            </div>
          </NavLink>
          <ul className="mt-3">
            <li className="w-full nav-item active">
              <NavLinkNav
                className="flex items-center text-white font-light"
                to="/"
              >
                <BiHomeAlt />
                Home
              </NavLinkNav>
            </li>

            <li className="w-full nav-item">
              <NavLinkNav className="nav-link" to="/addtodo">
                <BiCategory />
                Categories
              </NavLinkNav>
            </li>
            <li className="w-full nav-item">
              <NavLinkNav
                className="nav-link"
                to="/login"
                onClick={() => dispatch(logoutUser())}
              >
                <RiPieChartLine />
                Analytics
              </NavLinkNav>
            </li>
            <li className="w-full nav-item">
              <NavLinkNav
                className="nav-link"
                to="/login"
                onClick={() => dispatch(logoutUser())}
              >
                <FiSettings />
                Settings
              </NavLinkNav>
            </li>
          </ul>
          <ul className=" mt-auto">
            <li className="w-full nav-item">
              <NavLinkNav
                className="nav-link"
                to="/login"
                onClick={() => dispatch(logoutUser())}
              >
                <FiLogOut />
                Logout
              </NavLinkNav>
            </li>
          </ul>
        </div>
      </header>
      <div className="px-5 py-4 w-full">{children}</div>
    </div>
  );
};

export default Header;
