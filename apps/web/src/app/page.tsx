"use client";

import { useUserInfo } from "@/features/signIn/hooks/useUserInfo";

const Home = () => {
  const { user, session } = useUserInfo();
  return (
    <main className="h-full w-full pt-24">
      <div>{user ? user.id : "no user"}</div>
      <div className="w-screen">
        {session && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(session.access_token);
            }}
          >
            copy token
          </button>
        )}
      </div>
    </main>
  );
};

export default Home;
