"use client";
import { createNewDoc } from "@/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

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
