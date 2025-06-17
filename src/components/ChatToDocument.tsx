"use client";
import { BotIcon, MessageCircleCode } from "lucide-react";
import { useState, useTransition } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import * as Y from "yjs";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestion(input)
    startTransition(async () => {
      const documentData = doc.get("document-data").toJSON();
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              question:input,
            }),
          }
        );

        if (res.ok) {
          const { message } = await res.json();
          setInput("")
          setSummary(message);
          toast.success("Qusetion asked successfully!");
        }
      } catch (error) {
        toast.error("Error while asking question" + error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"} className="cursor-pointer">
        <DialogTrigger>
          <MessageCircleCode />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent className="bg-white border-0  ">
        <DialogHeader className=" items-center">
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription className=" items-center  ">
            Ask a question and chat to the document with AI.
          </DialogDescription>

          <hr className="mt-5" />

          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "Is Thinking ..." : "Says:"}
              </p>
            </div>
            <p>{isPending ? "Thinking... " : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder=" i.e. what is this about? "
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-black text-white"
            disabled={!input || isPending}
          >
            {isPending ? "Asking" : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ChatToDocument;
