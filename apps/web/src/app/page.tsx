"use client";

import { useSession } from "@/hooks";

const Home = () => {
  const session = useSession();
  return (
    <main className="h-full w-full pt-24">
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
