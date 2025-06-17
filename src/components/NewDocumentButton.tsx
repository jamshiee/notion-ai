"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDoc } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter()
  const {isSignedIn} = useUser()

  const handleSubmit = () => {
  
    startTransition(async () => {
      const { docId } = await createNewDoc();
      router.push(`/doc/${docId}`);
    });
  };
  return (
    <div>
      <Button
        className="bg-[#333534] text-[#5fd3b6]  cursor-pointer font-semibold  "
        onClick={handleSubmit}
        disabled={isPending || !isSignedIn}
      >
        {isPending ? "Creating Document" : "New Document"}
      </Button>
    </div>
  );
};
export default NewDocumentButton;
