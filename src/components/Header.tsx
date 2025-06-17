"use client";
import {
  SignedOut,
  useUser,
  SignInButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 px-6 bg-[#111111]">
      {user && (
        <h1 className="text-[#ffffff] font-semibold  ">
          {user.firstName}'s Space.
        </h1>
      )}

      <Link href='/'>
        <div className="flex items-center gap-2  ">
          <img src="/logo.png" className="object-fill max-w-9" alt="NotionAi" />
          <h1 className="text-3xl font-[600] text-[#f6f6f6]">NotionAi</h1>
        </div>
      </Link>

      <div>
        <SignedOut>
          <div className="text-[#5fd3b6] bg-[#333534] p-2 px-3 rounded-sm font-medium">
          <SignInButton />
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
