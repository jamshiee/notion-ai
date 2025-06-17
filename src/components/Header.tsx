"use client";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 px-6 bg-[#111111]">
      {user && (
        <h1 className="text-[#ffffff] font-semibold">
          {`${user.firstName}'s Space.`}
        </h1>
      )}

      <Link href="/">
        <div className="flex items-center gap-2  ">
          <Image
            src="/logo.png"
            alt="NotionAi"
            width={36}
            height={36}
            className="object-fill"
          />
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
