"use client";

import { signOut } from "../utils";

const SignOutButton = () => {
  const handleClick = async () => {
    await signOut();
  };
  return (
    <button type="button" onClick={handleClick}>
      <span>Sign Out</span>
    </button>
  );
};

export { SignOutButton };
