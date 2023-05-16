import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone"
import ProfileImage from "./ProfileImage";
const UserProfile = ({ user }) => {
    return (
        <div className="grid-x grid-container">
            <div className="profile-box cell medium-6">
                <div className="cell">
                    <h2>Account Information</h2>
                    <p>First and last name: {user.firstName} {user.lastName}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
                <div>
                    <ProfileImage />
                </div>
            </div>
        </div>
    )
}

export default UserProfile