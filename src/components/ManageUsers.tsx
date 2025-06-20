"use client";
import { removeUserFromRoom } from "@/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import useOwner from "@/lib/useOwner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "sonner";
import { db } from "../../firebase";
import { Button } from "./ui/button";

const ManageUsers = () => {
  const { user } = useUser();
  const isOwner = useOwner();
  const room = useRoom();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = (userId: string) => {
    startTransition(async()=>{
      if(!user) return;

      const {success} = await removeUserFromRoom(room.id,userId)

      if(success){
        toast.success("User removed from room successfully!")
      } else {
        toast.error("Failed to remove user from room")
      }

    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent className="bg-white border-0  ">
        <DialogHeader className=" items-center">
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription className="  items-center  ">
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2" />
        <div className="flex flex-col gap-2">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex items-center justify-between"
            >
              <p className="font-light-">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You (${doc.data().userId})`
                  : doc.data().userId}
              </p>

              <div className="flex items-center gap-2">
                <Button variant={"outline"}>{doc.data().role}</Button>
                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant={"destructive"}
                      disabled={isPending}
                      size={"sm"}
                      onClick={()=>handleDelete(doc.data().userId)}
                    >
                      {isPending ? "Removing" : "X"}
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ManageUsers;
