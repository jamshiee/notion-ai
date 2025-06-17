"use client";
import { inviteUserToRoom } from "@/actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useRoom } from "@liveblocks/react/suspense";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const roomId = useRoom().id;

  const handleInvite = (e:FormEvent) => {
    e.preventDefault()
    if (!roomId) return;

    startTransition(async () => {
      const { success } = await inviteUserToRoom(roomId,email);
      if (success) {
        setIsOpen(false);
        setEmail("")
        toast.success("User Invited Successfully");
      } else {
        toast.error("Failed to Invite User");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent className="bg-white border-0  ">
        <DialogHeader className=" items-center">
          <DialogTitle>Invite a user to collaborate!</DialogTitle>
          <DialogDescription className="  items-center  ">
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>

        <form className="flex gap-2"onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="" disabled={!email || isPending}>
            {isPending ? "Inviting" : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteUser;
