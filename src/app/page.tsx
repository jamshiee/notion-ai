"use client";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { ArrowLeftCircleIcon, ArrowUpCircleIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [userData] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );
  console.log(userData?.docs)

  return (
    <>
      {(isSignedIn && userData?.docs) && (
        <div className="bg-[#1b1b1b] w-full min-h-screen">
          <div className="p-2 flex gap-2 items-center animate-pulse text-[#5acfb2]">
            <ArrowLeftCircleIcon size={25} />
            <h2>Create a new document to begin with </h2>
          </div>
        </div>
      )}

      {!isSignedIn && (
        <div className="flex justify-end px-6 gap-2 items-center animate-pulse">
          <h2>Sing In To Use Notion Ai </h2>

          <ArrowUpCircleIcon size={30} />
        </div>
      )}
    </>
  );
}
