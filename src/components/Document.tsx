"use client";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Avatar from "./Avatar";
import DeleteDocument from "./DeleteDocument";
import Editor from "./Editor";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Document = ({ id }: { id: string }) => {
  const [data] = useDocumentData(doc(db, "documents", id));

  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    startTransition(async () => {
      await updateDoc(doc(db, "documents", id), {
        title: trimmedInput,
      });
    });
  };

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto pb-10 ">
        <form onSubmit={updateTitle} className="flex flex-1 gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button type="submit" disabled={isPending} variant={"outline"}>
            Update
          </Button>
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto items-center mb-5 justify-between">
        <ManageUsers/>
        <Avatar/>
      </div>

      <Editor />
    </div>
  );
};
export default Document;
