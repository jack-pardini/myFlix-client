import React from "react";
import PropTypes from "prop-types";

export const UserInfo = ({ name, email }) => {
  return (
    <>
      <h2>Account Information</h2>
      <p>Username: {name}</p>
      <p>E-mail: {email}</p>
    </>
  );
};

UserInfo.prototype = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};
