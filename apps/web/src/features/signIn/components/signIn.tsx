"use client";

import { signIn } from "../utils";

const SignInButton = () => (
  <button type="button" onClick={signIn}>
    <span>Sign In</span>
  </button>
);

export { SignInButton };
