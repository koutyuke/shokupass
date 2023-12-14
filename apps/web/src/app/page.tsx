import { SignInButton, SignOutButton } from "@/features/signIn/components";
import { UserInfo } from "@/features/signIn/components/userInfo";

const Home = async () => (
  <main className="h-full w-full">
    <div>
      <SignInButton />
    </div>
    <div>
      <SignOutButton />
    </div>
    <div>
      <UserInfo />
    </div>
  </main>
);

export default Home;
