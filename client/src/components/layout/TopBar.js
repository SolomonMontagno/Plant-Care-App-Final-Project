import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {

  let firstName;
  if (user) {
    firstName = user.firstName
  } else {
    firstName = "First Name"
  }

  const unauthenticatedListItems = [
    <li className="bbackground" key="sign-in">
      <Link className="bbackground button-margin" to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button bbackground white">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li className="username-button username" key="username">
      <Link className="white" to="/profile">Welcome, {firstName}</Link>
    </li>,
    <li className="username white" key="sign-out">
      <SignOutButton />
    </li>,
  ];


  return (
    <div className="top-bar nav-bar">
      <div className="top-bar-left">
        <ul>
          <div className="top-bar nav-bar">
            <div className="menu-left">
              <Link className="white" to="/">
                <img src="https://plant-care-app-final-project.s3.amazonaws.com/MIL.png"></img>
              </Link>
            </div>
            <div className="top-bar-left nav-bar">
              <div className="menu">
                <li>
                  <Link className="white" to="/profile">Profile</Link>
                </li>
                <li>
                  <Link className="white" to="/plants">Plants</Link>
                </li>
              </div>
            </div>
            <div class="top-bar-left">
              <ul class="menu">
                <li className="search-bar">
                  <li><input type="search" placeholder="Search" /></li>
                  <li><button type="button" class="button bbackground">Search</button></li>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
