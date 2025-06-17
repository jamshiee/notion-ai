"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useRoom } from "@liveblocks/react/suspense";
import { useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

const DeleteDocument = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending,startTransition]=useTransition()
  const roomId = useRoom().id
  const router =useRouter()

  const handleDelete =()=>{
    if(!roomId) return;

    startTransition(async()=>{
    const {success} = await deleteDocument(roomId)
    if(success){
        setIsOpen(false)
        router.replace('/')
        toast.success("Room Deleted Successfully")
    }else{
        toast.error("Failed to delete room")
    }

    })

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"destructive"}>
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent className="bg-white border-0  ">
        <DialogHeader className=" items-center">
          <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          <DialogDescription className="  items-center  ">
            This action cannot be undone. This will permanently delete your
            document and its content, removing all user from the document.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end gap-2 flex items-center justify-center">
          <Button type="button" className="bg-[#f3343e] text-white " onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting" : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" className="bg-gray-900 text-white">
                Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDocument;
