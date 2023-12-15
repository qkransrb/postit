import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import Logout from "./logout";

const Header = async () => {
  const auth = await isAuthenticated();

  return (
    <header className="h-20 shadow-md">
      <nav className="max-w-screen-xl mx-auto h-20 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          <Link href="/">Postit</Link>
        </h1>
        {auth ? (
          <div className="flex items-center gap-x-10">
            <span>{auth.user.name}</span>
            <Logout />
          </div>
        ) : (
          <div className="flex items-center gap-x-10">
            <Link href="/sign-in">Login</Link>
            <Link href="/sign-up">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
